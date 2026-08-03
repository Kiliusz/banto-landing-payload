'use server'

import { getPayload } from 'payload'
import { headers } from 'next/headers'
import config from '@payload-config'

export type WaitlistState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Prosty licznik w pamięci procesu — odsiewa najprostszy spam bez Redisa. */
const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_ATTEMPTS = 8

const rateLimited = (key: string): boolean => {
  const now = Date.now()
  const entry = attempts.get(key)

  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > MAX_ATTEMPTS
}

/** Dopisuje subskrybenta do MailerLite. Cicho pomijane, gdy brak klucza. */
const pushToMailerLite = async (
  email: string,
): Promise<{ status: 'sent' | 'error' | 'skipped'; error?: string }> => {
  const apiKey = process.env.MAILERLITE_API_KEY
  if (!apiKey) return { status: 'skipped' }

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        ...(process.env.MAILERLITE_GROUP_ID ? { groups: [process.env.MAILERLITE_GROUP_ID] } : {}),
      }),
    })

    if (!response.ok) {
      return { status: 'error', error: `HTTP ${response.status}: ${await response.text()}` }
    }

    return { status: 'sent' }
  } catch (error) {
    return { status: 'error', error: error instanceof Error ? error.message : String(error) }
  }
}

export const joinWaitlist = async (
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> => {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()
  const consent = formData.get('consent') === 'on' || formData.get('consent') === 'true'
  const honeypot = String(formData.get('website') ?? '')

  // Bot wypełnił ukryte pole — udajemy sukces, żeby nie uczył się naszej walidacji.
  if (honeypot) {
    return { status: 'success', message: 'Dziękujemy! Jesteś na liście oczekujących. 🎉' }
  }

  if (!EMAIL_RE.test(email)) {
    return { status: 'error', message: 'Podaj prawidłowy adres e-mail.' }
  }

  if (!consent) {
    return { status: 'error', message: 'Zaznacz zgodę, aby dołączyć do listy.' }
  }

  const headerList = await headers()
  const ip = headerList.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  if (rateLimited(ip)) {
    return { status: 'error', message: 'Za dużo prób. Spróbuj ponownie za kilka minut.' }
  }

  const payload = await getPayload({ config })

  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
  const successMessage = settings?.successMessage || 'Dziękujemy! Jesteś na liście oczekujących. 🎉'

  try {
    const existing = await payload.find({
      collection: 'waitlist',
      where: { email: { equals: email } },
      limit: 1,
      overrideAccess: true,
      pagination: false,
    })

    if (existing.docs.length > 0) {
      return { status: 'success', message: successMessage }
    }

    const mailerlite = await pushToMailerLite(email)

    await payload.create({
      collection: 'waitlist',
      overrideAccess: true,
      data: {
        email,
        consent: true,
        consentText: settings?.consentText ?? '',
        source: String(formData.get('source') ?? 'landing'),
        utm: {
          source: String(formData.get('utm_source') ?? '') || undefined,
          medium: String(formData.get('utm_medium') ?? '') || undefined,
          campaign: String(formData.get('utm_campaign') ?? '') || undefined,
        },
        mailerliteStatus: mailerlite.status,
        mailerliteError: mailerlite.error,
      },
    })

    return { status: 'success', message: successMessage }
  } catch (error) {
    payload.logger.error({ err: error }, 'Nie udało się zapisać na listę oczekujących')
    return { status: 'error', message: 'Coś poszło nie tak. Spróbuj ponownie za chwilę.' }
  }
}

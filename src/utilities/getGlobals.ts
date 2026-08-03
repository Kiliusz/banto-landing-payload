import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Footer, Header, SiteSetting } from '@/payload-types'

/**
 * Globale czytamy przez React `cache`, więc w obrębie jednego renderu
 * lecą raz, a nie w każdym bloku z osobna.
 *
 * Każde zapytanie jest odporne na brak bazy: podczas budowania obrazu Dockera
 * Postgres jeszcze nie działa, a Next i tak prerenderuje stronę 404 razem z
 * layoutem. Zamiast wywalać build, oddajemy `null` i renderujemy pusty nagłówek.
 */

const safe = async <T,>(fn: () => Promise<T>): Promise<T | null> => {
  try {
    return await fn()
  } catch {
    return null
  }
}

export const getSiteSettings = cache(
  async (): Promise<SiteSetting | null> =>
    safe(async () => {
      const payload = await getPayload({ config: configPromise })
      return payload.findGlobal({ slug: 'site-settings', depth: 1 })
    }),
)

export const getHeader = cache(
  async (): Promise<Header | null> =>
    safe(async () => {
      const payload = await getPayload({ config: configPromise })
      return payload.findGlobal({ slug: 'header', depth: 2 })
    }),
)

export const getFooter = cache(
  async (): Promise<Footer | null> =>
    safe(async () => {
      const payload = await getPayload({ config: configPromise })
      return payload.findGlobal({ slug: 'footer', depth: 2 })
    }),
)

/** Ścieżka do polityki prywatności ustawionej w „Ustawieniach serwisu". */
export const getPrivacyHref = async (): Promise<string | null> => {
  const settings = await getSiteSettings()
  const page = settings?.privacyPolicy

  if (page && typeof page === 'object' && 'slug' in page && page.slug) {
    return `/${page.slug}`
  }

  return null
}

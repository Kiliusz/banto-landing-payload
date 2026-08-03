import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'

import { getUserFromRequest } from '@/utilities/getUserFromRequest'

/**
 * Włącza tryb podglądu. Wymaga jednocześnie poprawnego sekretu (z URL-a
 * generowanego przez panel) i ważnej sesji użytkownika Payloada —
 * sam sekret nie wystarczy, żeby zobaczyć nieopublikowane treści.
 */
export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  if (!process.env.PREVIEW_SECRET || previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('Brak dostępu do podglądu', { status: 403 })
  }

  if (!path || !path.startsWith('/')) {
    return new Response('Nieprawidłowa ścieżka podglądu', { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  const user = await getUserFromRequest(payload, req)
  const draft = await draftMode()

  if (!user) {
    draft.disable()
    return new Response('Zaloguj się w panelu, aby korzystać z podglądu', { status: 403 })
  }

  draft.enable()
  redirect(path)
}

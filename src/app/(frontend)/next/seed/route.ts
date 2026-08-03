import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'
import { getPayload } from 'payload'

import { seed } from '@/seed'
import { getUserFromRequest } from '@/utilities/getUserFromRequest'

/**
 * Wgrywa treści startowe na działającym środowisku.
 *
 * Obraz produkcyjny nie zawiera `tsx` ani zależności deweloperskich, więc
 * `npm run seed` da się uruchomić tylko lokalnie. Ten endpoint robi to samo
 * z wnętrza aplikacji.
 *
 * Wymaga zalogowanego administratora — wystarczy być zalogowanym w /admin,
 * bo Payload czyta ciasteczko sesji. Autorem wpisów zostaje ten użytkownik.
 *
 * Jeśli w CMS-ie są już strony, endpoint odmawia — chyba że dodasz `?force=1`.
 * Seed nadpisuje dokumenty po slugu, więc bez tej blokady łatwo skasować
 * czyjąś pracę jednym wejściem na adres.
 */
export async function GET(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  const user = await getUserFromRequest(payload, req)

  if (!user || user.role !== 'admin') {
    return Response.json(
      { error: 'Zaloguj się w /admin jako administrator, żeby wgrać treści startowe.' },
      { status: 403 },
    )
  }

  const force = new URL(req.url).searchParams.get('force') === '1'
  const existing = await payload.count({ collection: 'pages' })

  if (existing.totalDocs > 0 && !force) {
    return Response.json(
      {
        error: 'W CMS-ie są już strony. Dodaj ?force=1, żeby nadpisać je treściami startowymi.',
        stron: existing.totalDocs,
      },
      { status: 409 },
    )
  }

  try {
    await seed({ payload, author: user })
  } catch (error) {
    payload.logger.error({ err: error }, 'Seed z panelu nie powiódł się')
    return Response.json(
      { error: error instanceof Error ? error.message : 'Nieznany błąd' },
      { status: 500 },
    )
  }

  // treści właśnie się zmieniły — czyścimy cache całego serwisu
  revalidatePath('/', 'layout')

  return Response.json({
    ok: true,
    komunikat: 'Treści startowe wgrane. Wróć na stronę główną.',
  })
}

/**
 * Healthcheck kontenera. Celowo poza `(payload)` i poza basic authem —
 * Docker nie wysyła nagłówka Authorization, a 401 zostałby uznany za awarię.
 * Nie zdradza niczego poza tym, że proces odpowiada.
 */
export const dynamic = 'force-dynamic'

export function GET() {
  return Response.json({ status: 'ok' })
}

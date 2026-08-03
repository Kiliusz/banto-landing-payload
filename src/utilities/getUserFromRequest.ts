import type { NextRequest } from 'next/server'
import type { Payload, TypedUser } from 'payload'

/**
 * Zwraca zalogowanego użytkownika Payloada dla żądania z przeglądarki.
 *
 * `payload.auth({ headers })` rozpoznaje wyłącznie nagłówek `Authorization`,
 * a panel trzyma sesję w ciasteczku `payload-token`. Dlatego wyciągamy token
 * z ciasteczka i podajemy go w formie, którą Payload rozumie.
 *
 * Przekazanie tu `NextRequest` udającego `PayloadRequest` nie działa —
 * psuje wewnętrzne strategie logowania.
 */
export const getUserFromRequest = async (
  payload: Payload,
  req: NextRequest,
): Promise<TypedUser | null> => {
  const prefix = payload.config.cookiePrefix || 'payload'
  const token =
    req.cookies.get(`${prefix}-token`)?.value ??
    req.headers.get('authorization')?.replace(/^(JWT|Bearer)\s+/i, '')

  if (!token) return null

  try {
    const { user } = await payload.auth({
      headers: new Headers({ authorization: `JWT ${token}` }),
    })
    return user ?? null
  } catch {
    return null
  }
}

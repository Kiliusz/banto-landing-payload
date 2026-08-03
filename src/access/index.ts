import type { Access, FieldAccess } from 'payload'

/** Publiczny odczyt — dla wszystkiego, co i tak ląduje na stronie. */
export const anyone: Access = () => true

/** Tylko zalogowany użytkownik panelu. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const authenticatedField: FieldAccess = ({ req: { user } }) => Boolean(user)

/**
 * Publicznie widoczne są wyłącznie dokumenty opublikowane.
 * Zalogowany redaktor widzi także wersje robocze (potrzebne do podglądu).
 */
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true

  return {
    _status: {
      equals: 'published',
    },
  }
}

/** Tylko rola `admin`. */
export const admins: Access = ({ req: { user } }) => user?.role === 'admin'

export const adminsField: FieldAccess = ({ req: { user } }) => user?.role === 'admin'

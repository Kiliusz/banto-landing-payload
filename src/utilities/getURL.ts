/**
 * Bazowy URL serwisu. Ustawiany przez NEXT_PUBLIC_SERVER_URL (Dokploy → Environment).
 * Bez ukośnika na końcu.
 */
export const getServerURL = (): string => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL

  if (url) return url.replace(/\/$/, '')

  return `http://localhost:${process.env.PORT || 3000}`
}

/** Absolutny URL z podanej ścieżki względnej. */
export const absoluteUrl = (path = '/'): string =>
  `${getServerURL()}${path.startsWith('/') ? path : `/${path}`}`

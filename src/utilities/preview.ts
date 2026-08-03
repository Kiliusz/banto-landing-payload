import { getServerURL } from './getURL'

/**
 * Adres podglądu wersji roboczej. Trafia do /next/preview, które sprawdza
 * sekret + zalogowanego użytkownika, włącza draft mode i przekierowuje na `path`.
 */
export const getPreviewUrl = (path: string): string => {
  const params = new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `${getServerURL()}/next/preview?${params.toString()}`
}

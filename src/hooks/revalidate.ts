import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'
import { revalidatePath } from 'next/cache'

/**
 * Strony i wpisy są generowane statycznie (SSG). Zamiast przebudowywać cały
 * serwis, po każdej publikacji odświeżamy punktowo dotknięte ścieżki —
 * to jest ISR / on-demand revalidation.
 *
 * `context.disableRevalidate` pozwala wyłączyć odświeżanie np. w seedzie,
 * gdzie i tak nie ma jeszcze cache'u, a `revalidatePath` poza requestem rzuca.
 */

type Doc = { slug?: string | null; _status?: string | null }

const safeRevalidate = (path: string, type?: 'page' | 'layout') => {
  try {
    revalidatePath(path, type)
  } catch {
    // poza kontekstem requestu Next rzuca — w seedzie/CLI to nieszkodliwe
  }
}

const pagePath = (slug?: string | null) => (slug === 'home' ? '/' : `/${slug}`)

export const revalidatePage: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { context, payload },
}) => {
  if (context.disableRevalidate) return doc

  const current = doc as Doc
  const previous = previousDoc as Doc | undefined

  if (current._status === 'published') {
    const path = pagePath(current.slug)
    payload.logger.info(`Odświeżam stronę: ${path}`)
    safeRevalidate(path)
  }

  // strona zdjęta z publikacji albo zmieniony slug → odśwież też stary adres
  if (previous?._status === 'published' && previous.slug !== current.slug) {
    safeRevalidate(pagePath(previous.slug))
  }
  if (previous?._status === 'published' && current._status !== 'published') {
    safeRevalidate(pagePath(previous.slug))
  }

  safeRevalidate('/sitemap.xml')

  return doc
}

export const revalidatePageDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (context.disableRevalidate) return doc
  safeRevalidate(pagePath((doc as Doc)?.slug))
  safeRevalidate('/sitemap.xml')
  return doc
}

export const revalidatePost: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { context, payload },
}) => {
  if (context.disableRevalidate) return doc

  const current = doc as Doc
  const previous = previousDoc as Doc | undefined

  if (current._status === 'published') {
    payload.logger.info(`Odświeżam wpis: /blog/${current.slug}`)
    safeRevalidate(`/blog/${current.slug}`)
  }

  if (previous?._status === 'published' && previous.slug !== current.slug) {
    safeRevalidate(`/blog/${previous.slug}`)
  }
  if (previous?._status === 'published' && current._status !== 'published') {
    safeRevalidate(`/blog/${previous.slug}`)
  }

  // lista bloga, kategorie i strona główna (blok „najnowsze wpisy")
  safeRevalidate('/blog')
  safeRevalidate('/blog/kategoria/[slug]', 'page')
  safeRevalidate('/')
  safeRevalidate('/sitemap.xml')

  return doc
}

export const revalidatePostDelete: CollectionAfterDeleteHook = ({ doc, req: { context } }) => {
  if (context.disableRevalidate) return doc
  safeRevalidate(`/blog/${(doc as Doc)?.slug}`)
  safeRevalidate('/blog')
  safeRevalidate('/')
  safeRevalidate('/sitemap.xml')
  return doc
}

/** Header/Footer/SiteSettings siedzą w layoucie — po zmianie odświeżamy cały serwis. */
export const revalidateLayout: GlobalAfterChangeHook = ({ doc, req: { context, payload } }) => {
  if (context.disableRevalidate) return doc
  payload.logger.info('Odświeżam layout (/)')
  safeRevalidate('/', 'layout')
  return doc
}

import type { Metadata } from 'next'

import { getSiteSettings } from './getGlobals'
import { getServerURL } from './getURL'

type MetaDoc = {
  title?: string | null
  excerpt?: string | null
  slug?: string | null
  meta?: {
    title?: string | null
    description?: string | null
    image?: { url?: string | null } | string | number | null
  } | null
  heroImage?: { url?: string | null } | string | number | null
}

const imageUrl = (value: unknown): string | null => {
  if (value && typeof value === 'object' && 'url' in value) {
    const url = (value as { url?: string | null }).url
    if (url) return url.startsWith('http') ? url : `${getServerURL()}${url}`
  }
  return null
}

/** Buduje metadane strony/wpisu z pól SEO, z sensownymi fallbackami. */
export const generateMeta = async ({
  doc,
  path,
}: {
  doc?: MetaDoc | null
  path?: string
}): Promise<Metadata> => {
  const settings = await getSiteSettings()

  const title = doc?.meta?.title || (doc?.title ? `${doc.title}` : settings?.defaultTitle) || 'banto'
  const description =
    doc?.meta?.description || doc?.excerpt || settings?.defaultDescription || undefined

  const ogImage =
    imageUrl(doc?.meta?.image) ??
    imageUrl(doc?.heroImage) ??
    imageUrl(settings?.defaultOgImage) ??
    `${getServerURL()}/brand/kids.png`

  const url = path ? `${getServerURL()}${path}` : undefined

  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}

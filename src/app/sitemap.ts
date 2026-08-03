import type { MetadataRoute } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getServerURL } from '@/utilities/getURL'

// Generowana na żądanie — roboty odpytują ją rzadko, a build nie potrzebuje bazy.
export const dynamic = 'force-dynamic'

/** Zarezerwowane slugi obsługiwane własnymi trasami. */
const RESERVED = new Set(['home', 'blog'])

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })
  const base = getServerURL()

  const [pages, posts, categories] = await Promise.all([
    payload.find({
      collection: 'pages',
      draft: false,
      limit: 200,
      overrideAccess: false,
      pagination: false,
      select: { slug: true, updatedAt: true },
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'posts',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: { slug: true, updatedAt: true },
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'categories',
      limit: 100,
      pagination: false,
      select: { slug: true, updatedAt: true },
    }),
  ])

  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/blog`, changeFrequency: 'daily', priority: 0.8 },
    ...pages.docs
      .filter((page) => page.slug && !RESERVED.has(page.slug))
      .map((page) => ({
        url: `${base}/${page.slug}`,
        lastModified: page.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
    ...posts.docs
      .filter((post) => post.slug)
      .map((post) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    ...categories.docs
      .filter((category) => category.slug)
      .map((category) => ({
        url: `${base}/blog/kategoria/${category.slug}`,
        lastModified: category.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      })),
  ]
}

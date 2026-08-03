import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

/**
 * Wspólne zapytania do Payloada.
 *
 * `draft` bierzemy z draftMode(): w buildzie jest zawsze `false`, więc strony
 * generują się statycznie. Dopiero ciasteczko podglądu (ustawiane przez
 * /next/preview) przełącza render na żądanie i pokazuje wersje robocze.
 */

export const queryPageBySlug = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  return result.docs[0] ?? null
})

export const queryPostBySlug = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  return result.docs[0] ?? null
})

export const queryCategoryBySlug = cache(async (slug: string) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  return result.docs[0] ?? null
})

const POST_CARD_SELECT = {
  title: true,
  slug: true,
  excerpt: true,
  heroImage: true,
  publishedAt: true,
  readingTime: true,
  categories: true,
} as const

export const queryPublishedPosts = async ({
  categoryId,
  limit = 12,
  page = 1,
}: {
  categoryId?: string | number
  limit?: number
  page?: number
} = {}) => {
  const payload = await getPayload({ config: configPromise })

  return payload.find({
    collection: 'posts',
    depth: 1,
    limit,
    page,
    overrideAccess: false,
    sort: '-publishedAt',
    where: {
      _status: { equals: 'published' },
      ...(categoryId ? { categories: { in: [categoryId] } } : {}),
    },
    select: POST_CARD_SELECT,
  })
}

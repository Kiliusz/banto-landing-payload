import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { EmptyHome } from '@/components/EmptyHome'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { generateMeta } from '@/utilities/generateMeta'
import { queryPageBySlug } from '@/utilities/queries'

/**
 * Jedna trasa obsługuje stronę główną (`/` → dokument o slugu `home`) i wszystkie
 * pozostałe strony z CMS-u (`/polityka-prywatnosci` itd.).
 *
 * Dlaczego catch-all zamiast osobnych `page.tsx` i `[slug]/page.tsx`?
 * Bo dzięki `generateStaticParams` trasa może zostać zbudowana bez dostępu do bazy
 * (obraz Dockera buduje się, zanim wstanie Postgres). Wtedy lista parametrów jest
 * pusta, a strony renderują się przy pierwszym wejściu i lądują w cache'u ISR —
 * czyszczonym punktowo przez hooki `revalidatePage` po każdej publikacji.
 */

/** Ścieżki obsługiwane własnymi trasami — nie generujemy ich z CMS-u. */
const RESERVED = new Set(['home', 'blog', 'admin', 'next', 'api'])

export const generateStaticParams = async () => {
  // Build bez bazy (Docker/Dokploy): nic nie prerenderujemy, wszystko wejdzie do
  // cache'u przy pierwszym żądaniu.
  if (process.env.SKIP_BUILD_STATIC_GENERATION) return []

  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 200,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return [
    // strona główna: brak segmentów
    { slug: [] as string[] },
    ...docs
      .filter((page) => page.slug && !RESERVED.has(page.slug))
      .map((page) => ({ slug: [page.slug as string] })),
  ]
}

type Args = { params: Promise<{ slug?: string[] }> }

/** `/` → 'home', `/cokolwiek` → 'cokolwiek', głębsze ścieżki → null (404). */
const resolveSlug = (segments?: string[]): string | null => {
  if (!segments || segments.length === 0) return 'home'
  if (segments.length > 1) return null

  const slug = decodeURIComponent(segments[0])
  return RESERVED.has(slug) ? null : slug
}

export const generateMetadata = async ({ params }: Args): Promise<Metadata> => {
  const { slug: segments } = await params
  const slug = resolveSlug(segments)

  if (!slug) return {}

  const page = await queryPageBySlug(slug)
  return generateMeta({ doc: page, path: slug === 'home' ? '/' : `/${slug}` })
}

export default async function Page({ params }: Args) {
  const { slug: segments } = await params
  const slug = resolveSlug(segments)

  if (!slug) notFound()

  const page = await queryPageBySlug(slug)

  if (!page) {
    // Świeża instalacja — zamiast pustej strony pokazujemy, co zrobić dalej.
    if (slug === 'home') return <EmptyHome />
    notFound()
  }

  return (
    <>
      <LivePreviewListener />
      <RenderBlocks blocks={page.layout} />
    </>
  )
}

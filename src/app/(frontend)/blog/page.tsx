import type { Metadata } from 'next'
import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { PostCard, type PostCardDoc } from '@/components/PostCard'
import { Container } from '@/components/ui/Container'
import { queryPublishedPosts } from '@/utilities/queries'
import { getServerURL } from '@/utilities/getURL'

// Lista renderuje się na żądanie — to jedno tanie zapytanie do bazy, a dzięki temu
// nowy wpis pojawia się natychmiast i obraz Dockera buduje się bez dostępu do bazy.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Praktyczne teksty dla rodziców i opiekunów: bezpieczeństwo w sieci, relacje rówieśnicze i emocje dzieci 8–12 lat.',
  alternates: { canonical: `${getServerURL()}/blog` },
}

export default async function BlogIndex() {
  const payload = await getPayload({ config: configPromise })

  const [{ docs: posts }, { docs: categories }] = await Promise.all([
    queryPublishedPosts({ limit: 24 }),
    payload.find({
      collection: 'categories',
      limit: 20,
      pagination: false,
      depth: 0,
      sort: 'title',
    }),
  ])

  return (
    <div className="bg-cream py-16 sm:py-20">
      <Container>
        <header className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold tracking-wider text-blue uppercase">Blog</p>
          <h1 className="text-4xl leading-tight sm:text-5xl">
            Jak towarzyszyć dziecku <span className="accent">w cyfrowym świecie</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">
            Konkretne wskazówki dla rodziców dzieci w wieku 8–12 lat — o bezpieczeństwie, relacjach
            i emocjach.
          </p>
        </header>

        {categories.length > 0 && (
          <nav aria-label="Kategorie" className="mb-10 flex flex-wrap gap-2">
            <span className="inline-flex h-10 items-center rounded-full bg-blue px-4 text-sm font-semibold text-white">
              Wszystkie
            </span>
            {categories.map((category) => (
              <Link
                className="inline-flex h-10 items-center rounded-full bg-white px-4 text-sm font-semibold text-ink ring-1 ring-line hover:text-blue hover:ring-blue"
                href={`/blog/kategoria/${category.slug}`}
                key={category.id}
              >
                {category.title}
              </Link>
            ))}
          </nav>
        )}

        {posts.length === 0 ? (
          <p className="rounded-banto-lg bg-white p-10 text-center text-muted">
            Pierwsze wpisy pojawią się już wkrótce.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post as PostCardDoc} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}

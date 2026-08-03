import type { Metadata } from 'next'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { PostCard, type PostCardDoc } from '@/components/PostCard'
import { RichText } from '@/components/RichText'
import { Container } from '@/components/ui/Container'
import { formatDatePL } from '@/utilities/formatDate'
import { generateMeta } from '@/utilities/generateMeta'
import { getServerURL } from '@/utilities/getURL'
import { queryPostBySlug } from '@/utilities/queries'

/**
 * Wpisy są prerenderowane w czasie builda, o ile build ma dostęp do bazy.
 * W obrazie Dockera bazy nie ma — wtedy lista jest pusta, a wpis renderuje się
 * przy pierwszym wejściu i trafia do cache'u ISR (hook `revalidatePost` go czyści).
 */
export const generateStaticParams = async () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) return []

  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return docs.filter((post) => post.slug).map((post) => ({ slug: post.slug as string }))
}

type Args = { params: Promise<{ slug: string }> }

export const generateMetadata = async ({ params }: Args): Promise<Metadata> => {
  const { slug } = await params
  const post = await queryPostBySlug(decodeURIComponent(slug))

  return generateMeta({ doc: post, path: `/blog/${slug}` })
}

export default async function PostPage({ params }: Args) {
  const { slug } = await params
  const post = await queryPostBySlug(decodeURIComponent(slug))

  if (!post) notFound()

  // relacje przychodzą jako obiekt (depth: 2) albo jako samo id — bierzemy tylko rozwinięte
  const categories = (post.categories ?? []).filter(
    (category) => typeof category === 'object',
  ) as { id: number | string; title: string; slug?: string | null }[]

  const related = (post.relatedPosts ?? []).filter(
    (item) => typeof item === 'object',
  ) as unknown as PostCardDoc[]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.meta?.description || post.excerpt || undefined,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${getServerURL()}/blog/${post.slug}`,
    publisher: { '@type': 'Organization', name: 'banto' },
  }

  return (
    <article>
      <LivePreviewListener />

      <header className="bg-cream pt-12 pb-10 sm:pt-16">
        <Container size="narrow">
          <nav aria-label="Okruszki" className="mb-6 text-sm text-muted">
            <Link className="hover:text-blue" href="/blog">
              Blog
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{post.title}</span>
          </nav>

          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
            {categories.map((category) => (
              <Link
                className="rounded-full bg-white px-3 py-1 font-semibold text-blue ring-1 ring-line"
                href={`/blog/kategoria/${category.slug}`}
                key={category.id}
              >
                {category.title}
              </Link>
            ))}
            {post.publishedAt && (
              <time className="text-muted" dateTime={post.publishedAt}>
                {formatDatePL(post.publishedAt)}
              </time>
            )}
            {post.readingTime ? (
              <span className="text-muted">· {post.readingTime} min czytania</span>
            ) : null}
          </div>

          <h1 className="text-4xl leading-tight sm:text-5xl">{post.title}</h1>

          {post.excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-ink-soft text-pretty">{post.excerpt}</p>
          )}
        </Container>
      </header>

      {post.heroImage && typeof post.heroImage === 'object' && (
        <Container size="default">
          <Media
            className="-mt-2 aspect-[16/9] w-full overflow-hidden rounded-banto-xl"
            priority
            resource={post.heroImage}
            sizes="(max-width: 1024px) 100vw, 1000px"
          />
        </Container>
      )}

      <Container className="py-12 sm:py-16" size="narrow">
        <RichText data={post.content} />
      </Container>

      {related.length > 0 && (
        <section className="border-t border-line bg-cream py-16">
          <Container>
            <h2 className="mb-8 text-2xl sm:text-3xl">Przeczytaj także</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.id} post={item} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
    </article>
  )
}

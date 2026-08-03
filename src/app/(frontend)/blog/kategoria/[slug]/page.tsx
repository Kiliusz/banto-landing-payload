import type { Metadata } from 'next'
import configPromise from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { PostCard, type PostCardDoc } from '@/components/PostCard'
import { Container } from '@/components/ui/Container'
import { getServerURL } from '@/utilities/getURL'
import { queryCategoryBySlug, queryPublishedPosts } from '@/utilities/queries'

export const revalidate = 3600

export const generateStaticParams = async () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) return []

  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'categories',
    limit: 100,
    pagination: false,
    select: { slug: true },
  })

  return docs.filter((c) => c.slug).map((c) => ({ slug: c.slug as string }))
}

type Args = { params: Promise<{ slug: string }> }

export const generateMetadata = async ({ params }: Args): Promise<Metadata> => {
  const { slug } = await params
  const category = await queryCategoryBySlug(decodeURIComponent(slug))

  if (!category) return { title: 'Kategoria' }

  return {
    title: category.title,
    description: category.description || `Wpisy z kategorii ${category.title} na blogu banto.`,
    alternates: { canonical: `${getServerURL()}/blog/kategoria/${slug}` },
  }
}

export default async function CategoryPage({ params }: Args) {
  const { slug } = await params
  const category = await queryCategoryBySlug(decodeURIComponent(slug))

  if (!category) notFound()

  const { docs: posts } = await queryPublishedPosts({ categoryId: category.id, limit: 24 })

  return (
    <div className="bg-cream py-16 sm:py-20">
      <Container>
        <nav aria-label="Okruszki" className="mb-6 text-sm text-muted">
          <Link className="hover:text-blue" href="/blog">
            Blog
          </Link>
          <span aria-hidden="true"> / </span>
          <span>{category.title}</span>
        </nav>

        <header className="mb-10 max-w-2xl">
          <h1 className="text-4xl leading-tight sm:text-5xl">{category.title}</h1>
          {category.description && (
            <p className="mt-4 text-lg leading-relaxed text-muted text-pretty">
              {category.description}
            </p>
          )}
        </header>

        {posts.length === 0 ? (
          <p className="rounded-banto-lg bg-white p-10 text-center text-muted">
            W tej kategorii nie ma jeszcze wpisów.
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

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { PostCard, type PostCardDoc } from '@/components/PostCard'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ArrowRight } from '@/components/ui/Icons'
import { Section, SectionHeading } from '@/components/ui/Section'

export type LatestPostsProps = {
  heading: string
  subheading?: string | null
  limit?: number | null
  category?: { id?: string | number } | string | number | null
  showArchiveLink?: boolean | null
}

export const LatestPostsComponent = async ({
  category,
  heading,
  limit,
  showArchiveLink,
  subheading,
}: LatestPostsProps) => {
  const payload = await getPayload({ config: configPromise })

  const categoryId = typeof category === 'object' && category ? category.id : category

  const { docs } = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: limit ?? 3,
    overrideAccess: false,
    sort: '-publishedAt',
    where: {
      _status: { equals: 'published' },
      ...(categoryId ? { categories: { in: [categoryId] } } : {}),
    },
    select: {
      title: true,
      slug: true,
      excerpt: true,
      heroImage: true,
      publishedAt: true,
      readingTime: true,
      categories: true,
    },
  })

  if (docs.length === 0) return null

  return (
    <Section background="cream">
      <Container>
        <SectionHeading heading={heading} subheading={subheading} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((post) => (
            <PostCard key={post.id} post={post as PostCardDoc} />
          ))}
        </div>

        {showArchiveLink && (
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/blog" variant="ghost">
              Zobacz wszystkie wpisy
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        )}
      </Container>
    </Section>
  )
}

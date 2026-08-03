import Link from 'next/link'
import React from 'react'

import { Media, type MediaDoc } from '@/components/Media'
import { formatDatePL } from '@/utilities/formatDate'
import { cn } from '@/utilities/ui'

export type PostCardDoc = {
  id?: string | number
  slug?: string | null
  title?: string | null
  excerpt?: string | null
  publishedAt?: string | null
  readingTime?: number | null
  heroImage?: MediaDoc | string | number | null
  categories?: ({ title?: string | null; slug?: string | null; color?: string | null } | string | number)[] | null
}

const CATEGORY_COLORS: Record<string, string> = {
  blue: 'bg-blue-soft text-blue',
  pink: 'bg-pink-soft text-pink',
  lime: 'bg-lime-soft text-ink',
  ink: 'bg-cream text-ink',
}

export const PostCard = ({ className, post }: { className?: string; post: PostCardDoc }) => {
  const category = post.categories?.find((c) => typeof c === 'object') as
    | { title?: string | null; color?: string | null }
    | undefined

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-banto-lg bg-white',
        'ring-1 ring-line transition-shadow hover:shadow-banto',
        className,
      )}
    >
      <Link className="block" href={`/blog/${post.slug}`} tabIndex={-1}>
        <Media
          className="aspect-[16/10] w-full overflow-hidden bg-cream"
          fallbackAlt=""
          fallbackSrc="/brand/kids.png"
          imgClassName="transition-transform duration-300 group-hover:scale-[1.03]"
          resource={post.heroImage}
          sizes="(max-width: 768px) 100vw, 380px"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
          {category?.title && (
            <span
              className={cn(
                'rounded-full px-3 py-1 font-semibold',
                CATEGORY_COLORS[category.color ?? 'blue'],
              )}
            >
              {category.title}
            </span>
          )}
          {post.publishedAt && (
            <time className="text-muted" dateTime={post.publishedAt}>
              {formatDatePL(post.publishedAt)}
            </time>
          )}
          {post.readingTime ? (
            <span className="text-muted">· {post.readingTime} min czytania</span>
          ) : null}
        </div>

        <h3 className="font-display text-xl leading-snug">
          <Link className="after:absolute after:inset-0" href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="mt-2 line-clamp-3 leading-relaxed text-muted text-pretty">{post.excerpt}</p>
        )}
      </div>
    </article>
  )
}

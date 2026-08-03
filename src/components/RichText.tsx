import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as LexicalRichText,
} from '@payloadcms/richtext-lexical/react'
import React from 'react'

import { Media, type MediaDoc } from '@/components/Media'
import type { CalloutBlock, MediaBlock, QuoteBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const doc = linkNode.fields?.doc
  if (!doc || typeof doc.value !== 'object') return '/'

  const slug = (doc.value as { slug?: string })?.slug ?? ''

  switch (doc.relationTo) {
    case 'posts':
      return `/blog/${slug}`
    case 'pages':
      return slug === 'home' ? '/' : `/${slug}`
    default:
      return `/${slug}`
  }
}

const CALLOUT_TONES: Record<string, string> = {
  info: 'border-blue bg-blue-soft',
  tip: 'border-lime bg-lime-soft',
  warning: 'border-pink bg-pink-soft',
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type NodeTypes = DefaultNodeTypes | SerializedBlockNode<CalloutBlock | MediaBlock | QuoteBlock>

const converters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    mediaBlock: ({ node }: any) => {
      const { caption, media, size } = node.fields ?? {}
      return (
        <figure
          className={cn('not-prose my-10', {
            'lg:-mx-16': size === 'wide',
            'lg:-mx-32': size === 'full',
          })}
        >
          <Media
            className="aspect-[16/9] w-full overflow-hidden rounded-banto-lg"
            resource={media as MediaDoc}
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {(caption || (media as MediaDoc)?.caption) && (
            <figcaption className="mt-3 text-center text-sm text-muted">
              {caption || (media as MediaDoc)?.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    quote: ({ node }: any) => {
      const { author, quote, role } = node.fields ?? {}
      return (
        <figure className="not-prose my-10 rounded-banto-lg border-l-4 border-pink bg-cream p-6 sm:p-8">
          <blockquote className="font-display text-xl leading-snug text-ink sm:text-2xl">
            &bdquo;{quote}&rdquo;
          </blockquote>
          {author && (
            <figcaption className="mt-4 text-sm text-muted">
              <span className="font-semibold text-ink">{author}</span>
              {role ? ` — ${role}` : ''}
            </figcaption>
          )}
        </figure>
      )
    },
    callout: ({ node }: any) => {
      const { body, title, tone } = node.fields ?? {}
      return (
        <aside
          className={cn(
            'not-prose my-8 rounded-banto border-l-4 p-5 sm:p-6',
            CALLOUT_TONES[tone as string] ?? CALLOUT_TONES.info,
          )}
        >
          {title && <p className="font-display text-lg font-bold text-ink">{title}</p>}
          <p className={cn('leading-relaxed text-ink-soft', title && 'mt-1')}>{body}</p>
        </aside>
      )
    },
  },
})
/* eslint-enable @typescript-eslint/no-explicit-any */

type Props = {
  className?: string
  data: SerializedEditorState
  /** Wyłącza klasy `prose` — przydatne, gdy blok sam rządzi typografią. */
  plain?: boolean
}

export const RichText = ({ className, data, plain = false }: Props) => {
  if (!data) return null

  return (
    <LexicalRichText
      className={cn(
        !plain && 'prose prose-banto max-w-none prose-headings:font-display',
        !plain && 'prose-lg prose-img:rounded-banto',
        className,
      )}
      converters={converters}
      data={data}
    />
  )
}

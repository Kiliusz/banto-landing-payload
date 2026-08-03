import Link from 'next/link'
import React from 'react'

import { buttonClasses, type ButtonSize, type ButtonVariant } from '@/components/ui/Button'
import { cn } from '@/utilities/ui'

/**
 * Struktura pola `link` z Payloada (patrz src/fields/link.ts).
 * Typ trzymamy lokalnie, żeby komponent nie zależał od kolejności
 * generowania payload-types.ts.
 */
export type CMSLinkValue = {
  type?: ('reference' | 'custom') | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: string | number | { slug?: string | null }
  } | null
  url?: string | null
  label?: string | null
  appearance?: ('primary' | 'secondary' | 'ghost' | 'inline') | null
}

/** Zamienia relację na ścieżkę: strony w korzeniu, wpisy pod /blog. */
export const resolveLinkHref = (link?: CMSLinkValue | null): string | null => {
  if (!link) return null

  if (link.type === 'custom') return link.url || null

  const reference = link.reference
  if (!reference || typeof reference.value !== 'object') return null

  const slug = reference.value?.slug
  if (!slug) return null

  if (reference.relationTo === 'posts') return `/blog/${slug}`
  return slug === 'home' ? '/' : `/${slug}`
}

type Props = {
  children?: React.ReactNode
  className?: string
  link?: CMSLinkValue | null
  size?: ButtonSize
  /** Nadpisuje `appearance` z CMS-u — przydatne w blokach o ciemnym tle. */
  variant?: ButtonVariant
}

export const CMSLink = ({ children, className, link, size, variant }: Props) => {
  const href = resolveLinkHref(link)
  if (!href) return null

  const appearance = variant ?? link?.appearance ?? 'inline'
  const isExternal = href.startsWith('http') || href.startsWith('mailto:')
  const newTab = link?.newTab || (isExternal && !href.startsWith('mailto:'))

  const content = children ?? link?.label
  const classes = cn(buttonClasses({ size, variant: appearance }), className)

  if (isExternal) {
    return (
      <a
        className={classes}
        href={href}
        rel={newTab ? 'noopener noreferrer' : undefined}
        target={newTab ? '_blank' : undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      className={classes}
      href={href}
      rel={newTab ? 'noopener noreferrer' : undefined}
      target={newTab ? '_blank' : undefined}
    >
      {content}
    </Link>
  )
}

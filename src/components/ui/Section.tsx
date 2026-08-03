import React from 'react'

import { cn } from '@/utilities/ui'

export type SectionBackground = 'white' | 'cream' | 'blue' | 'pink'

const BACKGROUNDS: Record<SectionBackground, string> = {
  white: 'bg-white text-ink',
  cream: 'bg-cream text-ink',
  blue: 'bg-blue text-white',
  pink: 'bg-pink text-white',
}

export const Section = ({
  background = 'white',
  children,
  className,
  id,
}: {
  background?: SectionBackground
  children: React.ReactNode
  className?: string
  id?: string
}) => (
  <section
    id={id}
    className={cn('py-16 sm:py-24', BACKGROUNDS[background], className)}
    // scroll-mt = nagłówek jest sticky, inaczej kotwica chowa tytuł pod paskiem
    style={{ scrollMarginTop: '5rem' }}
  >
    {children}
  </section>
)

export const SectionHeading = ({
  align = 'center',
  eyebrow,
  heading,
  inverted = false,
  subheading,
}: {
  align?: 'left' | 'center'
  eyebrow?: string | null
  heading: string
  inverted?: boolean
  subheading?: string | null
}) => (
  <div
    className={cn('mb-12 max-w-2xl', {
      'mx-auto text-center': align === 'center',
    })}
  >
    {eyebrow && (
      <p
        className={cn('mb-3 text-sm font-semibold tracking-wider uppercase', {
          'text-blue': !inverted,
          'text-white/80': inverted,
        })}
      >
        {eyebrow}
      </p>
    )}
    <h2 className="text-3xl leading-tight sm:text-4xl">{heading}</h2>
    {subheading && (
      <p
        className={cn('mt-4 text-lg leading-relaxed text-pretty', {
          'text-muted': !inverted,
          'text-white/85': inverted,
        })}
      >
        {subheading}
      </p>
    )}
  </div>
)

import React from 'react'

import { Media, type MediaDoc } from '@/components/Media'
import { Container } from '@/components/ui/Container'

export type MediaBlockProps = {
  media: MediaDoc | string | number
  caption?: string | null
  size?: ('default' | 'wide' | 'full') | null
}

export const MediaBlockComponent = ({ caption, media, size = 'default' }: MediaBlockProps) => {
  const figure = (
    <figure>
      <Media
        className="aspect-[16/9] w-full overflow-hidden rounded-banto-lg bg-cream"
        resource={media}
        sizes={size === 'full' ? '100vw' : '(max-width: 768px) 100vw, 900px'}
      />
      {caption && <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  )

  if (size === 'full') {
    return <div className="py-10">{figure}</div>
  }

  return (
    <div className="py-10">
      <Container size={size === 'wide' ? 'default' : 'narrow'}>{figure}</Container>
    </div>
  )
}

import NextImage from 'next/image'
import React from 'react'

import { cn } from '@/utilities/ui'

export type MediaDoc = {
  alt?: string | null
  caption?: string | null
  filename?: string | null
  height?: number | null
  mimeType?: string | null
  url?: string | null
  width?: number | null
  sizes?: Record<string, { url?: string | null; width?: number | null }> | null
}

type Props = {
  className?: string
  fill?: boolean
  imgClassName?: string
  /**
   * Zdjęcie widoczne w pierwszym ekranie (kandydat na LCP).
   * Next 16 wycofał prop `priority` na rzecz `preload` — sam `priority`
   * nie ustawia już `loading="eager"`, więc obrazek ładowałby się leniwie.
   */
  priority?: boolean
  resource?: MediaDoc | string | number | null
  sizes?: string
  /** Ścieżka do pliku w /public, gdy w CMS-ie nic nie wgrano. */
  fallbackSrc?: string
  fallbackAlt?: string
}

const DEFAULT_SIZES = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px'

/**
 * Payload zwraca absolutny URL (bo config ma `serverURL`). Optymalizator obrazów
 * Next-a traktowałby go wtedy jak zasób zdalny i — w Dockerze czy na localhoście —
 * odrzucał jako „private ip". Ścinamy więc host i zostawiamy ścieżkę względną.
 */
const toRelativeUrl = (url: string): string => {
  if (!url.startsWith('http')) return url

  try {
    const parsed = new URL(url)
    return `${parsed.pathname}${parsed.search}`
  } catch {
    return url
  }
}

export const Media = ({
  className,
  fill,
  imgClassName,
  priority,
  resource,
  sizes = DEFAULT_SIZES,
  fallbackSrc,
  fallbackAlt = '',
}: Props) => {
  const doc = typeof resource === 'object' && resource !== null ? resource : null
  const rawSrc = doc?.url || fallbackSrc

  if (!rawSrc) return null

  const src = toRelativeUrl(rawSrc)

  const alt = doc?.alt ?? fallbackAlt
  const width = doc?.width ?? undefined
  const height = doc?.height ?? undefined

  // Bez znanych wymiarów (np. plik z /public) używamy trybu `fill`,
  // żeby Next nie krzyczał o brakujące width/height.
  const useFill = fill || !width || !height

  // Komplet atrybutów dla obrazka nad zgięciem: link preload w <head>,
  // brak leniwego ładowania i wysoki priorytet pobrania.
  const eager = priority
    ? { preload: true, loading: 'eager' as const, fetchPriority: 'high' as const }
    : {}

  if (useFill) {
    return (
      <span className={cn('relative block', className)}>
        <NextImage
          alt={alt}
          className={cn('object-cover', imgClassName)}
          fill
          sizes={sizes}
          src={src}
          {...eager}
        />
      </span>
    )
  }

  return (
    <NextImage
      alt={alt}
      className={cn(className, imgClassName)}
      height={height}
      sizes={sizes}
      src={src}
      width={width}
      {...eager}
    />
  )
}

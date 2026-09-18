'use client'

import React, { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'

const ROTATE_INTERVAL_MS = 2500

type Props = {
  words: string[]
  className?: string
}

/**
 * Animowane, cyklicznie zmieniające się słowo/fraza przed nagłówkiem
 * (odpowiednik `nectar_rotating_words_title` z WordPressa).
 *
 * - Pełna lista fraz trafia do czytników ekranu jako zwykły tekst (`sr-only`),
 *   więc treść pozostaje w pełni dostępna niezależnie od animacji.
 * - Wersja wizualna jest `aria-hidden` i chowa się razem z resztą, gdy
 *   użytkownik woli mniej ruchu (`prefers-reduced-motion`) — wtedy zostaje
 *   pierwsza fraza, bez cyklicznej zmiany.
 * - Wszystkie warianty renderują się jednocześnie, ułożone w tej samej
 *   komórce siatki (`grid`), dzięki czemu kontener od razu ma szerokość i
 *   wysokość najdłuższej frazy — zmiana słowa nie przesuwa układu strony.
 */
export const RotatingWord = ({ words, className }: Props) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (words.length <= 1) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length)
    }, ROTATE_INTERVAL_MS)

    return () => window.clearInterval(id)
  }, [words.length])

  if (words.length === 0) return null

  return (
    <span className={cn('relative inline-grid align-top text-left', className)}>
      {/* Czytnik ekranu dostaje wszystkie warianty jako jeden statyczny tekst. */}
      <span className="sr-only">{words.join(', ')}</span>

      <span aria-hidden="true" className="isolate col-start-1 row-start-1 grid">
        {words.map((word, wordIndex) => (
          <span
            className={cn(
              'col-start-1 row-start-1 text-pink transition-opacity duration-500 ease-out motion-reduce:transition-none',
              wordIndex === index ? 'opacity-100' : 'opacity-0',
            )}
            key={word + wordIndex}
          >
            {word}
          </span>
        ))}
      </span>
    </span>
  )
}

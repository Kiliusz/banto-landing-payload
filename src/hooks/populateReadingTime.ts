import type { CollectionBeforeChangeHook } from 'payload'

import { lexicalToPlainText } from '@/utilities/lexicalToPlainText'

/** Średnie tempo czytania po polsku ≈ 200 słów/min. */
const WORDS_PER_MINUTE = 200

export const populateReadingTime: CollectionBeforeChangeHook = ({ data }) => {
  if (!data?.content) return data

  const words = lexicalToPlainText(data.content).split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE))

  return {
    ...data,
    readingTime: data.readingTime || minutes,
  }
}

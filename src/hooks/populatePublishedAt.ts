import type { CollectionBeforeChangeHook } from 'payload'

/** Jeśli redaktor nie ustawił daty publikacji, wpisujemy „teraz". */
export const populatePublishedAt: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    if (req.data && !req.data.publishedAt) {
      return {
        ...data,
        publishedAt: new Date(),
      }
    }
  }

  return data
}

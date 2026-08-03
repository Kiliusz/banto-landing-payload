import type { Block } from 'payload'

export const QuoteBlock: Block = {
  slug: 'quote',
  interfaceName: 'QuoteBlock',
  labels: { singular: 'Cytat', plural: 'Cytaty' },
  fields: [
    { name: 'quote', type: 'textarea', label: 'Cytat', required: true },
    { name: 'author', type: 'text', label: 'Autor' },
    { name: 'role', type: 'text', label: 'Kto to jest' },
  ],
}

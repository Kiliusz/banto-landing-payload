import type { Block } from 'payload'

export const StepsBlock: Block = {
  slug: 'steps',
  interfaceName: 'StepsBlock',
  labels: { singular: 'Kroki', plural: 'Kroki' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Nadtytuł' },
    { name: 'heading', type: 'text', label: 'Nagłówek', required: true },
    { name: 'subheading', type: 'textarea', label: 'Podtytuł' },
    {
      name: 'items',
      type: 'array',
      label: 'Kroki',
      minRows: 2,
      maxRows: 5,
      labels: { singular: 'Krok', plural: 'Kroki' },
      fields: [
        { name: 'title', type: 'text', label: 'Tytuł', required: true },
        { name: 'description', type: 'textarea', label: 'Opis', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Ilustracja' },
      ],
    },
  ],
}

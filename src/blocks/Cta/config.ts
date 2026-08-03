import type { Block } from 'payload'

import { linkField } from '@/fields/link'

export const CtaBlock: Block = {
  slug: 'cta',
  interfaceName: 'CtaBlock',
  labels: { singular: 'Wezwanie do działania', plural: 'Wezwania do działania' },
  fields: [
    { name: 'heading', type: 'text', label: 'Nagłówek', required: true },
    { name: 'subheading', type: 'textarea', label: 'Podtytuł' },
    {
      name: 'links',
      type: 'array',
      label: 'Przyciski',
      maxRows: 2,
      fields: [linkField({ appearances: ['primary', 'secondary', 'ghost'] })],
    },
    {
      name: 'background',
      type: 'select',
      label: 'Tło',
      defaultValue: 'blue',
      options: [
        { label: 'Niebieskie', value: 'blue' },
        { label: 'Różowe', value: 'pink' },
        { label: 'Kremowe', value: 'cream' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

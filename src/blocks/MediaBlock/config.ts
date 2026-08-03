import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: { singular: 'Obrazek', plural: 'Obrazki' },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Plik',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Podpis',
    },
    {
      name: 'size',
      type: 'select',
      label: 'Szerokość',
      defaultValue: 'default',
      options: [
        { label: 'Kolumna tekstu', value: 'default' },
        { label: 'Szerszy', value: 'wide' },
        { label: 'Pełna szerokość', value: 'full' },
      ],
    },
  ],
}

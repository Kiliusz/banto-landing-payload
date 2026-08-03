import type { Block } from 'payload'

export const CalloutBlock: Block = {
  slug: 'callout',
  interfaceName: 'CalloutBlock',
  labels: { singular: 'Wyróżnienie', plural: 'Wyróżnienia' },
  fields: [
    {
      name: 'tone',
      type: 'select',
      label: 'Ton',
      defaultValue: 'info',
      options: [
        { label: 'Informacja', value: 'info' },
        { label: 'Wskazówka', value: 'tip' },
        { label: 'Uwaga', value: 'warning' },
      ],
    },
    { name: 'title', type: 'text', label: 'Tytuł' },
    { name: 'body', type: 'textarea', label: 'Treść', required: true },
  ],
}

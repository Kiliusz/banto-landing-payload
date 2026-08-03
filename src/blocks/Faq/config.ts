import type { Block } from 'payload'

export const FaqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  labels: { singular: 'FAQ', plural: 'FAQ' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Nadtytuł' },
    {
      name: 'heading',
      type: 'text',
      label: 'Nagłówek',
      required: true,
      defaultValue: 'Najczęstsze pytania',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Pytania',
      minRows: 1,
      labels: { singular: 'Pytanie', plural: 'Pytania' },
      fields: [
        { name: 'question', type: 'text', label: 'Pytanie', required: true },
        { name: 'answer', type: 'textarea', label: 'Odpowiedź', required: true },
      ],
    },
    {
      name: 'addSchema',
      type: 'checkbox',
      label: 'Dodaj dane strukturalne FAQPage',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Pozwala Google pokazać pytania bezpośrednio w wynikach wyszukiwania.',
      },
    },
  ],
}

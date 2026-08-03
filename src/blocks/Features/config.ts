import type { Block } from 'payload'

export const FeaturesBlock: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  labels: { singular: 'Kafelki', plural: 'Kafelki' },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Nadtytuł' },
    { name: 'heading', type: 'text', label: 'Nagłówek', required: true },
    { name: 'subheading', type: 'textarea', label: 'Podtytuł' },
    {
      name: 'columns',
      type: 'select',
      label: 'Kolumny',
      defaultValue: '3',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Kafelki',
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Kafelek', plural: 'Kafelki' },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Ikona',
          defaultValue: 'shield',
          options: [
            { label: 'Tarcza (bezpieczeństwo)', value: 'shield' },
            { label: 'Serce', value: 'heart' },
            { label: 'Wiadomość', value: 'chat' },
            { label: 'Ludzie', value: 'users' },
            { label: 'Iskra', value: 'sparkles' },
            { label: 'Kompas', value: 'compass' },
            { label: 'Zamek', value: 'lock' },
            { label: 'Uśmiech', value: 'smile' },
          ],
        },
        { name: 'title', type: 'text', label: 'Tytuł', required: true },
        { name: 'description', type: 'textarea', label: 'Opis', required: true },
      ],
    },
    {
      name: 'background',
      type: 'select',
      label: 'Tło',
      defaultValue: 'white',
      options: [
        { label: 'Białe', value: 'white' },
        { label: 'Kremowe', value: 'cream' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

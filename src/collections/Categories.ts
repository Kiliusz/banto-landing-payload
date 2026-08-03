import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Kategoria', plural: 'Kategorie' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
    group: 'Blog',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Nazwa',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Opis',
      admin: {
        description: 'Krótki opis wyświetlany na stronie kategorii i w wynikach wyszukiwania.',
      },
    },
    {
      name: 'color',
      type: 'select',
      label: 'Kolor etykiety',
      defaultValue: 'blue',
      options: [
        { label: 'Niebieski', value: 'blue' },
        { label: 'Różowy', value: 'pink' },
        { label: 'Limonkowy', value: 'lime' },
        { label: 'Grafitowy', value: 'ink' },
      ],
      admin: { position: 'sidebar' },
    },
    ...slugField('title'),
  ],
}

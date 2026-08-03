import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone, authenticated } from '@/access'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Plik', plural: 'Media' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Treść',
  },
  upload: {
    // Katalog jest montowany jako wolumen w Dockerze (patrz docker-compose).
    staticDir: path.resolve(dirname, '../../media'),
    mimeTypes: ['image/*', 'application/pdf'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'wide', width: 1600, height: undefined },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    formatOptions: {
      format: 'webp',
      options: { quality: 82 },
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Tekst alternatywny',
      required: true,
      admin: {
        description: 'Opis obrazka dla czytników ekranu i wyszukiwarek.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Podpis',
    },
  ],
}

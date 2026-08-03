import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { linkField } from '@/fields/link'
import { revalidateLayout } from '@/hooks/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Stopka',
  access: { read: anyone, update: authenticated },
  admin: { group: 'Wygląd' },
  hooks: { afterChange: [revalidateLayout] },
  fields: [
    {
      name: 'tagline',
      type: 'textarea',
      label: 'Krótki opis',
      defaultValue: 'Bezpieczna przestrzeń dla dziecięcych ekip.',
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Kolumny linków',
      maxRows: 3,
      labels: { singular: 'Kolumna', plural: 'Kolumny' },
      fields: [
        { name: 'title', type: 'text', label: 'Nagłówek kolumny', required: true },
        {
          name: 'links',
          type: 'array',
          label: 'Linki',
          fields: [linkField({ appearances: false })],
          admin: {
            components: {
              RowLabel: '@/components/admin/LinkRowLabel#LinkRowLabel',
            },
          },
        },
      ],
    },
    {
      name: 'social',
      type: 'array',
      label: 'Social media',
      maxRows: 6,
      fields: [
        {
          name: 'platform',
          type: 'select',
          label: 'Serwis',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
        { name: 'url', type: 'text', label: 'Adres', required: true },
      ],
    },
    {
      name: 'legal',
      type: 'text',
      label: 'Nota prawna',
      defaultValue: '© banto. Wszystkie prawa zastrzeżone.',
    },
  ],
}

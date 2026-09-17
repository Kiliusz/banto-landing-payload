import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { linkField } from '@/fields/link'
import { revalidateLayout } from '@/hooks/revalidate'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Nagłówek',
  access: { read: anyone, update: authenticated },
  admin: { group: 'Wygląd' },
  hooks: { afterChange: [revalidateLayout] },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Menu',
      maxRows: 8,
      labels: { singular: 'Pozycja', plural: 'Pozycje' },
      fields: [linkField({ appearances: false })],
      admin: {
        components: {
          RowLabel: '@/components/admin/LinkRowLabel#LinkRowLabel',
        },
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Przycisk w nagłówku',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Pokaż przycisk',
          defaultValue: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Napis',
          defaultValue: 'Dołącz do listy',
          admin: { condition: (_, sibling) => Boolean(sibling?.enabled) },
        },
        {
          name: 'anchor',
          type: 'text',
          label: 'Kotwica / adres',
          defaultValue: '#zapisy',
          admin: {
            condition: (_, sibling) => Boolean(sibling?.enabled),
            description: 'Np. #zapisy — przewinie do sekcji zapisów na tej samej stronie.',
          },
        },
      ],
    },
  ],
}

import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '@/access'
import { revalidateLayout } from '@/hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Ustawienia serwisu',
  access: { read: anyone, update: authenticated },
  admin: { group: 'Ustawienia' },
  hooks: { afterChange: [revalidateLayout] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Podstawowe',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: 'Nazwa serwisu',
              defaultValue: 'banto',
              required: true,
            },
            {
              name: 'defaultTitle',
              type: 'text',
              label: 'Domyślny tytuł strony',
              defaultValue: 'banto — bezpieczna przestrzeń dla dziecięcych ekip',
            },
            {
              name: 'defaultDescription',
              type: 'textarea',
              label: 'Domyślny opis',
              defaultValue:
                'banto tworzy bezpieczną przestrzeń dla dziecięcych ekip. Dla dzieci 8–12 lat i ich rodziców.',
            },
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Domyślny obrazek social media',
              admin: { description: 'Zalecane 1200×630 px.' },
            },
          ],
        },
        {
          label: 'Zapisy',
          fields: [
            {
              name: 'consentText',
              type: 'textarea',
              label: 'Treść zgody marketingowej',
              required: true,
              defaultValue:
                'Zgadzam się na otrzymywanie od banto informacji o premierze i treści marketingowych na podany e-mail.',
            },
            {
              name: 'privacyPolicy',
              type: 'relationship',
              relationTo: 'pages',
              label: 'Strona polityki prywatności',
              maxDepth: 1,
            },
            {
              name: 'successMessage',
              type: 'text',
              label: 'Komunikat po zapisie',
              defaultValue: 'Dziękujemy! Jesteś na liście oczekujących. 🎉',
            },
          ],
        },
        {
          label: 'Analityka',
          fields: [
            {
              name: 'plausibleDomain',
              type: 'text',
              label: 'Domena Plausible',
              admin: {
                description:
                  'Np. banto.pl — jeśli wypełnione, doładujemy skrypt Plausible (bez ciasteczek, bez zgody).',
              },
            },
          ],
        },
      ],
    },
  ],
}

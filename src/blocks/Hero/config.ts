import type { Block } from 'payload'

import { linkField } from '@/fields/link'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Hero' },
  imageAltText: 'Nagłówek strony ze zdjęciem i formularzem',
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Nadtytuł',
      admin: { description: 'Mały tekst nad nagłówkiem, np. „Premiera już wkrótce".' },
    },
    {
      name: 'rotatingWords',
      type: 'array',
      label: 'Zmieniające się słowa przed nagłówkiem',
      labels: { singular: 'Słowo/fraza', plural: 'Słowa/frazy' },
      maxRows: 5,
      admin: {
        description:
          'Opcjonalne. Jeśli wypełnione, przed „Nagłówkiem" pojawi się animowana, cyklicznie zmieniająca się fraza (np. „Bezpieczne miejsce" → „Cyfrowa twierdza" → …). Zostaw puste, żeby wyłączyć animację.',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Tekst',
          required: true,
        },
      ],
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Nagłówek',
      required: true,
      admin: {
        description:
          'Fragment w *gwiazdkach* zostanie wyróżniony różowym kolorem, np. „dla *dziecięcych ekip*". Gdy powyżej wypełniono „Zmieniające się słowa", ten tekst pojawi się zaraz po nich.',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Podtytuł',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Zdjęcie',
      admin: { description: 'Jeśli puste, użyjemy domyślnej grafiki z dziećmi.' },
    },
    {
      name: 'secondaryImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Drugie zdjęcie (maskotka)',
      admin: {
        description:
          'Opcjonalne. Nakłada się na główne zdjęcie (np. maskotka wystająca zza telefonu). Zostaw puste, żeby pokazać tylko jedno zdjęcie.',
      },
    },
    {
      name: 'showWaitlistForm',
      type: 'checkbox',
      label: 'Pokaż formularz zapisów',
      defaultValue: true,
    },
    {
      name: 'formHeading',
      type: 'text',
      label: 'Tekst nad formularzem',
      defaultValue: 'Zapisz się na listę oczekujących i otrzymaj wcześniejszy dostęp',
      admin: { condition: (_, sibling) => Boolean(sibling?.showWaitlistForm) },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Dopisek pod formularzem',
      admin: { condition: (_, sibling) => Boolean(sibling?.showWaitlistForm) },
    },
    {
      name: 'links',
      type: 'array',
      label: 'Przyciski',
      maxRows: 2,
      admin: { condition: (_, sibling) => !sibling?.showWaitlistForm },
      fields: [linkField({ appearances: ['primary', 'secondary', 'ghost'] })],
    },
  ],
}

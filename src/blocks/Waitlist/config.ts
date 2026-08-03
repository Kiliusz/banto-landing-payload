import type { Block } from 'payload'

export const WaitlistBlock: Block = {
  slug: 'waitlist',
  interfaceName: 'WaitlistBlock',
  labels: { singular: 'Zapisy na listę', plural: 'Zapisy na listę' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Nagłówek',
      required: true,
      defaultValue: 'Dołącz do listy oczekujących',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Podtytuł',
      defaultValue: 'Pierwsze 500 rodzin otrzyma wcześniejszy dostęp.',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Napis na przycisku',
      defaultValue: 'Zapisuję się',
    },
    {
      name: 'background',
      type: 'select',
      label: 'Tło',
      defaultValue: 'blue',
      options: [
        { label: 'Niebieskie', value: 'blue' },
        { label: 'Kremowe', value: 'cream' },
        { label: 'Białe', value: 'white' },
      ],
    },
  ],
}

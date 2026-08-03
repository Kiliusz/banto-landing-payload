import type { Field, GroupField } from 'payload'

export type LinkAppearance = 'primary' | 'secondary' | 'ghost' | 'inline'

type LinkOptions = {
  appearances?: LinkAppearance[] | false
  overrides?: Partial<GroupField>
}

const APPEARANCE_LABELS: Record<LinkAppearance, string> = {
  primary: 'Przycisk główny',
  secondary: 'Przycisk drugorzędny',
  ghost: 'Przycisk przezroczysty',
  inline: 'Zwykły link',
}

/**
 * Wspólne pole linku: wewnętrzny (relacja do strony/wpisu) albo zewnętrzny URL.
 * Używane w nawigacji, stopce i blokach CTA.
 */
export const linkField = ({ appearances, overrides = {} }: LinkOptions = {}): Field => {
  const base: GroupField = {
    name: 'link',
    type: 'group',
    label: 'Link',
    interfaceName: 'LinkField',
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            label: 'Rodzaj',
            defaultValue: 'reference',
            options: [
              { label: 'Strona w serwisie', value: 'reference' },
              { label: 'Adres zewnętrzny', value: 'custom' },
            ],
            admin: { layout: 'horizontal', width: '50%' },
          },
          {
            name: 'newTab',
            type: 'checkbox',
            label: 'Otwórz w nowej karcie',
            admin: { width: '50%', style: { alignSelf: 'flex-end' } },
          },
        ],
      },
      {
        name: 'reference',
        type: 'relationship',
        label: 'Dokument',
        relationTo: ['pages', 'posts'],
        maxDepth: 1,
        required: true,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'reference',
        },
      },
      {
        name: 'url',
        type: 'text',
        label: 'Adres URL',
        required: true,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'custom',
        },
      },
      {
        name: 'label',
        type: 'text',
        label: 'Etykieta',
        required: true,
      },
    ],
  }

  if (appearances !== false) {
    const allowed = appearances ?? (['primary', 'secondary', 'ghost', 'inline'] as LinkAppearance[])

    base.fields.push({
      name: 'appearance',
      type: 'select',
      label: 'Wygląd',
      defaultValue: allowed[0],
      options: allowed.map((value) => ({ label: APPEARANCE_LABELS[value], value })),
    })
  }

  return { ...base, ...overrides } as Field
}

import type { Block } from 'payload'

export const LatestPostsBlock: Block = {
  slug: 'latestPosts',
  interfaceName: 'LatestPostsBlock',
  labels: { singular: 'Najnowsze wpisy', plural: 'Najnowsze wpisy' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Nagłówek',
      defaultValue: 'Z bloga banto',
      required: true,
    },
    { name: 'subheading', type: 'textarea', label: 'Podtytuł' },
    {
      name: 'limit',
      type: 'number',
      label: 'Ile wpisów',
      defaultValue: 3,
      min: 1,
      max: 6,
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Ogranicz do kategorii',
      maxDepth: 1,
      admin: { position: 'sidebar' },
    },
    {
      name: 'showArchiveLink',
      type: 'checkbox',
      label: 'Pokaż link „Zobacz wszystkie"',
      defaultValue: true,
    },
  ],
}

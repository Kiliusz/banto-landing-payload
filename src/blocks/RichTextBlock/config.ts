import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const RichTextBlock: Block = {
  slug: 'richTextBlock',
  interfaceName: 'RichTextBlock',
  labels: { singular: 'Tekst', plural: 'Teksty' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      label: 'Treść',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'width',
      type: 'select',
      label: 'Szerokość',
      defaultValue: 'narrow',
      options: [
        { label: 'Wąska (czytelna kolumna)', value: 'narrow' },
        { label: 'Pełna', value: 'wide' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}

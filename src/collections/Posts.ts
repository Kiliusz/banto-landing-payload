import type { CollectionConfig } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated, authenticatedOrPublished } from '@/access'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { populateReadingTime } from '@/hooks/populateReadingTime'
import { revalidatePost, revalidatePostDelete } from '@/hooks/revalidate'
import { CalloutBlock } from '@/blocks/Callout/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { QuoteBlock } from '@/blocks/Quote/config'
import { getPreviewUrl } from '@/utilities/preview'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Wpis', plural: 'Wpisy' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    readVersions: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'categories', 'publishedAt', '_status'],
    group: 'Blog',
    livePreview: {
      url: ({ data }) => getPreviewUrl(`/blog/${data?.slug ?? ''}`),
    },
    preview: (data) => getPreviewUrl(`/blog/${data?.slug ?? ''}`),
  },
  defaultPopulate: {
    title: true,
    slug: true,
    excerpt: true,
    heroImage: true,
    publishedAt: true,
    categories: true,
  },
  hooks: {
    beforeChange: [populatePublishedAt, populateReadingTime],
    afterChange: [revalidatePost],
    afterDelete: [revalidatePostDelete],
  },
  versions: {
    drafts: {
      autosave: { interval: 375 },
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tytuł',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Treść',
          fields: [
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Zajawka',
              maxLength: 300,
              admin: {
                description:
                  'Kilka zdań widocznych na liście wpisów i w podglądzie linku w social mediach.',
              },
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Obrazek główny',
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Treść',
              required: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  BlocksFeature({ blocks: [MediaBlock, QuoteBlock, CalloutBlock] }),
                  HorizontalRuleFeature(),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
            },
          ],
        },
        {
          label: 'Powiązania',
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'posts',
              hasMany: true,
              label: 'Powiązane wpisy',
              // 2, a nie 1 — inaczej karty „Przeczytaj także" dostają kategorie
              // jako same ID i tracą kolorową plakietkę
              maxDepth: 2,
              filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Data publikacji',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime', displayFormat: 'd MMM yyyy, HH:mm' },
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Kategorie',
      admin: { position: 'sidebar' },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      label: 'Autorzy',
      admin: { position: 'sidebar' },
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Czas czytania (min)',
      admin: {
        position: 'sidebar',
        description: 'Zostaw puste — policzymy automatycznie z długości treści.',
      },
    },
    ...slugField('title'),
  ],
}

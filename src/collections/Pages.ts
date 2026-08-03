import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidatePage, revalidatePageDelete } from '@/hooks/revalidate'
import { getPreviewUrl } from '@/utilities/preview'

import { CtaBlock } from '@/blocks/Cta/config'
import { FaqBlock } from '@/blocks/Faq/config'
import { FeaturesBlock } from '@/blocks/Features/config'
import { HeroBlock } from '@/blocks/Hero/config'
import { LatestPostsBlock } from '@/blocks/LatestPosts/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { RichTextBlock } from '@/blocks/RichTextBlock/config'
import { StepsBlock } from '@/blocks/Steps/config'
import { WaitlistBlock } from '@/blocks/Waitlist/config'

const pagePath = (slug?: unknown) => (slug === 'home' ? '/' : `/${typeof slug === 'string' ? slug : ''}`)

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Strona', plural: 'Strony' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    readVersions: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt', '_status'],
    group: 'Treść',
    livePreview: {
      url: ({ data }) => getPreviewUrl(pagePath(data?.slug)),
    },
    preview: (data) => getPreviewUrl(pagePath(data?.slug)),
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidatePageDelete],
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
      name: 'layout',
      type: 'blocks',
      label: 'Sekcje strony',
      labels: { singular: 'Sekcja', plural: 'Sekcje' },
      minRows: 1,
      admin: {
        initCollapsed: true,
        description:
          'Układ strony budujesz z gotowych sekcji. Kolejność zmieniasz przeciągając bloki.',
      },
      blocks: [
        HeroBlock,
        WaitlistBlock,
        FeaturesBlock,
        StepsBlock,
        FaqBlock,
        CtaBlock,
        LatestPostsBlock,
        RichTextBlock,
        MediaBlock,
      ],
    },
    ...slugField('title'),
  ],
}

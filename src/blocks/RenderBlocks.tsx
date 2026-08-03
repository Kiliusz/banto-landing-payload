import React, { Fragment } from 'react'

import { CtaComponent } from '@/blocks/Cta/Component'
import { FaqComponent } from '@/blocks/Faq/Component'
import { FeaturesComponent } from '@/blocks/Features/Component'
import { HeroComponent } from '@/blocks/Hero/Component'
import { LatestPostsComponent } from '@/blocks/LatestPosts/Component'
import { MediaBlockComponent } from '@/blocks/MediaBlock/Component'
import { RichTextBlockComponent } from '@/blocks/RichTextBlock/Component'
import { StepsComponent } from '@/blocks/Steps/Component'
import { WaitlistComponent } from '@/blocks/Waitlist/Component'

/* eslint-disable @typescript-eslint/no-explicit-any */
const BLOCKS: Record<string, React.ComponentType<any>> = {
  hero: HeroComponent,
  waitlist: WaitlistComponent,
  features: FeaturesComponent,
  steps: StepsComponent,
  faq: FaqComponent,
  cta: CtaComponent,
  latestPosts: LatestPostsComponent,
  richTextBlock: RichTextBlockComponent,
  mediaBlock: MediaBlockComponent,
}

type BlockData = { blockType?: string | null; id?: string | null; [key: string]: any }

export const RenderBlocks = ({ blocks }: { blocks?: BlockData[] | null }) => {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Component = block?.blockType ? BLOCKS[block.blockType] : undefined
        if (!Component) return null

        return (
          <Fragment key={block.id ?? index}>
            <Component {...block} />
          </Fragment>
        )
      })}
    </>
  )
}
/* eslint-enable @typescript-eslint/no-explicit-any */

import React from 'react'

import { Media, type MediaDoc } from '@/components/Media'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeading } from '@/components/ui/Section'

export type StepsProps = {
  eyebrow?: string | null
  heading: string
  subheading?: string | null
  items?:
    | ({
        title: string
        description: string
        image?: MediaDoc | string | number | null
        id?: string | null
      } | null)[]
    | null
}

export const StepsComponent = ({ eyebrow, heading, items, subheading }: StepsProps) => (
  <Section background="cream">
    <Container>
      <SectionHeading eyebrow={eyebrow} heading={heading} subheading={subheading} />

      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items?.filter(Boolean).map((item, index) => (
          <li className="relative flex flex-col" key={item?.id ?? index}>
            {item?.image && (
              <Media
                className="mb-5 aspect-[4/3] w-full overflow-hidden rounded-banto-lg"
                resource={item.image}
                sizes="(max-width: 768px) 100vw, 380px"
              />
            )}

            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-pink font-display text-lg font-bold text-white">
              {index + 1}
            </span>

            <h3 className="font-display text-xl leading-snug">{item?.title}</h3>
            <p className="mt-2 leading-relaxed text-muted text-pretty">{item?.description}</p>
          </li>
        ))}
      </ol>
    </Container>
  </Section>
)

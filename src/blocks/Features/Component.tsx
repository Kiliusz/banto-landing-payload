import React from 'react'

import { Container } from '@/components/ui/Container'
import { Icon, type IconName } from '@/components/ui/Icons'
import { Section, SectionHeading } from '@/components/ui/Section'
import { cn } from '@/utilities/ui'

export type FeaturesProps = {
  eyebrow?: string | null
  heading: string
  subheading?: string | null
  columns?: ('2' | '3' | '4') | null
  background?: ('white' | 'cream') | null
  items?:
    | ({ icon?: string | null; title: string; description: string; id?: string | null } | null)[]
    | null
}

const GRID: Record<string, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

export const FeaturesComponent = ({
  background = 'white',
  columns = '3',
  eyebrow,
  heading,
  items,
  subheading,
}: FeaturesProps) => (
  <Section background={background ?? 'white'}>
    <Container>
      <SectionHeading eyebrow={eyebrow} heading={heading} subheading={subheading} />

      <ul className={cn('grid gap-6', GRID[columns ?? '3'])}>
        {items?.filter(Boolean).map((item, index) => (
          <li
            className={cn(
              'rounded-banto-lg p-7 transition-shadow',
              background === 'cream' ? 'bg-white' : 'bg-cream',
              'hover:shadow-banto',
            )}
            key={item?.id ?? index}
          >
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-banto bg-blue text-white">
              <Icon className="h-6 w-6" name={(item?.icon as IconName) ?? 'sparkles'} />
            </span>
            <h3 className="font-display text-xl leading-snug">{item?.title}</h3>
            <p className="mt-2 leading-relaxed text-muted text-pretty">{item?.description}</p>
          </li>
        ))}
      </ul>
    </Container>
  </Section>
)

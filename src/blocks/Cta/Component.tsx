import React from 'react'

import { CMSLink, type CMSLinkValue } from '@/components/CMSLink'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { cn } from '@/utilities/ui'

export type CtaProps = {
  heading: string
  subheading?: string | null
  background?: ('blue' | 'pink' | 'cream') | null
  links?: ({ link?: CMSLinkValue | null; id?: string | null } | null)[] | null
}

export const CtaComponent = ({ background = 'blue', heading, links, subheading }: CtaProps) => {
  const inverted = background === 'blue' || background === 'pink'

  return (
    <Section background={background ?? 'blue'}>
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-3xl leading-tight sm:text-4xl">{heading}</h2>
          {subheading && (
            <p
              className={cn(
                'max-w-xl text-lg leading-relaxed text-pretty',
                inverted ? 'text-white/85' : 'text-muted',
              )}
            >
              {subheading}
            </p>
          )}
          {links && links.length > 0 && (
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              {links.map((item, index) => (
                <CMSLink
                  key={item?.id ?? index}
                  link={item?.link}
                  size="lg"
                  variant={
                    inverted && (item?.link?.appearance ?? 'primary') === 'primary'
                      ? 'white'
                      : undefined
                  }
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}

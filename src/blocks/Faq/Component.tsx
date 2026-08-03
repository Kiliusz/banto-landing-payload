import React from 'react'

import { Container } from '@/components/ui/Container'
import { ChevronDown } from '@/components/ui/Icons'
import { Section, SectionHeading } from '@/components/ui/Section'

export type FaqProps = {
  eyebrow?: string | null
  heading: string
  addSchema?: boolean | null
  items?: ({ question: string; answer: string; id?: string | null } | null)[] | null
}

export const FaqComponent = ({ addSchema, eyebrow, heading, items }: FaqProps) => {
  const questions = items?.filter(Boolean) ?? []

  const schema = addSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: questions.map((item) => ({
          '@type': 'Question',
          name: item?.question,
          acceptedAnswer: { '@type': 'Answer', text: item?.answer },
        })),
      }
    : null

  return (
    <Section background="white">
      <Container size="narrow">
        <SectionHeading eyebrow={eyebrow} heading={heading} />

        <div className="divide-y divide-line border-y border-line">
          {questions.map((item, index) => (
            <details className="group py-5" key={item?.id ?? index}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold">
                {item?.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-blue transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 leading-relaxed text-muted text-pretty">{item?.answer}</p>
            </details>
          ))}
        </div>
      </Container>

      {schema && (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          type="application/ld+json"
        />
      )}
    </Section>
  )
}

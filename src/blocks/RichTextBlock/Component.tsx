import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import React from 'react'

import { RichText } from '@/components/RichText'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export type RichTextBlockProps = {
  content: SerializedEditorState
  width?: ('narrow' | 'wide') | null
}

export const RichTextBlockComponent = ({ content, width = 'narrow' }: RichTextBlockProps) => (
  <Section background="white" className="py-12 sm:py-16">
    <Container size={width === 'wide' ? 'default' : 'narrow'}>
      <RichText data={content} />
    </Container>
  </Section>
)

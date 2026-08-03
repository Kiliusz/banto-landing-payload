import React from 'react'

import { WaitlistForm } from '@/components/WaitlistForm'
import { Container } from '@/components/ui/Container'
import { Section, SectionHeading } from '@/components/ui/Section'
import { getPrivacyHref, getSiteSettings } from '@/utilities/getGlobals'

export type WaitlistProps = {
  heading: string
  subheading?: string | null
  buttonLabel?: string | null
  background?: ('blue' | 'cream' | 'white') | null
}

export const WaitlistComponent = async ({
  background = 'blue',
  buttonLabel,
  heading,
  subheading,
}: WaitlistProps) => {
  const settings = await getSiteSettings()
  const privacyHref = await getPrivacyHref()
  const inverted = background === 'blue'

  return (
    <Section background={background ?? 'blue'} id="zapisy">
      <Container size="narrow">
        <SectionHeading heading={heading} inverted={inverted} subheading={subheading} />
        <div className="flex justify-center">
          <WaitlistForm
            buttonLabel={buttonLabel}
            consentText={settings?.consentText ?? ''}
            inverted={inverted}
            privacyHref={privacyHref}
            source="sekcja-zapisy"
          />
        </div>
      </Container>
    </Section>
  )
}

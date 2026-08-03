import React from 'react'

import { CMSLink, type CMSLinkValue } from '@/components/CMSLink'
import { HighlightedHeading } from '@/components/HighlightedHeading'
import { Media, type MediaDoc } from '@/components/Media'
import { WaitlistForm } from '@/components/WaitlistForm'
import { Container } from '@/components/ui/Container'
import { getPrivacyHref, getSiteSettings } from '@/utilities/getGlobals'

export type HeroProps = {
  eyebrow?: string | null
  heading: string
  subheading?: string | null
  image?: MediaDoc | string | number | null
  showWaitlistForm?: boolean | null
  formHeading?: string | null
  caption?: string | null
  links?: ({ link?: CMSLinkValue | null; id?: string | null } | null)[] | null
}

/** Trzy limonkowe kropki z Figmy — czysta dekoracja. */
const Dots = () => (
  <span aria-hidden="true" className="pointer-events-none absolute -top-6 right-4 hidden lg:block">
    <span className="mr-2 inline-block h-5 w-5 rounded-full bg-lime align-top" />
    <span className="mr-2 inline-block h-4 w-4 translate-y-4 rounded-full bg-lime align-top" />
    <span className="inline-block h-4 w-4 rounded-full bg-lime align-top" />
  </span>
)

export const HeroComponent = async (props: HeroProps) => {
  const { caption, eyebrow, formHeading, heading, image, links, showWaitlistForm, subheading } =
    props

  const settings = showWaitlistForm ? await getSiteSettings() : null
  const privacyHref = showWaitlistForm ? await getPrivacyHref() : null

  return (
    <section className="relative overflow-hidden bg-cream pt-10 pb-16 sm:pt-16 sm:pb-24" id="hero">
      {/* squiggle z Figmy — subtelny akcent nad zdjęciem */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-4 left-[52%] hidden h-24 w-32 opacity-90 lg:block"
        style={{
          backgroundImage: 'url(/brand/squiggle.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      />

      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <div className="relative z-10">
            {eyebrow && (
              <p className="mb-4 inline-flex items-center rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-blue shadow-banto-sm">
                {eyebrow}
              </p>
            )}

            <h1 className="text-4xl leading-[1.06] sm:text-5xl lg:text-[3.4rem]">
              <HighlightedHeading text={heading} />
            </h1>

            {subheading && (
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft text-pretty">
                {subheading}
              </p>
            )}

            {showWaitlistForm ? (
              <div className="mt-8" id="zapisy">
                {formHeading && (
                  <p className="mb-4 max-w-md text-base leading-relaxed text-ink-soft">
                    {formHeading}
                  </p>
                )}
                <WaitlistForm
                  consentText={settings?.consentText ?? ''}
                  privacyHref={privacyHref}
                  source="hero"
                />
                {caption && <p className="mt-1 text-sm text-muted">{caption}</p>}
              </div>
            ) : (
              links &&
              links.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {links.map((item, index) => (
                    <CMSLink key={item?.id ?? index} link={item?.link} size="lg" />
                  ))}
                </div>
              )
            )}
          </div>

          <div className="relative">
            <Dots />
            <Media
              className="aspect-[4/3] w-full overflow-hidden rounded-banto-xl"
              fallbackAlt="Grupa uśmiechniętych dzieci siedzących razem"
              fallbackSrc="/brand/kids.png"
              priority
              resource={image}
              sizes="(max-width: 1024px) 100vw, 620px"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

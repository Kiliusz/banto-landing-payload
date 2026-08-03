import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/CMSLink'
import { Container } from '@/components/ui/Container'
import { getFooter } from '@/utilities/getGlobals'

const SOCIAL_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
}

export const SiteFooter = async () => {
  const footer = await getFooter()

  return (
    <footer className="border-t border-line bg-white pt-16 pb-10">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link aria-label="banto — strona główna" href="/">
              <Image alt="banto" className="h-8 w-auto" height={225} src="/brand/logo.svg" width={742} />
            </Link>
            {footer?.tagline && (
              <p className="mt-4 max-w-xs leading-relaxed text-muted text-pretty">
                {footer.tagline}
              </p>
            )}

            {footer?.social && footer.social.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-3">
                {footer.social.map((item, index) => (
                  <li key={item?.id ?? index}>
                    <a
                      className="inline-flex h-10 items-center rounded-banto bg-cream px-4 text-sm font-semibold text-ink hover:bg-blue-soft hover:text-blue"
                      href={item.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {SOCIAL_LABELS[item.platform] ?? item.platform}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {footer?.columns?.map((column, index) => (
            <div key={column?.id ?? index}>
              <p className="font-display text-base font-bold">{column?.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column?.links?.map((item, linkIndex) => (
                  <li key={item?.id ?? linkIndex}>
                    <CMSLink
                      className="text-muted no-underline hover:text-blue"
                      link={item?.link}
                      variant="inline"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center">
          <p>{footer?.legal}</p>
          <p>
            Zbudowane na{' '}
            <a
              className="underline underline-offset-2 hover:text-blue"
              href="https://payloadcms.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Payload CMS
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}

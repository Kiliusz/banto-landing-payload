import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { CMSLink, resolveLinkHref } from '@/components/CMSLink'
import { MobileNav } from '@/components/MobileNav'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { getHeader } from '@/utilities/getGlobals'

export const SiteHeader = async () => {
  const header = await getHeader()
  const navItems = header?.navItems ?? []
  const cta = header?.cta

  const mobileItems = navItems
    .map((item) => ({
      href: resolveLinkHref(item?.link),
      label: item?.link?.label ?? '',
    }))
    .filter((item): item is { href: string; label: string } => Boolean(item.href))

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/90 backdrop-blur-md">
      <Container>
        <div className="flex h-18 items-center justify-between gap-6 py-3">
          <Link aria-label="banto — strona główna" className="shrink-0" href="/">
            {/* wymiary = rzeczywiste viewBox pliku (742×225); rozmiar ustawia CSS */}
            <Image
              alt="banto"
              className="h-8 w-auto"
              height={225}
              loading="eager"
              preload
              src="/brand/logo.svg"
              width={742}
            />
          </Link>

          <nav aria-label="Menu główne" className="hidden items-center gap-7 md:flex">
            {navItems.map((item, index) => (
              <CMSLink
                className="text-base font-medium text-ink no-underline hover:text-blue"
                key={item?.id ?? index}
                link={item?.link}
                variant="inline"
              />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {cta?.enabled && cta.anchor && (
              <ButtonLink className="hidden sm:inline-flex" href={cta.anchor}>
                {cta.label}
              </ButtonLink>
            )}
            <MobileNav
              cta={cta?.enabled && cta.anchor ? { href: cta.anchor, label: cta.label ?? '' } : null}
              items={mobileItems}
            />
          </div>
        </div>
      </Container>
    </header>
  )
}

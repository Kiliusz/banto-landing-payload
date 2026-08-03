import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Script from 'next/script'
import React from 'react'

import { DraftBar } from '@/components/DraftBar'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import { getSiteSettings } from '@/utilities/getGlobals'
import { getServerURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

import { baloo, inter } from './fonts'
import './globals.css'

export const generateMetadata = async (): Promise<Metadata> => {
  const settings = await getSiteSettings()

  return {
    metadataBase: new URL(getServerURL()),
    title: {
      default: settings?.defaultTitle ?? 'banto',
      template: `%s | ${settings?.siteName ?? 'banto'}`,
    },
    description: settings?.defaultDescription ?? '',
    openGraph: {
      type: 'website',
      locale: 'pl_PL',
      siteName: settings?.siteName ?? 'banto',
    },
    twitter: { card: 'summary_large_image' },
    icons: { icon: '/favicon.svg' },
  }
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: draft } = await draftMode()
  const settings = await getSiteSettings()

  return (
    // suppressHydrationWarning: rozszerzenia przeglądarki (blokery, opt-outy analityki)
    // dopisują atrybuty do <html> przed hydratacją i React zgłaszałby fałszywy alarm
    <html className={cn(baloo.variable, inter.variable)} lang="pl" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        {draft && <DraftBar />}
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />

        {settings?.plausibleDomain && (
          <Script
            data-domain={settings.plausibleDomain}
            defer
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}

'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React from 'react'

/**
 * W trybie live preview panel Payloada wysyła postMessage po każdym zapisie —
 * ten komponent odświeża wtedy dane trasy bez pełnego przeładowania.
 * Poza iframe'em panelu nic nie robi.
 */
export const LivePreviewListener = () => {
  const router = useRouter()

  return (
    <RefreshRouteOnSave
      refresh={() => router.refresh()}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || ''}
    />
  )
}

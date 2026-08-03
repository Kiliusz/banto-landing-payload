import React from 'react'

/* eslint-disable @next/next/no-img-element */

/** Logo na ekranie logowania panelu. */
export const AdminLogo = () => (
  <img src="/brand/logo.svg" alt="banto" style={{ width: 180, height: 'auto' }} />
)

/** Znaczek w lewym górnym rogu panelu (logotyp jest szeroki, więc trzymamy proporcje). */
export const AdminIcon = () => (
  <img
    src="/brand/logo.svg"
    alt="banto"
    style={{ height: 20, width: 'auto', objectFit: 'contain' }}
  />
)

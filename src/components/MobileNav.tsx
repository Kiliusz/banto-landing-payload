'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Item = { href: string; label: string }

export const MobileNav = ({ cta, items }: { cta?: Item | null; items: Item[] }) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [lastPath, setLastPath] = useState(pathname)

  // Zmiana trasy zamyka menu — inaczej zostaje otwarte nad nową stroną.
  // Korekta stanu w trakcie renderu zamiast useEffect: React od razu przerysowuje
  // komponent, bez migotania otwartego menu na nowej stronie.
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (items.length === 0 && !cta) return null

  return (
    <div className="md:hidden">
      <button
        aria-expanded={open}
        aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
        className="flex h-11 w-11 items-center justify-center rounded-banto ring-2 ring-line"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <div className="fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto bg-white px-5 pt-6 pb-10">
          <nav aria-label="Menu mobilne" className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                className="rounded-banto px-4 py-4 font-display text-2xl font-bold hover:bg-cream"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {cta && (
            <Link
              className="mt-6 flex h-14 items-center justify-center rounded-banto bg-blue px-6 text-lg font-semibold text-white"
              href={cta.href}
            >
              {cta.label}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

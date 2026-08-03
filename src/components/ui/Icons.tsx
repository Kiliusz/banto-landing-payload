import React from 'react'

/**
 * Mały, ręczny zestaw ikon — bez dodatkowej paczki w bundlu.
 * Styl: zaokrąglone obrysy liniowe, tak jak w prototypie (lucide-like).
 */
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
}

export type IconName =
  | 'shield'
  | 'heart'
  | 'chat'
  | 'users'
  | 'sparkles'
  | 'compass'
  | 'lock'
  | 'smile'

const PATHS: Record<IconName, React.ReactNode> = {
  shield: <path d="M12 3 5 6v6c0 4.4 3 8.2 7 9 4-.8 7-4.6 7-9V6l-7-3Z" />,
  heart: <path d="M12 20s-7-4.4-7-9.3A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7 2.7c0 4.9-7 9.3-7 9.3Z" />,
  chat: <path d="M20 12a7 7 0 0 1-7 7H8l-4 3v-5.4A7 7 0 0 1 11 5h2a7 7 0 0 1 7 7Z" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8M17 20a6 6 0 0 0-1.7-4.2" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3 1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3Z" />
      <path d="M18 15.5 19 18l2.5 1-2.5 1-1 2.5-1-2.5L14.5 19l2.5-1 1-2.5Z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  lock: (
    <>
      <rect height="10" rx="2" width="14" x="5" y="11" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14.5a4.5 4.5 0 0 0 7 0M9 9.5h.01M15 9.5h.01" />
    </>
  ),
}

export const Icon = ({ className, name }: { className?: string; name: IconName }) => (
  <svg aria-hidden="true" className={className} {...base}>
    {PATHS[name] ?? PATHS.sparkles}
  </svg>
)

export const ArrowRight = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} {...base}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const SendIcon = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} {...base} strokeWidth={2.2}>
    <path d="M22 2 11 13" />
    <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
  </svg>
)

export const ChevronDown = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} {...base}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

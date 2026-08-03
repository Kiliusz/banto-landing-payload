import Link from 'next/link'
import React from 'react'

/** Pasek widoczny tylko w trybie podglądu wersji roboczej. */
export const DraftBar = () => (
  <div className="flex items-center justify-center gap-4 bg-pink px-4 py-2 text-sm font-semibold text-white">
    <span>Podgląd wersji roboczej — ta treść nie jest jeszcze opublikowana.</span>
    <Link className="underline underline-offset-2" href="/next/exit-preview">
      Wyjdź z podglądu
    </Link>
  </div>
)

import React from 'react'

import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

/** Widok „nic jeszcze nie ma" — pokazywany, gdy w CMS-ie brakuje strony `home`. */
export const EmptyHome = () => (
  <div className="bg-cream py-24">
    <Container size="narrow">
      <div className="rounded-banto-xl bg-white p-10 text-center shadow-banto">
        <h1 className="text-3xl">Landing czeka na treść</h1>
        <p className="mt-4 leading-relaxed text-muted">
          W CMS-ie nie ma jeszcze strony o slugu <code className="font-mono">home</code>. Uruchom{' '}
          <code className="rounded bg-cream px-2 py-1 font-mono text-sm">npm run seed</code>, żeby
          wgrać treści startowe, albo utwórz stronę ręcznie w panelu.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/admin">Otwórz panel</ButtonLink>
        </div>
      </div>
    </Container>
  </div>
)

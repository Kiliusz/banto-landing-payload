import React from 'react'

import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

/** Widok „nic jeszcze nie ma" — pokazywany, gdy w CMS-ie brakuje strony `home`. */
export const EmptyHome = () => (
  <div className="bg-cream py-24">
    <Container size="narrow">
      <div className="rounded-banto-xl bg-white p-10 text-center shadow-banto">
        <h1 className="text-3xl">Landing czeka na treść</h1>
        <p className="mt-4 leading-relaxed text-muted text-pretty">
          W CMS-ie nie ma jeszcze strony o slugu <code className="font-mono">home</code>. Zaloguj
          się w panelu i wgraj treści startowe albo złóż stronę z bloków ręcznie.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/admin">Otwórz panel</ButtonLink>
          <ButtonLink href="/next/seed" variant="ghost">
            Wgraj treści startowe
          </ButtonLink>
        </div>

        <p className="mt-6 text-sm text-muted-light">
          Lokalnie to samo zrobi <code className="font-mono">npm run seed</code>.
        </p>
      </div>
    </Container>
  </div>
)

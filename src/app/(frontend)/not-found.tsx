import React from 'react'

import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  return (
    <div className="bg-cream py-24">
      <Container size="narrow">
        <div className="rounded-banto-xl bg-white p-10 text-center shadow-banto">
          <p className="font-display text-6xl font-extrabold text-blue">404</p>
          <h1 className="mt-4 text-3xl">Nie ma tu nic do zobaczenia</h1>
          <p className="mt-3 leading-relaxed text-muted">
            Strona zmieniła adres albo nigdy nie istniała.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">Wróć na stronę główną</ButtonLink>
            <ButtonLink href="/blog" variant="ghost">
              Zajrzyj na bloga
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  )
}

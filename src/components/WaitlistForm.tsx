'use client'

import Link from 'next/link'
import React, { useActionState, useEffect, useRef } from 'react'

import { joinWaitlist, type WaitlistState } from '@/actions/joinWaitlist'
import { SendIcon } from '@/components/ui/Icons'
import { cn } from '@/utilities/ui'

const initialState: WaitlistState = { status: 'idle', message: '' }

/**
 * Wypełnia ukryte pole wartością parametru z adresu. Robimy to referencją
 * (zapis do DOM po zamontowaniu), a nie stanem — dzięki temu strona zostaje
 * statyczna, a hydratacja nie widzi różnicy między serwerem a klientem.
 */
const fillFromQuery = (input: HTMLInputElement | null) => {
  if (!input) return
  const param = input.dataset.param
  if (!param) return
  input.value = new URLSearchParams(window.location.search).get(param) ?? ''
}

type Props = {
  buttonLabel?: string | null
  className?: string
  consentText: string
  /** Ciemne tło (niebieska sekcja) → jaśniejsze warianty kolorów. */
  inverted?: boolean
  privacyHref?: string | null
  source?: string
}

export const WaitlistForm = ({
  buttonLabel = 'Dołącz do listy oczekujących',
  className,
  consentText,
  inverted = false,
  privacyHref,
  source = 'landing',
}: Props) => {
  const [state, formAction, pending] = useActionState(joinWaitlist, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset()
  }, [state.status])

  return (
    <div className={cn('w-full max-w-md', className)}>
      <form action={formAction} className="flex flex-col gap-3" noValidate ref={formRef}>
        <input name="source" type="hidden" value={source} readOnly />
        <input data-param="utm_source" name="utm_source" ref={fillFromQuery} type="hidden" />
        <input data-param="utm_medium" name="utm_medium" ref={fillFromQuery} type="hidden" />
        <input data-param="utm_campaign" name="utm_campaign" ref={fillFromQuery} type="hidden" />

        {/* Honeypot — niewidoczny dla ludzi i czytników ekranu, kuszący dla botów */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Nie wypełniaj tego pola</label>
          <input autoComplete="off" id="website" name="website" tabIndex={-1} type="text" />
        </div>

        <div className="flex items-stretch gap-0">
          <input
            aria-label="Adres e-mail"
            autoComplete="email"
            className={cn(
              'h-14 min-w-0 flex-1 rounded-l-banto border-2 border-r-0 px-5 text-base font-medium',
              'outline-none transition-colors placeholder:font-normal',
              inverted
                ? 'border-white/25 bg-white/10 text-white placeholder:text-white/60 focus:border-white'
                : 'border-line bg-white text-ink placeholder:text-muted-light focus:border-blue',
            )}
            inputMode="email"
            name="email"
            placeholder="Twój adres e-mail"
            required
            type="email"
          />
          <button
            className={cn(
              'flex h-14 shrink-0 items-center justify-center gap-2 rounded-r-banto px-5 font-semibold',
              'transition-[background-color,opacity] disabled:cursor-default disabled:opacity-60',
              inverted ? 'bg-white text-blue hover:bg-cream' : 'bg-blue text-white hover:bg-blue-dark',
            )}
            disabled={pending}
            type="submit"
          >
            <span className="hidden sm:inline">{pending ? 'Zapisuję…' : buttonLabel}</span>
            <SendIcon className="h-5 w-5 sm:hidden" />
          </button>
        </div>

        <label
          className={cn(
            'flex cursor-pointer items-start gap-3 text-xs leading-relaxed select-none',
            inverted ? 'text-white/80' : 'text-muted',
          )}
        >
          <input
            className="mt-0.5 h-5 w-5 shrink-0 accent-blue"
            name="consent"
            required
            type="checkbox"
          />
          <span>
            {consentText}{' '}
            {privacyHref && (
              <>
                Szczegóły w{' '}
                <Link
                  className={cn('underline underline-offset-2', inverted ? 'text-white' : 'text-blue')}
                  href={privacyHref}
                >
                  Polityce Prywatności
                </Link>
                .
              </>
            )}
          </span>
        </label>
      </form>

      <p
        aria-live="polite"
        className={cn(
          'mt-3 min-h-6 text-sm font-semibold',
          state.status === 'error' && (inverted ? 'text-lime' : 'text-pink'),
          state.status === 'success' && (inverted ? 'text-lime' : 'text-blue'),
        )}
        role="status"
      >
        {state.message}
      </p>
    </div>
  )
}

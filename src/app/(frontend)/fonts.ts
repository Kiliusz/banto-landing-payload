import { Baloo_2, Inter } from 'next/font/google'

/**
 * Te same kroje co w Figmie i w prototypie aplikacji.
 * next/font hostuje pliki lokalnie — zero zapytań do fonts.googleapis.com
 * w przeglądarce użytkownika (ważne przy RODO i przy Core Web Vitals).
 */
export const baloo = Baloo_2({
  subsets: ['latin-ext'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-baloo',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

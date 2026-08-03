import { NextResponse, type NextRequest } from 'next/server'

/**
 * Basic auth dla środowisk nieprodukcyjnych.
 *
 * Włącza się wyłącznie wtedy, gdy ustawiona jest zmienna `STAGE_BASIC_AUTH`
 * w formacie `login:hasło`. Bez niej middleware przepuszcza wszystko, więc
 * produkcja nie wymaga żadnej zmiany w kodzie — wystarczy nie ustawiać zmiennej.
 *
 * Świadomie nie robimy tego middlewarem Traefika: ta sama instancja Traefika
 * obsługuje inne serwisy, a tak konfiguracja jedzie razem z aplikacją w repo.
 *
 * Plik nazywa się `proxy.ts` — Next 16 wycofał konwencję `middleware.ts`.
 */

const CREDENTIALS = process.env.STAGE_BASIC_AUTH
/**
 * Tylko ASCII: wartości nagłówków HTTP to ByteString, więc „—" czy polskie znaki
 * wysypują odpowiedź błędem 500 zamiast pokazać okno logowania.
 */
const REALM = 'banto staging'

/** Porównanie o stałym czasie — nie zdradza, ile pierwszych znaków się zgadza. */
const safeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false

  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

const unauthorized = () =>
  new NextResponse('Wymagane uwierzytelnienie.\n', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      // środowisko testowe nie ma prawa trafić do wyszukiwarek
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })

export function proxy(request: NextRequest) {
  if (!CREDENTIALS) return NextResponse.next()

  const header = request.headers.get('authorization')

  if (header?.startsWith('Basic ')) {
    try {
      // atob() zwraca bajty jako znaki latin-1, a przeglądarka koduje
      // „login:hasło" w UTF-8. Bez tego kroku poprawne hasło z polskimi
      // znakami byłoby odrzucane.
      const bytes = Uint8Array.from(atob(header.slice(6)), (c) => c.charCodeAt(0))
      const decoded = new TextDecoder('utf-8').decode(bytes)

      if (safeEqual(decoded, CREDENTIALS)) {
        const response = NextResponse.next()
        response.headers.set('X-Robots-Tag', 'noindex, nofollow')
        return response
      }
    } catch {
      // niepoprawny base64 — traktujemy jak brak danych logowania
    }
  }

  return unauthorized()
}

export const config = {
  matcher: [
    /**
     * Wszystko poza zasobami, które muszą odpowiadać bez logowania:
     *
     * - `/health` — healthcheck kontenera (Docker nie wyśle nagłówka Authorization)
     * - `/api/media/file` — pliki wgrane w CMS-ie. Optymalizator obrazów Next-a
     *   pobiera je sam z siebie zwykłym HTTP, bez danych logowania; gdyby wpadał
     *   na 401, wszystkie zdjęcia byłyby zepsute. Kompromis: kto zna dokładną
     *   nazwę pliku, pobierze go bez hasła — strony, treść i panel zostają zamknięte.
     * - `/_next/static`, `/_next/image` — artefakty builda
     * - favicon
     */
    '/((?!health|api/media/file|_next/static|_next/image|favicon.svg).*)',
  ],
}

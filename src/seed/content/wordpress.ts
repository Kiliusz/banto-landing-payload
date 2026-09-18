/**
 * Treści z dawnego WordPressa (stage.banto.pl, wyłączony po włamaniu).
 * Źródło: `wp-export/` — patrz `INVENTORY.md`, `SECTIONS-SUMMARY.md` i
 * `pages/banto.json` w tamtym repo. Jedyna realna treść na starej stronie to
 * sekcja hero strony głównej; reszta stron istniała tylko jako puste tytuły
 * w menu.
 */

/** Dwa zdjęcia z hero strony głównej (oryginalne pliki, bez miniatur). */
export const WP_HERO_IMAGES = {
  primary: {
    filename: 'banto-hero-bezpieczna-aplikacja-dla-dzieci-pro.png',
    alt: 'banto - hero - bezpieczna aplikacja dla dzieci',
  },
  secondary: {
    filename: 'banto-app-mistrz.png',
    alt: 'banto - bezpieczna cyfrowa przestrzeń dla dziecięcych ekip',
  },
} as const

/** Treść sekcji hero strony głównej — 1:1 z `pages/banto.json`. */
export const WP_HERO_CONTENT = {
  rotatingWords: [
    { text: 'Bezpieczne miejsce' },
    { text: 'Cyfrowa twierdza' },
    { text: 'Spokojna przyszłość' },
  ],
  heading: 'dla dziecięcych ekip.',
  subheading: 'Baza do rozmów, zabaw i wspólnych przygód z osobami, które dobrze znasz.',
  primaryButtonLabel: 'Pobierz aplikację',
  secondaryButtonLabel: 'Zobacz jak działa',
} as const

/**
 * 8 stron, które w WordPressie istniały jako puste tytuły w menu (nigdy nie
 * zbudowano dla nich treści — patrz `SECTIONS-SUMMARY.md`). Migrujemy tylko
 * tytuł/slug/pozycję w nawigacji; strony dostają formularz zapisów jako
 * tymczasową treść, bez wymyślonych opisów marketingowych.
 */
export const WP_STUB_PAGES: { title: string; slug: string }[] = [
  { title: 'Dla Rodziców', slug: 'dla-rodzicow' },
  { title: 'Dla Dzieci', slug: 'dla-dzieci' },
  { title: 'Dla Szkół', slug: 'dla-szkol' },
  { title: 'Bezpieczeństwo', slug: 'bezpieczenstwo' },
  { title: 'Cennik', slug: 'cennik' },
  { title: 'O nas', slug: 'o-nas' },
  { title: 'Kontakt', slug: 'kontakt' },
  { title: 'Pobierz', slug: 'pobierz' },
]

/**
 * Kolejność menu "Main" z WordPressa (`wp_nav_menu`, theme location `top_nav`),
 * patrz `INVENTORY.md` §3. "Pobierz" był tam stylizowany jako wypełniony
 * przycisk — tutaj odpowiada mu `header.cta`, więc nie powtarzamy go w
 * `navItems`.
 */
export const WP_NAV_ORDER: string[] = [
  'bezpieczenstwo',
  'dla-rodzicow',
  'dla-dzieci',
  'dla-szkol',
  'cennik',
  'o-nas',
  'kontakt',
]

export const WP_CTA = { label: 'Pobierz', slug: 'pobierz' } as const

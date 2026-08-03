# banto — landing page + blog

Payload CMS 3.87 · Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · PostgreSQL 17.

Landing budowany z bloków w panelu + blog generowany statycznie (SSG/ISR).
Deploy: VPS z Dokploy, przez `docker-compose.dokploy.yml`.

---

## Start w 4 krokach

```bash
cp .env.example .env             # 1. uzupełnij PAYLOAD_SECRET, PREVIEW_SECRET, SEED_ADMIN_PASSWORD
docker compose up -d             # 2. Postgres na 127.0.0.1:5432
npm install                      # 3. zależności
npm run seed && npm run dev      # 4. treści startowe + serwer
```

Strona: <http://localhost:3000> · Panel: <http://localhost:3000/admin>

Sekrety wygenerujesz tak:

```bash
echo "PAYLOAD_SECRET=$(openssl rand -base64 32)"
echo "PREVIEW_SECRET=$(openssl rand -hex 16)"
```

---

## Skrypty

| Komenda | Co robi |
| --- | --- |
| `npm run dev` | serwer deweloperski (Turbopack) |
| `npm run devsafe` | to samo, ale z czystym `.next` |
| `npm run build` | import map + produkcyjny build Next-a |
| `npm run start` | uruchomienie builda (lokalnie; w Dockerze startuje `server.js`) |
| `npm run lint` | ESLint |
| `npm run generate:types` | odświeża `src/payload-types.ts` po zmianie kolekcji |
| `npx payload migrate:create <nazwa>` | nowa migracja bazy po zmianie schematu |
| `npm run seed` | treści startowe + konto administratora |
| `npm run db:up` / `npm run db:down` | Postgres w Dockerze |

Skrypty przyjmujące argumenty (`payload`, `migrate:create`) wygodniej odpalać przez
`npx payload <komenda>` — `npm run` wymagałby dodatkowego `--` przed argumentami.

---

## Struktura

```
src/
├── app/
│   ├── (frontend)/            strona publiczna
│   │   ├── [[...slug]]/       „/" i pozostałe strony z CMS-u
│   │   ├── blog/              lista, wpis, kategoria
│   │   ├── next/              preview / exit-preview
│   │   └── layout.tsx         nagłówek, stopka, fonty, metadane
│   ├── (payload)/             panel i REST API (pliki generowane przez Payload)
│   ├── robots.ts
│   └── sitemap.ts
├── blocks/                    sekcje landingu: config (Payload) + Component (React)
├── collections/               Pages, Posts, Categories, Media, Waitlist, Users
├── globals/                   Header, Footer, SiteSettings
├── components/                UI, formularz zapisów, RichText, karty wpisów
├── hooks/                     rewalidacja ISR, publishedAt, czas czytania
├── migrations/                migracje bazy (commitowane)
├── seed/                      treści startowe
└── payload.config.ts
```

---

## Jak działa treść

### Landing = bloki

Strona główna to dokument `pages` o slugu `home`. Układ składasz z sekcji:

`Hero` · `Zapisy na listę` · `Kafelki` · `Kroki` · `FAQ` · `Wezwanie do działania` ·
`Najnowsze wpisy` · `Tekst` · `Obrazek`

W nagłówku Hero fragment w `*gwiazdkach*` renderuje się na różowo —
np. `Tworzymy bezpieczną przestrzeń dla *dziecięcych ekip.*`

### Blog

Wpisy (`posts`) mają zajawkę, obrazek, kategorie, powiązane wpisy i treść w Lexicalu.
W treści dostępne są bloki `Obrazek`, `Cytat` i `Wyróżnienie`.
Czas czytania liczy się sam, jeśli zostawisz pole puste.

### Renderowanie

| Trasa | Tryb |
| --- | --- |
| `/`, `/<strona>` | SSG + ISR |
| `/blog/<wpis>` | SSG + ISR |
| `/blog/kategoria/<kategoria>` | SSG + ISR (odświeżenie także co 1 h) |
| `/blog` | SSR (jedno zapytanie, nowy wpis widać natychmiast) |
| `/sitemap.xml` | SSR |
| `/admin`, `/api/*` | dynamiczne |

**Rewalidacja.** Po każdej publikacji hooki `revalidatePage` / `revalidatePost`
czyszczą dokładnie te ścieżki, których zmiana dotyczy (`revalidatePath`).
Nie trzeba przebudowywać serwisu.

**Uwaga o skalowaniu:** cache ISR leży w systemie plików kontenera. Przy jednym
kontenerze (standard na Dokploy) działa bez zastrzeżeń. Przy kilku replikach
rewalidacja dotarłaby tylko do jednej z nich — wtedy trzeba wpiąć współdzielony
cache handler.

### Podgląd wersji roboczych

Strony i wpisy mają wersjonowanie z autozapisem. Przycisk podglądu w panelu
prowadzi do `/next/preview`, które sprawdza `PREVIEW_SECRET` **i** sesję
użytkownika Payloada, po czym włącza tryb draft. Live preview odświeża widok
po każdym zapisie.

---

## Zapisy na listę oczekujących

Formularz (`WaitlistForm`) wysyła dane przez server action `joinWaitlist`:

1. honeypot + walidacja e-maila i zgody,
2. limit 8 prób / 10 min na adres IP,
3. jeśli ustawiony `MAILERLITE_API_KEY` — dopisanie subskrybenta przez API MailerLite,
4. zapis do kolekcji `waitlist` razem z treścią zgody i parametrami UTM.

Bez klucza MailerLite wszystko działa — leady zostają wyłącznie w bazie
(panel → **Leady → Lista oczekujących**).

Publiczny zapis przez REST API jest zamknięty (`create: () => false`);
tworzy je wyłącznie server action.

---

## Zmiana schematu bazy

Lokalnie Payload dosypuje zmiany sam (`push` mode). Przed wdrożeniem wygeneruj migrację:

```bash
npm run generate:types
npx payload migrate:create nazwa-zmiany
git add src/migrations
```

Na produkcji migracje wykonują się **przy starcie kontenera** — decyduje o tym
`PAYLOAD_RUN_MIGRATIONS=true` ustawione w `Dockerfile`. Poza kontenerem
(`npm run build`, `npm run start`) migracje nie ruszają, bo lokalna baza jest utrzymywana
trybem `push` i Payload zapytałby o zgodę na potencjalną utratę danych,
zawieszając proces w oczekiwaniu na odpowiedź.

**Nie uruchamiaj `npm run dev` na bazie produkcyjnej** — tryb `push` oznaczyłby ją
jako „deweloperską" i kolejny start kontenera zawisłby na tym samym pytaniu.

---

## Deploy

Instrukcja dla Dokploy: [`DEPLOY.md`](./DEPLOY.md).

---

## Skąd wzięła się warstwa wizualna

- kolory, logo, zdjęcie i squiggle: `banto-landing` (projekt z Figmy),
- tokeny, zaokrąglenia i kroje (Baloo 2 + Inter): `banto-proto/src/styles/theme.css`,
- doodle: `banto-proto/public/Doodle`.

Fonty ładuje `next/font` — pliki są hostowane lokalnie, przeglądarka nie odpytuje
Google Fonts (istotne przy RODO i przy Core Web Vitals).

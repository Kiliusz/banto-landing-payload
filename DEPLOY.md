# Deploy na VPS z Dokploy

Aplikacja + Postgres w jednym stacku Compose, HTTPS z Let's Encrypt przez Traefika,
uploady i baza na wolumenach. Deploy leci **automatycznie po pushu do `main`**.

## Aktualne środowisko

| | |
| --- | --- |
| Dokploy | <https://alt.kbmprojekt.pl> → projekt **banto** → **landing-payload** |
| Repozytorium | `Kiliusz/banto-landing-payload`, gałąź `main` |
| Compose Path | `./docker-compose-stage.yml` |
| Trigger | **On Push** + **Autodeploy** włączone |
| Domena | `stage.banto.pl` |

---

## 1. Przygotowanie repozytorium

Repo musi zawierać `src/migrations/` (schemat bazy) i `package-lock.json`,
a **nie może** zawierać `.env`.

---

## 2. Usługa w Dokploy

1. **Create → Compose**
2. **Provider:** GitHub → repozytorium + gałąź `main`
3. **Compose Path:** `./docker-compose-stage.yml`
4. **Trigger Type:** `On Push`, przełącznik **Autodeploy** włączony
5. Zapisz.

---

## 3. Zmienne środowiskowe

Zakładka **Environment**:

```env
NODE_ENV=production
PORT=3000

NEXT_PUBLIC_SERVER_URL=https://stage.banto.pl
PAYLOAD_SECRET=<openssl rand -base64 32>
PREVIEW_SECRET=<openssl rand -hex 16>
POSTGRES_PASSWORD=<długie losowe hasło>

# opcjonalnie — bez tego leady zostają tylko w bazie
MAILERLITE_API_KEY=
MAILERLITE_GROUP_ID=
```

`NEXT_PUBLIC_SERVER_URL` jest wkompilowywane w bundle, więc trafia do obrazu
jako `build arg` — po zmianie domeny konieczny jest **pełny rebuild**, nie sam restart.

---

## 4. Domena

Zakładka **Domains → Add Domain**:

| Pole | Wartość |
| --- | --- |
| Host | `stage.banto.pl` |
| Service Name | `web` |
| Container Port | `3000` |
| HTTPS | włączone, certyfikat `letsencrypt` |

Dokploy sam dopisze etykiety Traefika. Rekord DNS musi wskazywać na IP serwera
**przed** deployem — inaczej Let's Encrypt nie wystawi certyfikatu.

Jeśli domena stoi za Cloudflare z włączonym proxy (pomarańczowa chmurka),
ustaw tryb SSL na **Full (strict)**. Przy „Flexible" Traefik dostanie ruch po HTTP
i wpadniecie w pętlę przekierowań.

---

## 5. Deploy

Po pushu do `main` Dokploy startuje sam. Ręcznie: przycisk **Deploy**.

1. build obrazu (bez dostępu do bazy — to zamierzone),
2. start Postgresa i czekanie na healthcheck,
3. start aplikacji → **migracje wykonują się automatycznie**,
4. `https://stage.banto.pl` odpowiada.

W logach powinno pojawić się:

```
Migrating: 20260802_204638_initial
Migrated:  20260802_204638_initial (75ms)
✓ Ready
```

---

## 6. Pierwsze logowanie i treści

1. Wejdź na `https://stage.banto.pl/admin` — zobaczysz formularz założenia pierwszego konta.
2. Załóż administratora.
3. Uzupełnij **Ustawienia serwisu**, **Nagłówek**, **Stopkę**.
4. Utwórz stronę o slugu `home` i złóż ją z bloków.

Jeśli wolisz gotowy komplet treści (ten sam, co lokalnie), zasiej bazę u siebie
i przenieś zrzut — obraz produkcyjny nie zawiera skryptu seed ani `tsx`:

```bash
# lokalnie
npm run seed
docker exec banto-postgres pg_dump -U banto -d banto --data-only --disable-triggers > seed.sql

# na VPS
docker compose exec -T postgres psql -U banto -d banto < seed.sql
```

---

## 7. Kopie zapasowe

Do zabezpieczenia są **dwie** rzeczy: baza i uploady.

```bash
# baza
docker compose exec -T postgres pg_dump -U banto -d banto | gzip > banto-$(date +%F).sql.gz

# uploady (wolumen `media`)
docker run --rm -v <projekt>_media:/media -v "$PWD":/backup alpine \
  tar czf /backup/banto-media-$(date +%F).tar.gz -C /media .
```

W Dokploy możesz też włączyć **Backups** dla usługi `postgres` (S3/R2) — wtedy
ręcznie zostaje tylko wolumen `media`.

---

## 8. Aktualizacje

`git push` do `main` → Dokploy sam buduje i wdraża. Migracje zaskoczą przy starcie kontenera.
Zmiany schematu zawsze commituj razem z migracją:

```bash
npx payload migrate:create nazwa-zmiany
```

---

## Rozwiązywanie problemów

**Domena nie odpowiada (502 / brak trasy).**
Usługa `web` musi być w sieci `dokploy-network`. Jest to zapisane w
`docker-compose-stage.yml`; jeśli sieć nie istnieje, utwórz ją:
`docker network create dokploy-network`.

**Zdjęcia się nie ładują po redeployu.**
Sprawdź, czy wolumen `media` jest podpięty pod `/app/media`. Bez niego uploady
znikają razem z kontenerem.

**Strona pokazuje starą treść.**
Rewalidacja odpala się po publikacji. Jeśli edytowałeś dokument bezpośrednio w bazie,
zapisz go raz w panelu albo zrestartuj kontener (cache ISR startuje pusty).

**Build nie przechodzi na etapie `npm ci`.**
`npm ci` wymaga, żeby `package-lock.json` zgadzał się z `package.json` — po każdej
zmianie zależności uruchom lokalnie `npm install` i commituj świeży lockfile.

**Kontener wstaje, ale nic nie odpowiada i logi milczą po `Ready`.**
Prawdopodobnie ktoś uruchomił `npm run dev` na bazie produkcyjnej — Payload oznaczył ją
wtedy jako utrzymywaną trybem `push` i przy starcie zadaje interaktywne pytanie
o zgodę na migracje, którego nikt nie widzi. Wejdź do kontenera i odpowiedz ręcznie
(`docker compose exec web sh`) albo odtwórz bazę z kopii.

**Chcesz prerenderować wszystkie strony w buildzie.**
Usuń `ENV SKIP_BUILD_STATIC_GENERATION=1` z `Dockerfile` i zapewnij buildowi
dostęp do bazy (`DATABASE_URL` jako build arg). Bez tego build się wywali —
domyślna konfiguracja świadomie tego nie wymaga.

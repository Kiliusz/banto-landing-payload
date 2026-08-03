# syntax=docker/dockerfile:1

# ──────────────────────────────────────────────────────────────────────────────
# banto landing — obraz produkcyjny
# Wymaga `output: 'standalone'` w next.config.ts (jest ustawione).
# Build: docker build -t banto-landing .
# ──────────────────────────────────────────────────────────────────────────────

FROM node:22.22.0-alpine AS base
# libc6-compat — sharp i inne natywne moduły na Alpine
RUN apk add --no-cache libc6-compat

# ─── Zależności ───────────────────────────────────────────────────────────────
FROM base AS deps
WORKDIR /app
# `npm ci` instaluje dokładnie to, co jest w package-lock.json — bez niego build padnie.
COPY package.json package-lock.json .npmrc ./
RUN npm ci

# ─── Build ────────────────────────────────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js osadza NEXT_PUBLIC_* w bundlu, więc URL musi być znany na tym etapie.
ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Payload potrzebuje sekretu do zbudowania configu; prawdziwy przychodzi w runtime.
ENV PAYLOAD_SECRET=build-time-placeholder

# W czasie budowania obrazu nie ma jeszcze Postgresa, więc nie prerenderujemy stron
# z CMS-u. Wypełnią cache ISR przy pierwszym wejściu i będą punktowo odświeżane
# hookami po publikacji. Jeśli budujesz z dostępem do bazy — usuń tę linię,
# a wszystkie strony i wpisy powstaną już w buildzie.
ENV SKIP_BUILD_STATIC_GENERATION=1

RUN npm run build

# ─── Runtime ──────────────────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
# Migracje bazy wykonują się przy starcie kontenera (prodMigrations w payload.config.ts)
ENV PAYLOAD_RUN_MIGRATIONS=true

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Katalog na uploady z panelu — montowany jako wolumen (patrz docker-compose)
RUN mkdir -p /app/media && chown -R nextjs:nodejs /app/media

# Cache prerenderu (ISR) musi być zapisywalny dla użytkownika aplikacji
RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# /health jest wyłączone spod basic autha, więc działa też na stage.
# Port bierzemy ze zmiennej, żeby healthcheck nie rozjechał się z ENV PORT.
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

# Migracje bazy odpalają się same przy starcie (prodMigrations w payload.config.ts)
CMD ["node", "server.js"]

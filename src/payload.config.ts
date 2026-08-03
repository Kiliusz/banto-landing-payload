import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateDescription, GenerateTitle } from '@payloadcms/plugin-seo/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import { pl } from '@payloadcms/translations/languages/pl'
import sharp from 'sharp'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Waitlist } from './collections/Waitlist'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { SiteSettings } from './globals/SiteSettings'
import { migrations } from './migrations'
import { getServerURL } from './utilities/getURL'

const dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Migracje przy starcie odpalamy wyłącznie tam, gdzie tego chcemy — czyli
 * w kontenerze produkcyjnym (zmienna ustawiona w Dockerfile).
 *
 * Dlaczego nie po samym NODE_ENV? Bo `next build` i `next start` też działają
 * z NODE_ENV=production. Na bazie deweloperskiej (tworzonej trybem `push`)
 * Payload zapytałby wtedy interaktywnie „migracje spowodują utratę danych,
 * kontynuować?" i zawiesił proces w oczekiwaniu na wpisanie odpowiedzi.
 */
const runMigrationsOnBoot = process.env.PAYLOAD_RUN_MIGRATIONS === 'true'

type SeoDoc = { title?: string; excerpt?: string | null }

const generateTitle: GenerateTitle<SeoDoc> = ({ doc }) =>
  doc?.title ? `${doc.title} | banto` : 'banto'

const generateDescription: GenerateDescription<SeoDoc> = ({ doc }) => doc?.excerpt || ''

export default buildConfig({
  serverURL: getServerURL(),

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— banto',
    },
    components: {
      graphics: {
        Logo: '@/components/admin/Logo#AdminLogo',
        Icon: '@/components/admin/Logo#AdminIcon',
      },
    },
    livePreview: {
      breakpoints: [
        { label: 'Telefon', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 834, height: 1112 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },

  collections: [Pages, Posts, Categories, Media, Waitlist, Users],
  globals: [Header, Footer, SiteSettings],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // Lokalnie Payload sam dosypuje zmiany schematu (push mode).
    push: process.env.NODE_ENV !== 'production',
    migrationDir: path.resolve(dirname, 'migrations'),
    // Na produkcji migracje odpalają się przy starcie kontenera — nie trzeba
    // wchodzić na VPS ani mieć dostępu do bazy w czasie builda obrazu.
    prodMigrations: runMigrationsOnBoot ? migrations : undefined,
  }),

  secret: process.env.PAYLOAD_SECRET || '',

  // Panel po polsku
  i18n: {
    supportedLanguages: { pl },
    fallbackLanguage: 'pl',
  },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  sharp,

  plugins: [
    seoPlugin({
      collections: ['pages', 'posts'],
      uploadsCollection: 'media',
      generateTitle,
      generateDescription,
      generateURL: ({ doc, collectionSlug }) => {
        const slug = (doc as { slug?: string })?.slug ?? ''
        const prefix = collectionSlug === 'posts' ? '/blog/' : '/'
        return `${getServerURL()}${slug === 'home' ? '' : `${prefix}${slug}`}` || getServerURL()
      },
      tabbedUI: true,
    }),
  ],

  // Payload dokleja te nagłówki do odpowiedzi API — zostawiamy tylko własną domenę.
  cors: [getServerURL()],
  csrf: [getServerURL()],

  graphQL: {
    disable: true,
  },
})

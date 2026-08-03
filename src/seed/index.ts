/* eslint-disable @typescript-eslint/no-explicit-any */
import path from 'path'
import { fileURLToPath } from 'url'
import type { Payload } from 'payload'

import { privacyPolicyContent } from './content/privacy'
import { HERO_MEDIA, seedPosts } from './content/posts'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(dirname, '../../public')

const CATEGORIES = [
  {
    title: 'Bezpieczeństwo',
    slug: 'bezpieczenstwo',
    color: 'blue',
    description: 'Ustawienia, zasady i rozmowy, które realnie chronią dziecko w sieci.',
  },
  {
    title: 'Relacje',
    slug: 'relacje',
    color: 'pink',
    description: 'Przyjaźnie, grupy klasowe i to, co dzieje się między dziećmi.',
  },
  {
    title: 'Emocje',
    slug: 'emocje',
    color: 'lime',
    description: 'Jak dzieci 8–12 lat przeżywają to, co spotyka je online.',
  },
]

/** Wszystkie operacje seedu wyłączają rewalidację — nie ma jeszcze cache'u do odświeżenia. */
const ctx = { context: { disableRevalidate: true } }

export const seed = async ({
  payload,
  adminEmail,
  adminPassword,
}: {
  payload: Payload
  adminEmail: string
  adminPassword: string
}) => {
  payload.logger.info('— Seed: administrator')

  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
    where: { email: { equals: adminEmail } },
  })

  const admin =
    existingUsers.docs[0] ??
    (await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: adminPassword,
        name: 'Administrator banto',
        role: 'admin',
      },
      ...ctx,
    }))

  payload.logger.info('— Seed: media')

  const heroImage = await upsertMedia(payload, {
    filePath: path.resolve(publicDir, 'brand/kids.png'),
    alt: 'Grupa uśmiechniętych dzieci siedzących razem',
  })

  payload.logger.info('— Seed: kategorie')

  const categories: Record<string, any> = {}
  for (const category of CATEGORIES) {
    categories[category.slug] = await upsert(payload, 'categories', category.slug, {
      ...category,
    })
  }

  payload.logger.info('— Seed: wpisy')

  const posts: any[] = []
  for (const [index, post] of seedPosts.entries()) {
    const created = await upsert(payload, 'posts', post.slug, {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: withMediaIds(post.content, heroImage?.id),
      heroImage: heroImage?.id,
      categories: [categories[post.categorySlug]?.id].filter(Boolean),
      authors: [admin.id],
      // rozsuwamy daty, żeby sortowanie po publishedAt miało sens
      publishedAt: new Date(Date.now() - index * 86400000 * 7).toISOString(),
      _status: 'published',
    })
    posts.push(created)
  }

  // powiązania między wpisami ustawiamy dopiero, gdy wszystkie istnieją
  for (const [index, post] of posts.entries()) {
    await payload.update({
      collection: 'posts',
      id: post.id,
      data: {
        // trzy sąsiednie wpisy — dokładnie tyle, ile mieści rząd kart „Przeczytaj także"
        relatedPosts: posts
          .filter((_, i) => i !== index)
          .slice(0, 3)
          .map((p) => p.id),
      },
      ...ctx,
    })
  }

  payload.logger.info('— Seed: strony')

  const privacy = await upsert(payload, 'pages', 'polityka-prywatnosci', {
    title: 'Polityka Prywatności',
    slug: 'polityka-prywatnosci',
    _status: 'published',
    layout: [
      {
        blockType: 'richTextBlock',
        content: privacyPolicyContent,
        width: 'narrow',
      },
    ],
  })

  await upsert(payload, 'pages', 'home', {
    title: 'Strona główna',
    slug: 'home',
    _status: 'published',
    layout: [
      {
        blockType: 'hero',
        eyebrow: 'Premiera już wkrótce',
        heading: 'Tworzymy bezpieczną przestrzeń dla *dziecięcych ekip.*',
        subheading: 'Dla dzieci 8–12 lat i ich rodziców. Premiera już wkrótce.',
        image: heroImage?.id,
        showWaitlistForm: true,
        formHeading: 'Zapisz się na listę oczekujących i otrzymaj wcześniejszy dostęp.',
        caption: 'Pierwsze 500 rodzin otrzyma wcześniejszy dostęp.',
      },
      {
        blockType: 'features',
        eyebrow: 'Dlaczego banto',
        heading: 'Komunikator zaprojektowany dla dzieci, nie skrócony z dorosłego',
        subheading:
          'Zaczęliśmy od pytania „co musi być prawdą, żeby rodzic spał spokojnie" — i od tego zbudowaliśmy resztę.',
        columns: '3',
        background: 'white',
        items: [
          {
            icon: 'shield',
            title: 'Kontakt tylko za obopólną zgodą',
            description:
              'Nikt nie napisze do dziecka bez potwierdzenia po obu stronach. Nieznajomi nie mają jak zacząć rozmowy.',
          },
          {
            icon: 'users',
            title: 'Małe ekipy zamiast tłumu',
            description:
              'Grupy budujemy wokół realnych relacji — klasy, podwórka, drużyny. Łatwiej o bezpieczne miejsce dla pięciorga niż dla pięciuset.',
          },
          {
            icon: 'heart',
            title: 'Rodzic widzi to, co ważne',
            description:
              'Bez czytania każdej wiadomości. Dostajesz sygnał, gdy dzieje się coś, co wymaga dorosłego.',
          },
          {
            icon: 'chat',
            title: 'Pomoc w trudnej rozmowie',
            description:
              'Dziecko dostaje podpowiedź, jak odpowiedzieć, kiedy nie wie, co napisać — zamiast zostawać z tym samo.',
          },
          {
            icon: 'lock',
            title: 'Dane w Europie',
            description:
              'Bez profilowania reklamowego i bez sprzedaży danych. Model zarabiania nie opiera się na uwadze dziecka.',
          },
          {
            icon: 'smile',
            title: 'Bez nieskończonego scrolla',
            description:
              'Żadnego feedu, który wciąga na godziny. banto ma się skończyć, kiedy rozmowa się kończy.',
          },
        ],
      },
      {
        blockType: 'steps',
        eyebrow: 'Jak to działa',
        heading: 'Trzy kroki do pierwszej ekipy',
        items: [
          {
            title: 'Rodzic zakłada konto',
            description:
              'Ty tworzysz profil i decydujesz, kto może dołączyć do ekipy dziecka. Zajmuje kilka minut.',
          },
          {
            title: 'Dziecko robi swojego awatara',
            description:
              'Bez zdjęć i bez danych osobowych. Wybiera fryzurę, minę i kolor — i już jest sobą.',
          },
          {
            title: 'Ekipa rusza',
            description:
              'Zapraszacie znajomych z klasy albo podwórka. Rozmowy, wyzwania i wspólne przygody zostają w grupie.',
          },
        ],
      },
      {
        blockType: 'latestPosts',
        heading: 'Z bloga banto',
        subheading: 'Praktyczne teksty dla rodziców dzieci w wieku 8–12 lat.',
        limit: 3,
        showArchiveLink: true,
      },
      {
        blockType: 'faq',
        eyebrow: 'FAQ',
        heading: 'Najczęstsze pytania',
        addSchema: true,
        items: [
          {
            question: 'Dla jakiego wieku jest banto?',
            answer:
              'Projektujemy dla dzieci w wieku 8–12 lat. To moment, w którym pojawia się pierwszy telefon i pierwsza potrzeba kontaktu z rówieśnikami poza szkołą.',
          },
          {
            question: 'Czy rodzic czyta wiadomości dziecka?',
            answer:
              'Nie. Zakładamy, że dziecko ma prawo do prywatnej rozmowy z kolegą. Rodzic dostaje sygnał wtedy, gdy dzieje się coś, co wymaga reakcji dorosłego.',
          },
          {
            question: 'Kiedy premiera?',
            answer:
              'Pracujemy nad wersją dla pierwszych rodzin. Zapisz się na listę oczekujących — poinformujemy Cię, zanim otworzymy dostęp publicznie.',
          },
          {
            question: 'Ile to będzie kosztować?',
            answer:
              'Model rozliczenia ogłosimy przed premierą. Wiemy na pewno, że nie będzie się opierał na reklamach kierowanych do dzieci.',
          },
          {
            question: 'Co się dzieje z moim adresem e-mail?',
            answer:
              'Używamy go wyłącznie do informacji o premierze i rozwoju banto. Możesz wypisać się jednym kliknięciem — szczegóły w Polityce Prywatności.',
          },
        ],
      },
      {
        blockType: 'waitlist',
        heading: 'Chcesz być wśród pierwszych rodzin?',
        subheading: 'Zapisz się na listę oczekujących. Bez spamu — piszemy tylko wtedy, gdy mamy coś konkretnego.',
        buttonLabel: 'Zapisuję się',
        background: 'blue',
      },
    ],
  })

  payload.logger.info('— Seed: nagłówek, stopka, ustawienia')

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        { link: { type: 'custom', url: '/#hero', label: 'O banto' } },
        { link: { type: 'reference', reference: { relationTo: 'pages', value: privacy.id }, label: 'Prywatność' } },
        { link: { type: 'custom', url: '/blog', label: 'Blog' } },
      ],
      cta: { enabled: true, label: 'Dołącz do listy', anchor: '#zapisy' },
    },
    ...ctx,
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      tagline: 'Bezpieczna przestrzeń dla dziecięcych ekip. Dla dzieci 8–12 lat i ich rodziców.',
      columns: [
        {
          title: 'Serwis',
          links: [
            { link: { type: 'custom', url: '/', label: 'Strona główna' } },
            { link: { type: 'custom', url: '/blog', label: 'Blog' } },
          ],
        },
        {
          title: 'Informacje',
          links: [
            {
              link: {
                type: 'reference',
                reference: { relationTo: 'pages', value: privacy.id },
                label: 'Polityka Prywatności',
              },
            },
            { link: { type: 'custom', url: 'mailto:kontakt@banto.pl', label: 'kontakt@banto.pl' } },
          ],
        },
      ],
      legal: '© banto · Agnieszka Zielonka LetsDoIT',
    },
    ...ctx,
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'banto',
      defaultTitle: 'banto — bezpieczna przestrzeń dla dziecięcych ekip',
      defaultDescription:
        'banto tworzy bezpieczną przestrzeń dla dziecięcych ekip. Dla dzieci 8–12 lat i ich rodziców. Premiera już wkrótce — dołącz do listy oczekujących.',
      defaultOgImage: heroImage?.id,
      consentText:
        'Zgadzam się na otrzymywanie od banto informacji o premierze i treści marketingowych na podany e-mail.',
      privacyPolicy: privacy.id,
      successMessage: 'Dziękujemy! Jesteś na liście oczekujących. 🎉',
    },
    ...ctx,
  })

  payload.logger.info('✔ Seed zakończony')
}

/**
 * Podmienia znacznik `HERO_MEDIA` w treści wpisu na prawdziwe ID pliku.
 * Pliki z treścią są statyczne, więc identyfikatory z bazy poznajemy dopiero tutaj.
 */
const withMediaIds = (content: unknown, mediaId?: number | string) => {
  if (!mediaId) return content
  return JSON.parse(JSON.stringify(content).replaceAll(`"${HERO_MEDIA}"`, JSON.stringify(mediaId)))
}

/** Tworzy dokument albo nadpisuje istniejący o tym samym slugu — seed jest idempotentny. */
const upsert = async (payload: Payload, collection: any, slug: string, data: any) => {
  const existing = await payload.find({
    collection,
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
    ...ctx,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data,
      ...ctx,
    })
  }

  return payload.create({ collection, data, ...ctx })
}

const upsertMedia = async (
  payload: Payload,
  { alt, filePath }: { alt: string; filePath: string },
) => {
  const filename = path.basename(filePath)

  const existing = await payload.find({
    collection: 'media',
    limit: 1,
    pagination: false,
    where: { filename: { like: filename.replace(/\.[^.]+$/, '') } },
  })

  if (existing.docs[0]) return existing.docs[0]

  return payload.create({
    collection: 'media',
    data: { alt },
    filePath,
    ...ctx,
  })
}

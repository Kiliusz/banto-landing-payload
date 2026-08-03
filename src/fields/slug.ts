import type { CheckboxField, FieldHook, TextField } from 'payload'

/** Polskie znaki → ASCII, żeby slug nie miał „ł" ani „ż". */
const PL_MAP: Record<string, string> = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
}

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .normalize('NFC')
    .replace(/[ąćęłńóśźż]/g, (c) => PL_MAP[c] ?? c)
    // reszta znaków diakrytycznych: rozbij na literę + znak łączący i usuń ten drugi
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const formatSlugHook =
  (fallbackField: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string' && value.length > 0) {
      return slugify(value)
    }

    // Autouzupełnianie tylko przy tworzeniu albo gdy pole jest puste —
    // później zmiana tytułu nie psuje istniejącego (zaindeksowanego) URL-a.
    if (operation === 'create' || !data?.slug) {
      const fallback = data?.[fallbackField]
      if (typeof fallback === 'string' && fallback.length > 0) {
        return slugify(fallback)
      }
    }

    return value
  }

type SlugFieldResult = [TextField, CheckboxField]

/**
 * Pole `slug` generowane z `fallbackField` + checkbox „edytuj ręcznie".
 * Zwraca parę pól, którą rozpakowujemy w konfiguracji kolekcji.
 */
export const slugField = (fallbackField = 'title'): SlugFieldResult => {
  const checkbox: CheckboxField = {
    name: 'slugLock',
    type: 'checkbox',
    defaultValue: true,
    admin: {
      hidden: true,
      position: 'sidebar',
    },
  }

  const slug: TextField = {
    name: 'slug',
    type: 'text',
    index: true,
    label: 'Slug (adres URL)',
    required: true,
    admin: {
      position: 'sidebar',
      description: 'Fragment adresu strony. Generowany z tytułu, ale możesz go nadpisać.',
    },
    hooks: {
      beforeValidate: [formatSlugHook(fallbackField)],
    },
  }

  return [slug, checkbox]
}

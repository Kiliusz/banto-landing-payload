/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Minimalne fabryki węzłów Lexicala. Payload zapisuje treść jako JSON
 * w formacie Lexicala; przy seedowaniu łatwiej zbudować go ręcznie
 * niż przepuszczać HTML przez konwerter.
 */

const textNode = (text: string, format = 0) => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

/** `[etykieta](/adres)` → węzeł linku Payloada (LinkFeature, `linkType: 'custom'`). */
const linkNode = (label: string, url: string) => ({
  type: 'link',
  format: '',
  indent: 0,
  version: 3,
  direction: 'ltr' as const,
  fields: { linkType: 'custom' as const, url, newTab: false },
  children: [textNode(label)],
})

/**
 * `**pogrubienie**` → węzeł tekstowy z formatem bold,
 * `[etykieta](/adres)` → węzeł linku. Pozostały tekst zostaje zwykłym tekstem.
 */
const inline = (text: string) =>
  text
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith('**') && part.endsWith('**')) return textNode(part.slice(2, -2), 1)
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
      if (link) return linkNode(link[1]!, link[2]!)
      return textNode(part)
    })

export const p = (text: string) => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  textFormat: 0,
  textStyle: '',
  children: inline(text),
})

export const h = (tag: 'h2' | 'h3' | 'h4', text: string) => ({
  type: 'heading',
  tag,
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: [textNode(text)],
})

export const ul = (items: string[]) => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: items.map((item, index) => ({
    type: 'listitem',
    value: index + 1,
    checked: undefined,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: inline(item),
  })),
})

export const block = (fields: Record<string, any>) => ({
  type: 'block',
  format: '',
  version: 2,
  fields,
})

export const root = (children: any[]) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children,
  },
})

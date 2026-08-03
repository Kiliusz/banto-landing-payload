type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
  root?: LexicalNode
  [key: string]: unknown
}

/**
 * Spłaszcza drzewo Lexicala do zwykłego tekstu.
 * Używane do liczenia czasu czytania i do fallbackowego opisu meta.
 */
export const lexicalToPlainText = (data: unknown): string => {
  if (!data || typeof data !== 'object') return ''

  const walk = (node: LexicalNode | undefined): string => {
    if (!node) return ''
    if (typeof node.text === 'string') return node.text
    if (Array.isArray(node.children)) {
      return node.children.map(walk).join(' ')
    }
    return ''
  }

  const root = (data as LexicalNode).root
  return walk(root ?? (data as LexicalNode))
    .replace(/\s+/g, ' ')
    .trim()
}

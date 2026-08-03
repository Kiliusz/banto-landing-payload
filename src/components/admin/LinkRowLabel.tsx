'use client'

import { useRowLabel } from '@payloadcms/ui'

type Row = {
  link?: {
    label?: string
  }
}

/** Podpis wiersza w tablicach linków — inaczej admin pokazuje „Pozycja 01". */
export const LinkRowLabel = () => {
  const { data, rowNumber } = useRowLabel<Row>()
  const index = `${(rowNumber ?? 0) + 1}`.padStart(2, '0')

  return <span>{data?.link?.label ? `${index} — ${data.link.label}` : `Pozycja ${index}`}</span>
}

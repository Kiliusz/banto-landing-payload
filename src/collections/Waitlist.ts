import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access'

/**
 * Zapisy na listę oczekujących. Wpisy tworzy wyłącznie server action
 * (`joinWaitlist`) z `overrideAccess: true` — publiczny REST API do zapisu
 * jest zamknięty, żeby nie dało się spamować kolekcji z zewnątrz.
 */
export const Waitlist: CollectionConfig = {
  slug: 'waitlist',
  labels: { singular: 'Zapis', plural: 'Lista oczekujących' },
  access: {
    create: () => false,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'mailerliteStatus', 'createdAt'],
    group: 'Leady',
    description: 'Adresy zebrane formularzem na landingu.',
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'E-mail',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'consent',
      type: 'checkbox',
      label: 'Zgoda marketingowa',
      required: true,
      defaultValue: false,
    },
    {
      name: 'consentText',
      type: 'textarea',
      label: 'Treść zgody',
      admin: {
        readOnly: true,
        description: 'Zapisujemy dokładne brzmienie zgody z momentu zapisu (dowód RODO).',
      },
    },
    {
      name: 'source',
      type: 'text',
      label: 'Źródło',
      defaultValue: 'landing',
      admin: { position: 'sidebar' },
    },
    {
      name: 'utm',
      type: 'group',
      label: 'UTM',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'source', type: 'text', label: 'utm_source' },
        { name: 'medium', type: 'text', label: 'utm_medium' },
        { name: 'campaign', type: 'text', label: 'utm_campaign' },
      ],
    },
    {
      name: 'mailerliteStatus',
      type: 'select',
      label: 'MailerLite',
      defaultValue: 'skipped',
      options: [
        { label: 'Wysłane', value: 'sent' },
        { label: 'Błąd', value: 'error' },
        { label: 'Pominięte (brak klucza)', value: 'skipped' },
      ],
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'mailerliteError',
      type: 'textarea',
      label: 'Błąd MailerLite',
      admin: {
        readOnly: true,
        condition: (data) => data?.mailerliteStatus === 'error',
      },
    },
  ],
  timestamps: true,
}

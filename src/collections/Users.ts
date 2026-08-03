import type { CollectionConfig } from 'payload'

import { admins, adminsField, authenticated } from '@/access'

/** `access.admin` musi zwrócić boolean — nie przyjmuje zapytania Where. */
const canEnterAdmin = ({ req }: { req: { user?: unknown } }) => Boolean(req.user)

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Użytkownik', plural: 'Użytkownicy' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
    group: 'Ustawienia',
  },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7, // 7 dni
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  access: {
    admin: canEnterAdmin,
    create: admins,
    delete: admins,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Imię i nazwisko',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rola',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Redaktor', value: 'editor' },
      ],
      access: {
        // roli nie zmienia sobie sam redaktor
        create: adminsField,
        update: adminsField,
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}

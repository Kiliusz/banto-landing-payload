import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

import { seed } from './index'

/**
 * Uruchomienie: npm run seed
 * Wymaga działającej bazy (docker compose up -d postgres) i pliku .env.
 */
const run = async () => {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@banto.pl'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD

  if (!adminPassword) {
    console.error(
      'Brakuje SEED_ADMIN_PASSWORD w .env — ustaw hasło administratora przed uruchomieniem seeda.',
    )
    process.exit(1)
  }

  const payload = await getPayload({ config })

  try {
    await seed({ payload, adminEmail, adminPassword })
    console.log(`\nPanel: /admin — login ${adminEmail}`)
    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

void run()

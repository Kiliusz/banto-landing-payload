import type { MetadataRoute } from 'next'

import { getServerURL } from '@/utilities/getURL'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/next'],
      },
    ],
    sitemap: `${getServerURL()}/sitemap.xml`,
  }
}

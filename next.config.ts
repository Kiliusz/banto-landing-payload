import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  // standalone = mały obraz produkcyjny (server.js + tylko potrzebne node_modules)
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    // Pliki z kolekcji Media serwuje Payload spod /api/media/file/*, a komponent
    // <Media> zamienia absolutny URL na ścieżkę względną — dzięki temu optymalizator
    // obrazów działa lokalnie i nie próbuje pobierać zasobu „z sieci" od samego siebie.
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/brand/**' }],
    formats: ['image/webp'],
  },

  turbopack: {
    root: path.resolve(dirname),
  },

  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })

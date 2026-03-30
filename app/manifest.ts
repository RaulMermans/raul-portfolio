import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/metadata'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.defaultTitle,
    short_name: siteConfig.name,
    description: siteConfig.defaultDescription,
    start_url: '/',
    display: 'browser',
    background_color: '#f5f1e8',
    theme_color: '#111111',
    icons: [
      {
        src: '/favicon.jpg',
        type: 'image/jpeg',
      },
    ],
  }
}

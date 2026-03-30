import { MetadataRoute } from 'next'
import { absoluteUrl, siteConfig } from '@/lib/metadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    host: siteConfig.url,
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}

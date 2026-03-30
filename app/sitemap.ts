import { MetadataRoute } from 'next'
import { apps } from '@/data/apps'
import { absoluteUrl } from '@/lib/metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteUrl('/about'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/case-studies'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteUrl('/apps'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.88,
    },
    {
      url: absoluteUrl('/photography'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: absoluteUrl('/visuals'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: absoluteUrl('/case-studies/ai-sports'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/case-studies/remoria'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const appRoutes: MetadataRoute.Sitemap = apps.map((app) => ({
    url: absoluteUrl(app.href),
    lastModified,
    changeFrequency: 'monthly',
    priority: app.slug === 'overflow' ? 0.82 : 0.72,
  }))

  return [...staticRoutes, ...appRoutes]
}

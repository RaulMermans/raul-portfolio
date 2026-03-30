import { MetadataRoute } from 'next'
import { apps } from '@/data/apps'
import { absoluteRouteUrl } from '@/lib/metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteRouteUrl('/'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteRouteUrl('/about'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteRouteUrl('/case-studies'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteRouteUrl('/apps'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.88,
    },
    {
      url: absoluteRouteUrl('/photography'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: absoluteRouteUrl('/visuals'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: absoluteRouteUrl('/case-studies/ai-sports'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteRouteUrl('/case-studies/remoria'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const appRoutes: MetadataRoute.Sitemap = apps.map((app) => ({
    url: absoluteRouteUrl(app.href),
    lastModified,
    changeFrequency: 'monthly',
    priority: app.slug === 'overflow' ? 0.82 : 0.72,
  }))

  return [...staticRoutes, ...appRoutes]
}

import { MetadataRoute } from 'next'
import { getApps } from '@/data/apps'
import { serviceLandings } from '@/data/service-landings'
import { locales, localizePath } from '@/lib/i18n'
import { absoluteRouteUrl } from '@/lib/metadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const localizedDefinitions = [
    { path: '/', changeFrequency: 'monthly', priority: 1 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/case-studies', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/apps', changeFrequency: 'monthly', priority: 0.88 },
    { path: '/overflow/support', changeFrequency: 'monthly', priority: 0.54 },
    { path: '/overflow/privacy', changeFrequency: 'monthly', priority: 0.46 },
    { path: '/overflow/terms', changeFrequency: 'monthly', priority: 0.44 },
    { path: '/photography', changeFrequency: 'weekly', priority: 0.75 },
    { path: '/visuals', changeFrequency: 'weekly', priority: 0.75 },
    { path: '/case-studies/data-brief-ai', changeFrequency: 'monthly', priority: 0.82 },
    { path: '/case-studies/website-auditor', changeFrequency: 'monthly', priority: 0.82 },
    { path: '/case-studies/benchmark-dashboard', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/case-studies/ai-sports', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/case-studies/remoria', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/case-studies/ai-systems-agents', changeFrequency: 'monthly', priority: 0.78 },
    { path: '/case-studies/data-systems', changeFrequency: 'monthly', priority: 0.78 },
    { path: '/case-studies/brand-systems', changeFrequency: 'monthly', priority: 0.78 },
  ] as const

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    localizedDefinitions.map((route) => ({
      url: absoluteRouteUrl(localizePath(route.path, locale)),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: locale === 'es' ? route.priority : Math.max(route.priority - 0.05, 0.1),
    }))
  )

  const appRoutes: MetadataRoute.Sitemap = [...getApps('en'), ...getApps('es')].map((app) => ({
    url: absoluteRouteUrl(app.href),
    lastModified,
    changeFrequency: 'monthly',
    priority: app.slug === 'overflow' ? 0.82 : 0.72,
  }))

  const serviceRoutes: MetadataRoute.Sitemap = serviceLandings.map((service) => ({
    url: absoluteRouteUrl(service.href),
    lastModified,
    changeFrequency: 'monthly',
    priority: service.locale === 'es' ? 0.88 : 0.84,
  }))

  return [...staticRoutes, ...serviceRoutes, ...appRoutes]
}

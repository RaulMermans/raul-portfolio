import type { Metadata } from 'next'
import { type Locale, defaultLocale, localizePath } from '@/lib/i18n'

export interface SeoImage {
  url: string
  alt: string
}

interface BuildPageMetadataOptions {
  title?: string
  description?: string
  path?: string
  canonicalPath?: string | null
  locale?: Locale
  image?: SeoImage
  type?: 'website' | 'article' | 'profile'
  keywords?: string[]
  noIndex?: boolean
  absoluteTitle?: boolean
}

export const siteConfig = {
  name: 'Raúl Mermans',
  siteName: 'Raúl Mermans',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.raulmermans.com',
  locale: 'en_US',
  twitterHandle: '@raulmermans',
  defaultTitle: 'Raúl Mermans — AI Systems Builder for Modern Brands',
  defaultDescription:
    'Applied AI systems builder for modern brands, designing agents, automation, and creative infrastructure across marketing, CRM, content, and execution.',
  defaultImage: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Raúl Mermans portfolio — AI systems, case studies, and creative execution',
  },
} as const

export const defaultKeywords = [
  'Raúl Mermans',
  'AI systems builder',
  'AI systems for brands',
  'agentic workflows',
  'automation infrastructure',
  'marketing automation',
  'CRM automation',
  'creative infrastructure',
  'AI tools',
  'product prototypes',
]

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString()
}

export function normalizeRoutePath(path = '/') {
  if (!path || path === '/') {
    return '/'
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return normalizedPath.endsWith('/') ? normalizedPath : `${normalizedPath}/`
}

export function absoluteRouteUrl(path = '/') {
  return absoluteUrl(normalizeRoutePath(path))
}

export function resolveSeoTitle(title?: string) {
  return title ? `${title} — ${siteConfig.name}` : siteConfig.defaultTitle
}

export function localeToOpenGraphLocale(locale: Locale) {
  return locale === 'es' ? 'es_ES' : 'en_US'
}

export function buildPageMetadata({
  title,
  description = siteConfig.defaultDescription,
  path = '/',
  canonicalPath = path,
  locale = defaultLocale,
  image = siteConfig.defaultImage,
  type = 'website',
  keywords = [],
  noIndex = false,
  absoluteTitle = false,
}: BuildPageMetadataOptions): Metadata {
  const fullTitle = resolveSeoTitle(title)
  const imageUrl = absoluteUrl(image.url)
  const localizedPath = localizePath(path, locale)
  const routeUrl = absoluteRouteUrl(localizedPath)
  const canonicalUrl =
    canonicalPath === null ? undefined : absoluteRouteUrl(localizePath(canonicalPath, locale))
  const languageAlternates =
    canonicalPath === null
      ? undefined
      : {
          'en-US': absoluteRouteUrl(localizePath(canonicalPath, 'en')),
          'es-ES': absoluteRouteUrl(localizePath(canonicalPath, 'es')),
        }

  return {
    title: absoluteTitle ? { absolute: fullTitle } : title ?? siteConfig.defaultTitle,
    description,
    keywords: Array.from(new Set([...defaultKeywords, ...keywords])),
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
          languages: languageAlternates,
        }
      : undefined,
    openGraph: {
      type,
      locale: localeToOpenGraphLocale(locale),
      url: routeUrl,
      title: fullTitle,
      description,
      siteName: siteConfig.siteName,
      images: [
        {
          url: imageUrl,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: siteConfig.twitterHandle,
      images: [imageUrl],
    },
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

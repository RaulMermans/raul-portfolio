import type { Metadata } from 'next'
import { type Locale, defaultLocale, localizePath } from '@/lib/i18n'

export interface SeoImage {
  url: string
  alt: string
  width?: number
  height?: number
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
  locale: 'es_ES',
  twitterHandle: '@raulmermans',
  defaultTitle: 'Raúl Mermans — AI Integrations for Creative Systems and Brand Workflows',
  defaultDescription:
    'Applied AI systems, automation layers, internal tools, and brand intelligence systems for creative teams, brand builders, and culture-led projects.',
  defaultImage: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Portfolio de Raúl Mermans — sistemas de IA, casos de estudio y ejecución creativa',
  },
} as const

export const defaultKeywords = [
  'Raúl Mermans',
  'arquitecto de sistemas de IA',
  'AI systems builder',
  'sistemas de IA para marcas',
  'AI systems for brands',
  'flujos de trabajo basados en agentes',
  'agentic workflows',
  'infraestructura creativa',
  'creative infrastructure',
  'herramientas de IA',
  'AI tools',
  'prototipos de producto',
  'product prototypes',
  'creative AI systems',
  'sistemas creativos con IA',
  'AI integrations for brands',
  'integraciones IA para marcas',
  'brand intelligence systems',
  'sistemas de inteligencia de marca',
  'creative automation',
  'automatización creativa',
  'AI campaign systems',
  'sistemas de campaña con IA',
  'visual workflow systems',
  'sistemas de flujo visual',
  'internal creative tools',
  'herramientas creativas internas',
  'AI tools for creative teams',
  'generative visual systems',
  'sistemas visuales generativos',
  'brand workflows',
  'flujos de marca',
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
          width: image.width ?? 1200,
          height: image.height ?? 630,
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

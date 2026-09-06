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
  defaultTitle: 'Raúl Mermans | Brand strategy, creative systems, and products',
  defaultDescription:
    'Raúl Mermans builds brands, products, and creative systems where business, culture, research, and technology meet.',
  defaultImage: {
    url: '/images/sections/case-studies-bg.webp',
    alt: 'Portfolio de Raúl Mermans: estrategia creativa, proyectos y tecnología',
  },
} as const

export const defaultKeywords = [
  'Raúl Mermans',
  'entrepreneur',
  'creator',
  'brand building',
  'product development',
  'ventures',
  'storytelling',
  'Raúl Mermans Madrid',
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
  return title ? `${title} | ${siteConfig.name}` : siteConfig.defaultTitle
}

export function localeToOpenGraphLocale(locale: Locale) {
  return locale === 'es' ? 'es_ES' : 'en_US'
}

const rootMetadataByLocale = {
  es: {
    title: 'Raúl Mermans | Estrategia de marca, sistemas creativos y producto',
    description:
      'Raúl Mermans construye marcas, productos y sistemas creativos entre negocio, cultura, investigación y tecnología.',
  },
  en: {
    title: 'Raúl Mermans | Brand strategy, creative systems, and products',
    description:
      'Raúl Mermans builds brands, products, and creative systems where business, culture, research, and technology meet.',
  },
} satisfies Record<Locale, { title: string; description: string }>

export function buildRootMetadata(locale: Locale): Metadata {
  const copy = rootMetadataByLocale[locale]
  const base = buildPageMetadata({
    title: copy.title,
    description: copy.description,
    path: '/',
    locale,
    image: siteConfig.defaultImage,
    absoluteTitle: true,
  })

  return {
    ...base,
    title: {
      default: copy.title,
      template: `%s | ${siteConfig.name}`,
    },
    icons: {
      icon: '/favicon.jpg',
      shortcut: '/favicon.jpg',
      apple: '/favicon.jpg',
    },
    manifest: '/manifest.webmanifest',
    category: 'business',
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
  }
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
  const fullTitle = absoluteTitle && title ? title : resolveSeoTitle(title)
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
  const defaultAlternate =
    canonicalPath === null ? undefined : absoluteRouteUrl(localizePath(canonicalPath, defaultLocale))

  return {
    title: absoluteTitle ? { absolute: fullTitle } : title ?? siteConfig.defaultTitle,
    description,
    keywords: Array.from(new Set([...defaultKeywords, ...keywords])),
    alternates: canonicalUrl && languageAlternates && defaultAlternate
      ? {
          canonical: canonicalUrl,
          languages: {
            ...languageAlternates,
            'x-default': defaultAlternate,
          },
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

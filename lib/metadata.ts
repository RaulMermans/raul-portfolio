import type { Metadata } from 'next'

export interface SeoImage {
  url: string
  alt: string
}

interface BuildPageMetadataOptions {
  title?: string
  description?: string
  path?: string
  image?: SeoImage
  type?: 'website' | 'article' | 'profile'
  keywords?: string[]
  noIndex?: boolean
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

export function resolveSeoTitle(title?: string) {
  return title ? `${title} — ${siteConfig.name}` : siteConfig.defaultTitle
}

export function buildPageMetadata({
  title,
  description = siteConfig.defaultDescription,
  path = '/',
  image = siteConfig.defaultImage,
  type = 'website',
  keywords = [],
  noIndex = false,
}: BuildPageMetadataOptions): Metadata {
  const fullTitle = resolveSeoTitle(title)
  const imageUrl = absoluteUrl(image.url)

  return {
    title: title ?? siteConfig.defaultTitle,
    description,
    keywords: Array.from(new Set([...defaultKeywords, ...keywords])),
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: absoluteUrl(path),
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

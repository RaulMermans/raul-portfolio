import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Suspense } from 'react'
import '../styles/globals.css'
import '../styles/design-system.css'
import PageTransition from '@/components/PageTransition'
import StructuredData from '@/components/StructuredData'
import { absoluteRouteUrl, absoluteUrl, defaultKeywords, siteConfig } from '@/lib/metadata'
import LocaleDocument from '@/components/LocaleDocument'
import '@/lib/env-validation'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const rootTitle = 'Raúl Mermans — Sistemas de IA para Equipos de Marca y Creatividad'
const rootDescription =
  'Diseño y construyo sistemas de IA para equipos de marca y creatividad: estrategia de flujos, diseño de interfaz, herramientas internas y prototipos funcionales.'

const bebasNeue = localFont({
  src: './fonts/bebas-neue-400.woff2',
  variable: '--font-display',
  display: 'swap',
})

const dmSans = localFont({
  src: [
    {
      path: './fonts/dm-sans-normal-400-500.woff2',
      style: 'normal',
      weight: '400 500',
    },
    {
      path: './fonts/dm-sans-italic-400-500.woff2',
      style: 'italic',
      weight: '400 500',
    },
  ],
  variable: '--font-body',
  display: 'swap',
})

const spaceMono = localFont({
  src: './fonts/space-mono-400.woff2',
  variable: '--font-mono',
  display: 'swap',
})

const sourceSerif4 = localFont({
  src: './fonts/source-serif-4-400-600.woff2',
  variable: '--font-reading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: rootTitle,
    template: `%s — ${siteConfig.name}`,
  },
  description: rootDescription,
  icons: {
    icon: '/favicon.jpg',
    shortcut: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  manifest: '/manifest.webmanifest',
  category: 'technology',
  keywords: defaultKeywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: absoluteRouteUrl('/'),
    languages: {
      'es-ES': absoluteRouteUrl('/'),
      'en-US': absoluteRouteUrl('/en'),
    },
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: absoluteRouteUrl('/'),
    title: rootTitle,
    description: rootDescription,
    siteName: siteConfig.siteName,
    images: [
      {
        url: absoluteUrl(siteConfig.defaultImage.url),
        alt: siteConfig.defaultImage.alt,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: rootTitle,
    description: rootDescription,
    creator: siteConfig.twitterHandle,
    images: [absoluteUrl(siteConfig.defaultImage.url)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable} ${sourceSerif4.variable}`}>
        <LocaleDocument />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <div className="grain" aria-hidden="true"></div>
        <StructuredData type="Person" />
        <StructuredData type="WebSite" />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}

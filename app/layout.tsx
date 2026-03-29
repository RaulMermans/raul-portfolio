import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Suspense } from 'react'
import '../styles/globals.css'
import PageTransition from '@/components/PageTransition'
import StructuredData from '@/components/StructuredData'
// Critical bots - loaded immediately (error handling, security, env validation)
import '@/lib/error-bot'
import '@/lib/security-bot'
import '@/lib/env-validation'

// Non-critical bots - lazy loaded on client after page load
// This improves initial bundle size and Time to Interactive
import '@/lib/lazy-bots'
import GoogleAnalytics from '@/components/GoogleAnalytics'

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

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: {
    default: 'Raúl Mermans — AI Systems Builder for Modern Brands',
    template: '%s | Raúl Mermans',
  },
  description:
    'Applied AI systems builder designing agents, automation, and creative infrastructure for modern brands across marketing, CRM, content, and execution.',
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  keywords: ['AI systems builder', 'agentic workflows', 'automation infrastructure', 'marketing automation', 'CRM automation', 'creative infrastructure', 'AI tools for brands', 'workflow design', 'content operations', 'applied AI'],
  authors: [{ name: 'Raúl Mermans', url: baseUrl }],
  creator: 'Raúl Mermans',
  publisher: 'Raúl Mermans',
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: 'Raúl Mermans — AI Systems Builder for Modern Brands',
    description:
      'Applied AI systems builder designing agents, automation, and creative infrastructure for modern brands across marketing, CRM, content, and execution.',
    siteName: 'Raúl Mermans',
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Raúl Mermans — AI Systems Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raúl Mermans — AI Systems Builder for Modern Brands',
    description:
      'Applied AI systems builder designing agents, automation, and creative infrastructure for modern brands across marketing, CRM, content, and execution.',
    creator: '@raulmeermans',
    images: [`${baseUrl}/images/og-image.jpg`],
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
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
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
    <html lang="en">
      <body className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable} ${sourceSerif4.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <div className="grain" aria-hidden="true"></div>
        <StructuredData type="Person" />
        <StructuredData type="WebSite" />
        <StructuredData type="Service" />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}

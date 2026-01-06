import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans, Space_Mono } from 'next/font/google'
import { Suspense } from 'react'
import '../styles/globals.css'
import PageTransition from '@/components/PageTransition'
import StructuredData from '@/components/StructuredData'
import '@/lib/performance-bot' // Initialize performance bot
import '@/lib/cache-bot' // Initialize cache bot
import '@/lib/error-bot' // Initialize error bot
import '@/lib/optimization-bot' // Initialize optimization bot
import '@/lib/seo-bot' // Initialize SEO bot
import '@/lib/image-optimization-bot' // Initialize image optimization bot
import '@/lib/accessibility-bot' // Initialize accessibility bot
import '@/lib/analytics-bot' // Initialize analytics bot
import '@/lib/security-bot' // Initialize security bot
import '@/lib/cleanup-bot' // Initialize cleanup bot
import '@/lib/animation-expert' // Initialize animation expert bot
import '@/lib/mobile-optimizer' // Initialize mobile optimizer bot
import '@/lib/departments' // Initialize department managers (coordinates all bots)
import GoogleAnalytics from '@/components/GoogleAnalytics'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-body',
})

const spaceMono = Space_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: {
    default: 'Raúl Mermans — Visual Storyteller',
    template: '%s | Raúl Mermans',
  },
  description: 'Visual Storyteller — Photography, Brand Identity, AI-Powered Creatives. Based in Spain.',
  keywords: ['photography', 'brand identity', 'AI creatives', 'visual storytelling', 'Spain', 'creative director', 'photographer', 'AI art'],
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
    title: 'Raúl Mermans — Visual Storyteller',
    description: 'Visual Storyteller — Photography, Brand Identity, AI-Powered Creatives. Based in Spain.',
    siteName: 'Raúl Mermans Portfolio',
    images: [
      {
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Raúl Mermans — Visual Storyteller',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raúl Mermans — Visual Storyteller',
    description: 'Visual Storyteller — Photography, Brand Identity, AI-Powered Creatives. Based in Spain.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        {/* Preload critical images for faster initial load */}
        <link rel="preload" as="image" href="/images/sections/case-studies-bg.webp" />
        <link rel="preload" as="image" href="/images/sections/photography-bg.webp" />
      </head>
      <body className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable}`}>
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


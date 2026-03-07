import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans, Space_Mono } from 'next/font/google'
import { Suspense } from 'react'
import '../styles/globals.css'
import PageTransition from '@/components/PageTransition'
import ScrollProgress from '@/components/ScrollProgress'
import StructuredData from '@/components/StructuredData'
import dynamic from 'next/dynamic'
// Critical bots - loaded immediately (error handling, security, env validation)
import '@/lib/error-bot'
import '@/lib/security-bot'
import '@/lib/env-validation'

const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), {
  ssr: false
})
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false
})

// Non-critical bots - lazy loaded on client after page load
// This improves initial bundle size and Time to Interactive
import '@/lib/lazy-bots'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const spaceMono = Space_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'

export const metadata: Metadata = {
  title: {
    default: 'Raúl Mermans — Visual Storyteller & Creative Director in Spain',
    template: '%s | Raúl Mermans',
  },
  description: 'Visual Storyteller & Creative Director based in Spain. Specializing in Photography, Brand Identity, AI-Powered Creatives, and Digital Systems. Transform your brand with strategic creative direction.',
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  keywords: ['photography Spain', 'brand identity', 'AI creatives', 'visual storytelling', 'creative director Spain', 'photographer Spain', 'AI art', 'brand photography', 'creative direction', 'digital systems'],
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
    title: 'Raúl Mermans — Visual Storyteller & Creative Director in Spain',
    description: 'Visual Storyteller & Creative Director based in Spain. Specializing in Photography, Brand Identity, AI-Powered Creatives, and Digital Systems.',
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
    title: 'Raúl Mermans — Visual Storyteller & Creative Director in Spain',
    description: 'Visual Storyteller & Creative Director based in Spain. Photography, Brand Identity, AI-Powered Creatives, and Digital Systems.',
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
        {/* Preload hints removed - using Next.js Image priority prop instead for better optimization */}
      </head>
      <body className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <div className="grain" aria-hidden="true"></div>
        <ScrollProgress />
        <StructuredData type="Person" />
        <StructuredData type="WebSite" />
        <StructuredData type="Service" />
        <CustomCursor />
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  )
}


import localFont from 'next/font/local'
import { Suspense } from 'react'
import PageTransition from '@/components/PageTransition'
import StructuredData from '@/components/StructuredData'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import SkipLink from '@/components/SkipLink'
import type { Locale } from '@/lib/i18n'

const bebasNeue = localFont({
  src: '../app/fonts/bebas-neue-400.woff2',
  variable: '--font-display',
  display: 'swap',
})

const dmSans = localFont({
  src: [
    {
      path: '../app/fonts/dm-sans-normal-400-500.woff2',
      style: 'normal',
      weight: '400 500',
    },
    {
      path: '../app/fonts/dm-sans-italic-400-500.woff2',
      style: 'italic',
      weight: '400 500',
    },
  ],
  variable: '--font-body',
  display: 'swap',
})

const spaceMono = localFont({
  src: '../app/fonts/space-mono-400.woff2',
  variable: '--font-mono',
  display: 'swap',
})

const sourceSerif4 = localFont({
  src: '../app/fonts/source-serif-4-400-600.woff2',
  variable: '--font-reading',
  display: 'swap',
})

export default function SiteDocument({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  return (
    <html
      lang={locale}
      className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable} ${sourceSerif4.variable}`}
    >
      <body>
        <SkipLink locale={locale} />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <div className="grain" aria-hidden="true" />
        <StructuredData type="SiteGraph" data={{ inLanguage: locale === 'es' ? 'es-ES' : 'en-US' }} />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}

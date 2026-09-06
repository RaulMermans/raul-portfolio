'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const ANALYTICS_ENABLED = process.env.NODE_ENV === 'production' && Boolean(GA_MEASUREMENT_ID)

export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [libraryLoaded, setLibraryLoaded] = useState(false)
  const search = searchParams?.toString() ?? ''

  useEffect(() => {
    if (!ANALYTICS_ENABLED || !GA_MEASUREMENT_ID || !libraryLoaded) return

    const pagePath = pathname + (search ? `?${search}` : '')
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag

    gtag?.('event', 'page_view', {
      page_location: window.location.href,
      page_path: pagePath,
    })
  }, [libraryLoaded, pathname, search])

  if (!ANALYTICS_ENABLED || !GA_MEASUREMENT_ID) {
    return null
  }

  return (
    <>
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          `,
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        onLoad={() => setLibraryLoaded(true)}
      />
    </>
  )
}

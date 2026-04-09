'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getSiteCopy } from '@/data/site-copy'
import { getLocaleFromPath } from '@/lib/i18n'

export default function LocaleDocument() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const copy = getSiteCopy(locale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <a href="#main-content" className="skip-link">
      {copy.skipToContent}
    </a>
  )
}

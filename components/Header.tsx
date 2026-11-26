'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getSiteCopy } from '@/data/site-copy'
import { getProjectExperience } from '@/data/portfolio-experience'
import { type Locale, localizePath, switchLocalePath } from '@/lib/i18n'
import BackLink from './BackLink'
import styles from './Header.module.css'

interface HeaderProps {
  locale?: Locale
}

function getBackPath(path: string) {
  const [section, slug] = path.replace(/^\/en(?=\/|$)/, '').split('/').filter(Boolean)
  if (!section) return null
  if (section === 'photography') return slug ? '/photography' : '/creative'
  if (section === 'visuals') return '/creative'
  if (section === 'case-studies') {
    if (!slug) return '/technical'
    return getProjectExperience(slug)?.caseStudyCategory === 'creative-work' ? '/creative' : '/technical'
  }
  if (section === 'apps') return slug ? '/apps' : '/technical'
  if (section === 'services') return '/technical'
  return '/'
}

export default function Header({ locale = 'en' }: HeaderProps) {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)
  const copy = getSiteCopy(locale).header
  const activePath = pathname || localizePath('/', locale)
  const backPath = getBackPath(activePath)

  useEffect(() => {
    let previousY = window.scrollY
    let frame = 0
    const resetFrame = window.requestAnimationFrame(() => setHidden(false))

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const currentY = window.scrollY
        const delta = currentY - previousY
        const headerHasFocus = document.activeElement?.closest('[data-testid="site-header"]')

        if (currentY < 120 || delta < -6 || headerHasFocus) setHidden(false)
        else if (delta > 6 && currentY > 160) setHidden(true)

        previousY = currentY
        frame = 0
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(resetFrame)
      window.cancelAnimationFrame(frame)
    }
  }, [pathname])

  return (
    <>
    <header
      data-testid="site-header"
      className={styles.headerBar}
      data-surface="paper"
      data-hidden={hidden ? 'true' : 'false'}
      onFocusCapture={() => setHidden(false)}
    >
      <Link href={localizePath('/', locale)} className={styles.logo} aria-label={copy.logoLabel}>Raúl Mermans</Link>
      {backPath && <BackLink href={backPath} locale={locale} />}
      <div className={styles.languageToggle} role="group" aria-label={copy.toggleLabel}>
        <Link
          href={switchLocalePath(activePath, 'en')}
          className={locale === 'en' ? styles.languageToggleActive : undefined}
          aria-current={locale === 'en' ? 'page' : undefined}
        >{copy.languageShort.en}</Link>
        <Link
          href={switchLocalePath(activePath, 'es')}
          className={locale === 'es' ? styles.languageToggleActive : undefined}
          aria-current={locale === 'es' ? 'page' : undefined}
        >{copy.languageShort.es}</Link>
      </div>
    </header>
    </>
  )
}

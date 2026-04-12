'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { getSiteCopy } from '@/data/site-copy'
import { type Locale, localizePath } from '@/lib/i18n'
import MagneticButton from './MagneticButton'
import styles from './Hero.module.css'

// Dynamic import for heavy animation component - improves INP
const HeroBackground = dynamic(() => import('./HeroBackground'), {
  ssr: false,
  loading: () => <div className={styles.background} aria-hidden="true" />
})

interface HeroProps {
  locale?: Locale
}

export default function Hero({ locale = 'en' }: HeroProps) {
  const copy = getSiteCopy(locale).home.hero

  return (
    <section className={styles.hero} data-home-section="hero" aria-labelledby="hero-title">
      <HeroBackground className={styles.background} />
      <div className={styles.content} data-mobile-audit="hero-content">
        <p className={`${styles.eyebrow} reveal`}>{copy.eyebrow}</p>

        <h1 id="hero-title" className={`${styles.title} reveal reveal-delay-1`} aria-label={copy.ariaLabel}>
          {copy.title}
        </h1>

        <p className={`${styles.summary} reveal reveal-delay-2`}>
          {copy.summary}
        </p>

        <div className={`${styles.ctaGroup} reveal reveal-delay-3`}>
          <MagneticButton className={styles.ctaWrapper}>
            <Link
              href={localizePath('/#contact', locale)}
              className={`${styles.cta} ${styles.primary}`}
              data-mobile-audit="hero-cta"
            >
              <span>{copy.primaryCta}</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
          </MagneticButton>
          <MagneticButton className={styles.ctaWrapper} intensity={20}>
            <Link
              href={localizePath('/case-studies', locale)}
              className={`${styles.cta} ${styles.secondary}`}
              data-mobile-audit="hero-cta"
            >
              <span>{copy.secondaryCta}</span>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}

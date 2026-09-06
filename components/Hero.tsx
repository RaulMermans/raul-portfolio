'use client'

import { useRef } from 'react'
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
  const heroRef = useRef<HTMLElement>(null)
  const copy = getSiteCopy(locale).home.hero

  const name = 'RAÚL'
  const surname = 'MERMANS'
  const handleScrollToWork = () => {
    const workSection = document.getElementById('building-now')
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      data-home-section="hero"
      aria-labelledby="hero-title"
    >
      <HeroBackground className={styles.background} />
      <div className={styles.content} data-mobile-audit="hero-content">
        <p className={`${styles.greeting} reveal`}>{copy.eyebrow}</p>

        {/* Name display - visual treatment. Hidden from assistive tech because
            the H1 carries the full accessible label combining name + positioning. */}
        <p className={styles.name} aria-hidden="true">
          <span className={styles.line}>{name}</span>
          <span className={styles.line}>{surname}</span>
        </p>

        <h1 id="hero-title" className={styles.services} aria-label={copy.ariaLabel}>
          {copy.headline}
        </h1>

        <p className={styles.summary}>{copy.summary}</p>

        <div className={styles.ctaGroup}>
          <MagneticButton className={styles.ctaWrapper}>
            <Link
              href={localizePath('/#building-now', locale)}
              className={`${styles.cta} ${styles.primary}`}
              data-mobile-audit="hero-cta"
            >
              <span>{copy.primaryCta}</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
          </MagneticButton>
          <MagneticButton className={styles.ctaWrapper} intensity={20}>
            <Link
              href={localizePath('/#contact', locale)}
              className={`${styles.cta} ${styles.secondary}`}
              data-mobile-audit="hero-cta"
            >
              <span>{copy.secondaryCta}</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
          </MagneticButton>
        </div>
      </div>

      <button
        type="button"
        className={styles.scrollButton}
        aria-label={copy.scrollAria}
        onClick={handleScrollToWork}
      >
        <span className={styles.scrollText}>{copy.scrollLabel}</span>
        <div className={styles.scrollLine}></div>
      </button>
    </section>
  )
}

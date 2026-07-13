'use client'

import { useEffect, useRef, useState } from 'react'
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

  const [greeting, setGreeting] = useState<string>(copy.greetings.morning)

  useEffect(() => {
    // Set greeting based on local time
    const hour = new Date().getHours()
    if (hour < 12) setGreeting(copy.greetings.morning)
    else if (hour < 18) setGreeting(copy.greetings.afternoon)
    else setGreeting(copy.greetings.evening)
  }, [copy.greetings.afternoon, copy.greetings.evening, copy.greetings.morning])

  const name = 'RAÚL'
  const surname = 'MERMANS'
  const nameLetters = name.split('')
  const surnameLetters = surname.split('')

  const handleScrollToWork = () => {
    const workSection = document.getElementById('selected-ai-systems')
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
        <p className={`${styles.greeting} reveal`}>{greeting}</p>

        {/* Name display - visual treatment. Hidden from assistive tech because
            the H1 carries the full accessible label combining name + positioning. */}
        <p className={styles.name} aria-hidden="true">
          <span className={styles.line}>
            {nameLetters.map((letter, i) => (
              <span key={i} className={styles.letter} style={{ animationDelay: `${0.3 + i * 0.06}s` }}>
                {letter}
              </span>
            ))}
          </span>
          <span className={styles.line}>
            {surnameLetters.map((letter, i) => (
              <span key={i} className={styles.letter} style={{ animationDelay: `${0.5 + i * 0.05}s` }}>
                {letter}
              </span>
            ))}
          </span>
        </p>

        <h1
          id="hero-title"
          className={`${styles.services} reveal reveal-delay-1`}
          aria-label={copy.ariaLabel}
        >
          {copy.services.map((service) => (
            <span key={service} className={styles.service} aria-hidden="true">{service}</span>
          ))}
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

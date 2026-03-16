'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import MagneticButton from './MagneticButton'
import styles from './Hero.module.css'

// Dynamic import for heavy animation component - improves INP
const HeroBackground = dynamic(() => import('./HeroBackground'), {
  ssr: false,
  loading: () => <div className={styles.background} aria-hidden="true" />
})

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  const [greeting, setGreeting] = useState('WELCOME')

  useEffect(() => {
    // Set greeting based on local time
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('GOOD MORNING')
    else if (hour < 18) setGreeting('GOOD AFTERNOON')
    else setGreeting('GOOD EVENING')
  }, [])

  const name = 'RAÚL'
  const surname = 'MERMANS'
  const nameLetters = name.split('')
  const surnameLetters = surname.split('')

  const handleScrollToWork = () => {
    const workSection = document.getElementById('work')
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

        {/* Name display - visual treatment. Not aria-hidden so screen readers announce it.
            The H1 provides the full accessible label combining name + services. */}
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

        {/* SEO-optimized H1 — accessible label includes the name so screen readers
            get "Raúl Mermans — Photography · Brand Identity · AI-Powered Creatives" */}
        <h1
          id="hero-title"
          className={`${styles.services} reveal reveal-delay-1`}
          aria-label="Raúl Mermans — Photography · Brand Identity · AI-Powered Creatives"
        >
          <span className={styles.service} aria-hidden="true">Photography</span>
          <span className={styles.divider} aria-hidden="true">·</span>
          <span className={styles.service} aria-hidden="true">Brand Identity</span>
          <span className={styles.divider} aria-hidden="true">·</span>
          <span className={styles.service} aria-hidden="true">AI-Powered Creatives</span>
        </h1>

        <div className={`${styles.ctaGroup} reveal reveal-delay-2`}>
          <MagneticButton className={styles.ctaWrapper}>
            <Link
              href="/#work"
              className={`${styles.cta} ${styles.primary}`}
              data-mobile-audit="hero-cta"
            >
              <span>View Work</span>
              <span className={styles.ctaArrow}>→</span>
            </Link>
          </MagneticButton>
          <MagneticButton className={styles.ctaWrapper} intensity={20}>
            <Link
              href="/#contact"
              className={`${styles.cta} ${styles.secondary}`}
              data-mobile-audit="hero-cta"
            >
              <span>Get in Touch</span>
            </Link>
          </MagneticButton>
        </div>
      </div>

      <button
        type="button"
        className={styles.scrollButton}
        aria-label="Scroll to explore"
        onClick={handleScrollToWork}
      >
        <span className={styles.scrollText}>Explore</span>
        <div className={styles.scrollLine}></div>
      </button>
    </section>
  )
}

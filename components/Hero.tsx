'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import MagneticButton from './MagneticButton'
import { HERO_MAGNETIC_MAX_DISTANCE, HERO_MAGNETIC_STRENGTH, HERO_SCALE_FACTOR } from '@/lib/constants'

// Dynamic import for heavy animation component - improves INP
const HeroBackground = dynamic(() => import('./HeroBackground'), {
  ssr: false,
  loading: () => <div className="hero-background" aria-hidden="true" />
})

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const primaryCtaRef = useRef<HTMLDivElement>(null)
  const secondaryCtaRef = useRef<HTMLDivElement>(null)

  const [greeting, setGreeting] = useState('WELCOME')

  useEffect(() => {
    // Set greeting based on local time
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('GOOD MORNING')
    else if (hour < 18) setGreeting('GOOD AFTERNOON')
    else setGreeting('GOOD EVENING')

    const hero = heroRef.current
    if (!hero) return

    const isDesktop = window.matchMedia('(hover: hover)').matches
    if (!isDesktop) return

    let ticking = false
    let cachedRect: DOMRect | null = null

    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!cachedRect) {
            cachedRect = hero.getBoundingClientRect()
          }
          // Magnetic hover effect for CTAs - Subtle, smooth interaction
          if (primaryCtaRef.current) {
            const rect = primaryCtaRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const distanceX = e.clientX - centerX
            const distanceY = e.clientY - centerY
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

            if (distance < HERO_MAGNETIC_MAX_DISTANCE) {
              const strength = (1 - distance / HERO_MAGNETIC_MAX_DISTANCE) * HERO_MAGNETIC_STRENGTH
              primaryCtaRef.current.style.transform = `translate(${distanceX * strength}px, ${distanceY * strength}px) scale(${HERO_SCALE_FACTOR})`
            } else {
              primaryCtaRef.current.style.transform = 'translate(0, 0) scale(1)'
            }
          }

          if (secondaryCtaRef.current) {
            const rect = secondaryCtaRef.current.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2
            const distanceX = e.clientX - centerX
            const distanceY = e.clientY - centerY
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

            if (distance < HERO_MAGNETIC_MAX_DISTANCE) {
              const strength = (1 - distance / HERO_MAGNETIC_MAX_DISTANCE) * HERO_MAGNETIC_STRENGTH
              secondaryCtaRef.current.style.transform = `translate(${distanceX * strength}px, ${distanceY * strength}px) scale(${HERO_SCALE_FACTOR})`
            } else {
              secondaryCtaRef.current.style.transform = 'translate(0, 0) scale(1)'
            }
          }

          ticking = false
        })
        ticking = true
      }
    }

    const handleResize = () => {
      cachedRect = null
    }

    hero.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
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
      className="hero"
      aria-labelledby="hero-title"
    >
      <HeroBackground />
      <div className="hero__content">
        <p className="hero__vibe-coded reveal">{greeting}</p>

        {/* Name display - visual treatment. Not aria-hidden so screen readers announce it.
            The H1 provides the full accessible label combining name + services. */}
        <p className="hero__name" aria-hidden="true">
          <span className="hero__line">
            {nameLetters.map((letter, i) => (
              <span key={i} className="hero__letter" style={{ animationDelay: `${0.3 + i * 0.06}s` }}>
                {letter}
              </span>
            ))}
          </span>
          <span className="hero__line">
            {surnameLetters.map((letter, i) => (
              <span key={i} className="hero__letter" style={{ animationDelay: `${0.5 + i * 0.05}s` }}>
                {letter}
              </span>
            ))}
          </span>
        </p>

        {/* SEO-optimized H1 — accessible label includes the name so screen readers
            get "Raúl Mermans — Photography · Brand Identity · AI-Powered Creatives" */}
        <h1
          id="hero-title"
          className="hero__services reveal reveal-delay-1"
          aria-label="Raúl Mermans — Photography · Brand Identity · AI-Powered Creatives"
        >
          <span className="hero__service" aria-hidden="true">Photography</span>
          <span className="hero__service-divider" aria-hidden="true">·</span>
          <span className="hero__service" aria-hidden="true">Brand Identity</span>
          <span className="hero__service-divider" aria-hidden="true">·</span>
          <span className="hero__service" aria-hidden="true">AI-Powered Creatives</span>
        </h1>

        <div className="hero__cta-group reveal reveal-delay-2">
          <MagneticButton ref={primaryCtaRef} className="hero__cta-wrapper">
            <Link
              href="/#work"
              className="hero__cta hero__cta--primary"
            >
              <span>View Work</span>
              <span className="hero__cta-arrow">→</span>
            </Link>
          </MagneticButton>
          <MagneticButton ref={secondaryCtaRef} className="hero__cta-wrapper" intensity={20}>
            <Link
              href="/#contact"
              className="hero__cta hero__cta--secondary"
            >
              <span>Get in Touch</span>
            </Link>
          </MagneticButton>
        </div>
      </div>

      <button
        className="hero__scroll"
        aria-label="Scroll to explore"
        onClick={handleScrollToWork}
      >
        <span className="hero__scroll-text">Explore</span>
        <div className="hero__scroll-line"></div>
      </button>
    </section>
  )
}


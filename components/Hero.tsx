'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import HeroBackground from './HeroBackground'

export default function Hero() {
  const orbMainRef = useRef<HTMLDivElement>(null)
  const orbSecondaryRef = useRef<HTMLDivElement>(null)
  const orbTertiaryRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
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
          const x = (e.clientX - cachedRect.left) / cachedRect.width - 0.5
          const y = (e.clientY - cachedRect.top) / cachedRect.height - 0.5

          if (orbMainRef.current) {
            orbMainRef.current.style.transform = `translate(calc(-50% + ${x * 30}px), calc(-50% + ${y * 30}px))`
          }
          if (orbSecondaryRef.current) {
            orbSecondaryRef.current.style.transform = `translate(${x * 50}px, ${y * 50}px)`
          }
          if (orbTertiaryRef.current) {
            orbTertiaryRef.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`
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
      <div className="hero__gradient" aria-hidden="true">
        <div ref={orbMainRef} className="hero__orb hero__orb--main" id="orb-main"></div>
        <div ref={orbSecondaryRef} className="hero__orb hero__orb--secondary" id="orb-secondary"></div>
        <div ref={orbTertiaryRef} className="hero__orb hero__orb--tertiary" id="orb-tertiary"></div>
      </div>
      
      <div className="hero__content">
        <p className="hero__vibe-coded reveal">THIS WEBSITE WAS FULLY VIBE CODED</p>
        
        <h1 id="hero-title" className="hero__name">
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
        </h1>
        
        <div className="hero__services reveal reveal-delay-1">
          <span className="hero__service">Photography</span>
          <span className="hero__service-divider">·</span>
          <span className="hero__service">Brand Identity</span>
          <span className="hero__service-divider">·</span>
          <span className="hero__service">AI-Powered Creatives</span>
        </div>
        
        <div className="hero__cta-group reveal reveal-delay-2">
          <Link href="/#work" className="hero__cta hero__cta--primary">
            <span>View Work</span>
            <span className="hero__cta-arrow">→</span>
          </Link>
          <Link href="/#contact" className="hero__cta hero__cta--secondary">
            <span>Get in Touch</span>
          </Link>
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


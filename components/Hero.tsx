'use client'

import { useEffect, useRef } from 'react'

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
            orbMainRef.current.style.transform = `translate(calc(-50% + ${x * 25}px), calc(-50% + ${y * 25}px))`
          }
          if (orbSecondaryRef.current) {
            orbSecondaryRef.current.style.transform = `translate(${x * 40}px, ${y * 40}px)`
          }
          if (orbTertiaryRef.current) {
            orbTertiaryRef.current.style.transform = `translate(${x * 15}px, ${y * 15}px)`
          }
          ticking = false
        })
        ticking = true
      }
    }
    
    // Recalculate rect on resize
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

  return (
    <section ref={heroRef} className="hero" aria-labelledby="hero-title">
      <div className="hero__gradient" aria-hidden="true">
        <div ref={orbMainRef} className="hero__orb hero__orb--main" id="orb-main"></div>
        <div ref={orbSecondaryRef} className="hero__orb hero__orb--secondary" id="orb-secondary"></div>
        <div ref={orbTertiaryRef} className="hero__orb hero__orb--tertiary" id="orb-tertiary"></div>
      </div>
      
      <div className="hero__content">
        <p className="label hero__label">Visual Storyteller</p>
        
        <h1 id="hero-title" className="hero__name">
          <span className="hero__line">
            {nameLetters.map((letter, i) => (
              <span key={i} className="hero__letter">
                {letter}
              </span>
            ))}
          </span>
          <span className="hero__line">
            {surnameLetters.map((letter, i) => (
              <span key={i} className="hero__letter">
                {letter}
              </span>
            ))}
          </span>
        </h1>
        
        <p className="hero__role">Photography · Brand Identity · AI-Powered Creatives</p>
        
        <p className="hero__tagline">&quot;Crafting visual stories that move people and elevate brands.&quot;</p>
      </div>
      
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  )
}


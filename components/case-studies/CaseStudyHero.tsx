'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { CaseStudyHero as CaseStudyHeroType } from '@/types/case-study'

interface CaseStudyHeroProps {
  hero: CaseStudyHeroType
  accentColor?: string
}

export default function CaseStudyHero({ hero, accentColor }: CaseStudyHeroProps) {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Parallax effect on scroll — rAF-throttled to avoid layout thrash every frame
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        if (!heroRef.current) { ticking = false; return }
        const scrolled = window.scrollY
        const heroImage = heroRef.current.querySelector<HTMLElement>('.case-study-hero-new__image')
        if (heroImage) {
          heroImage.style.transform = `translateY(${scrolled * 0.5}px)`
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={heroRef}
      className="case-study-hero-new"
      style={{ '--accent-color': accentColor } as React.CSSProperties}
    >
      <div className="case-study-hero-new__image-wrapper">
        <div className="case-study-hero-new__image">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            quality={hero.image.quality ?? 90}
            sizes={hero.image.sizes ?? '100vw'}
            style={{ objectFit: 'cover' }}
            className="case-study-hero-new__img"
          />
          <div className="case-study-hero-new__overlay"></div>
        </div>
      </div>
      
      <div className="case-study-hero-new__content">
        <div className="case-study-hero-new__container">
          <div className="case-study-hero-new__badge">Case Study</div>
          <h1 className="case-study-hero-new__title">{hero.title}</h1>
          {hero.tagline && (
            <p className="case-study-hero-new__tagline">{hero.tagline}</p>
          )}
          {hero.subtitle && (
            <p className="case-study-hero-new__subtitle">{hero.subtitle}</p>
          )}
          {hero.description && (
            <p className="case-study-hero-new__description">{hero.description}</p>
          )}
        </div>
      </div>

      <div className="case-study-hero-new__scroll-indicator">
        <div className="case-study-hero-new__scroll-line"></div>
        <span className="case-study-hero-new__scroll-text">Scroll</span>
      </div>
    </section>
  )
}


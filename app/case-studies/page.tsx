'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import { caseStudies } from '@/data/case-studies'

export default function CaseStudiesPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)

  const isLastCard = currentIndex === caseStudies.length - 1
  const nextIndex = isLastCard ? 0 : currentIndex + 1
  const nextStudy = caseStudies[nextIndex]

  // Navigate to a specific project
  const goToProject = useCallback((index: number) => {
    if (isAnimating) return
    
    // Clamp index within bounds (no wrapping for cleaner UX)
    const newIndex = Math.max(0, Math.min(index, caseStudies.length - 1))
    if (newIndex === currentIndex) return
    
    setIsAnimating(true)
    setCurrentIndex(newIndex)

    // Reset animation lock after transition
    setTimeout(() => setIsAnimating(false), 800)
  }, [isAnimating, currentIndex])

  // Navigate to next project
  const goToNext = useCallback(() => {
    if (currentIndex < caseStudies.length - 1) {
      goToProject(currentIndex + 1)
    }
  }, [currentIndex, goToProject])

  // Navigate to previous project
  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      goToProject(currentIndex - 1)
    }
  }, [currentIndex, goToProject])

  // Wheel/scroll handling
  useEffect(() => {
    let lastScroll = 0
    const COOLDOWN = 800
    const THRESHOLD = 50

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastScroll < COOLDOWN || isAnimating) return

      const delta = e.deltaY
      if (Math.abs(delta) > THRESHOLD) {
        lastScroll = now
        if (delta > 0) {
          goToNext()
        } else {
          goToPrev()
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [isAnimating, goToNext, goToPrev])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return
      
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case ' ': // Spacebar
          e.preventDefault()
          goToNext()
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault()
          goToPrev()
          break
        case 'Home':
          e.preventDefault()
          goToProject(0)
          break
        case 'End':
          e.preventDefault()
          goToProject(caseStudies.length - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAnimating, goToNext, goToPrev, goToProject])

  // Touch handling for mobile swipe
  useEffect(() => {
    const SWIPE_THRESHOLD = 50

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return
      
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      const deltaX = touchStartX.current - e.changedTouches[0].clientX
      
      // Only respond to vertical swipes (ignore horizontal)
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > SWIPE_THRESHOLD) {
        if (deltaY > 0) {
          goToNext()
        } else {
          goToPrev()
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isAnimating, goToNext, goToPrev])

  // Get card class based on position relative to current
  const getCardClass = (index: number) => {
    if (index === currentIndex) return 'active'
    if (index === currentIndex - 1) return 'prev'
    if (index === currentIndex + 1) return 'next'
    return ''
  }

  // Format number with leading zero
  const formatNumber = (num: number) => String(num + 1).padStart(2, '0')

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="grain" aria-hidden="true"></div>

      <div className="hero-stack__header-wrapper">
        <Header />
      </div>

      <main 
        id="main-content" 
        role="main" 
        className={`hero-stack ${isLastCard ? 'hero-stack--last-card' : ''}`}
        ref={containerRef}
        aria-label="Case Studies Gallery"
      >
        {/* Hero Cards */}
        <div className="hero-stack__cards">
          {caseStudies.map((study, index) => (
            <article
              key={study.id}
              className={`hero-card ${getCardClass(index)}`}
              aria-hidden={index !== currentIndex}
            >
              {/* Background Image */}
              <div className="hero-card__media">
                <Image
                  src={study.image}
                  alt=""
                  fill
                  quality={90}
                  sizes="100vw"
                  className="hero-card__image"
                  priority={index === 0 || index === currentIndex}
                />
                <div className="hero-card__gradient" aria-hidden="true" />
              </div>

              {/* Content */}
              <div className="hero-card__content">
                {study.subtitle && (
                  <span className="hero-card__subtitle">{study.subtitle}</span>
                )}
                <h2 className="hero-card__title">{study.title}</h2>
                <p className="hero-card__description">{study.description}</p>
                <Link 
                  href={study.href} 
                  className="hero-card__cta"
                  tabIndex={index === currentIndex ? 0 : -1}
                >
                  View Project
                  <span className="hero-card__cta-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <nav 
          className="hero-stack__pagination" 
          aria-label="Project navigation"
        >
          {caseStudies.map((study, index) => (
            <button
              key={study.id}
              className={`hero-stack__pagination-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToProject(index)}
              aria-label={`Go to ${study.title}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            >
              <span className="hero-stack__pagination-number">
                {formatNumber(index)}
              </span>
              <span className="hero-stack__pagination-line" aria-hidden="true" />
            </button>
          ))}
        </nav>

        {/* Counter Display */}
        <div className="hero-stack__counter" aria-live="polite" aria-atomic="true">
          <span className="hero-stack__counter-current">{formatNumber(currentIndex)}</span>
          <span className="hero-stack__counter-separator">/</span>
          <span className="hero-stack__counter-total">{formatNumber(caseStudies.length - 1)}</span>
          <span className="sr-only">
            Viewing case study {currentIndex + 1} of {caseStudies.length}
          </span>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-stack__scroll-indicator" aria-hidden="true">
          <span className="hero-stack__scroll-indicator-text">Scroll</span>
          <div className="hero-stack__scroll-indicator-line" />
        </div>

        {/* Next Project Preview */}
        {!isLastCard && (
          <button
            className="hero-stack__next-preview"
            onClick={goToNext}
            aria-label={`Next project: ${nextStudy.title}`}
          >
            <div className="hero-stack__next-preview-inner">
              <div className="hero-stack__next-preview-content">
                <span className="hero-stack__next-preview-label">Next Project</span>
                <span className="hero-stack__next-preview-title">{nextStudy.title}</span>
                <span className="hero-stack__next-preview-arrow" aria-hidden="true">↓</span>
              </div>
            </div>
          </button>
        )}
      </main>
    </>
  )
}

'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import { caseStudies } from '@/data/case-studies'

export default function CaseStudiesPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const goToProject = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)

    const newIndex = index < 0 ? caseStudies.length - 1 : index >= caseStudies.length ? 0 : index
    setCurrentIndex(newIndex)

    setTimeout(() => setIsAnimating(false), 800)
  }

  // Scroll handling
  useEffect(() => {
    let lastScroll = 0
    const COOLDOWN = 800

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now()
      if (now - lastScroll < COOLDOWN || isAnimating) return

      const delta = e.deltaY
      if (delta > 30) {
        lastScroll = now
        goToProject(currentIndex + 1)
      } else if (delta < -30) {
        lastScroll = now
        goToProject(currentIndex - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        goToProject(currentIndex + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        goToProject(currentIndex - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, isAnimating])

  // Touch handling - disabled on mobile for simpler scroll experience
  useEffect(() => {
    const isMobile = window.innerWidth <= 900
    if (isMobile) return // Don't enable touch swipe on mobile - allow normal scroll

    let touchY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return
      const diff = touchY - e.changedTouches[0].clientY

      if (diff > 50) {
        goToProject(currentIndex + 1)
      } else if (diff < -50) {
        goToProject(currentIndex - 1)
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentIndex, isAnimating])

  // Hide scroll hint when at bottom or on last project
  useEffect(() => {
    const scrollHint = document.querySelector('.case-studies-split__scroll-hint')
    if (!scrollHint) return

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const distanceFromBottom = documentHeight - scrollPosition
      const isAtBottom = distanceFromBottom < 100
      const isLastProject = currentIndex === caseStudies.length - 1

      if (isAtBottom || isLastProject) {
        scrollHint.classList.add('hidden')
      } else {
        scrollHint.classList.remove('hidden')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentIndex])

  const currentStudy = caseStudies[currentIndex]

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="grain" aria-hidden="true"></div>

      <div className="case-studies-split__header-wrapper">
      <Header />
      </div>

      <main id="main-content" role="main" className="case-studies-split" ref={containerRef}>
        {/* Left Content Column */}
        <div className="case-studies-split__content">
          <div className="case-studies-split__content-inner">
            {caseStudies.map((study, index) => (
              <div
                key={study.id}
                className={`case-studies-split__slide ${index === currentIndex ? 'active' : ''}`}
              >
                <h1 className="case-studies-split__title">{study.title}</h1>
                <p className="case-studies-split__description">
                  {study.description}
                </p>
                <Link 
                  href={study.href} 
                  className="case-studies-split__cta"
                  style={{ color: study.color }}
                >
                  OPEN CASE STUDY →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image Column */}
        <div className="case-studies-split__image-wrapper">
          {caseStudies.map((study, index) => (
            <div
              key={study.id}
              className={`case-studies-split__image-container ${index === currentIndex ? 'active' : ''}`}
              style={{
                background: index === currentIndex ? study.color : 'transparent',
              }}
            >
              <div className="case-studies-split__image-inner">
              <Image
                  src={study.image}
                  alt={study.title}
                fill
                  quality={90}
                  sizes="50vw"
                  className="case-studies-split__image"
                  priority={index === currentIndex}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Vertical Scroll Indicator Dots */}
        <nav className="case-studies-split__dots" aria-label="Project navigation">
        {caseStudies.map((study, index) => (
          <button
            key={index}
              className={`case-studies-split__dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToProject(index)}
            aria-label={`Go to ${study.title}`}
            aria-current={index === currentIndex ? 'true' : undefined}
              style={{
                '--dot-color': study.color,
              } as React.CSSProperties}
            />
        ))}
      </nav>

        {/* Scroll Indicator - Shows there's more content */}
        <div className="case-studies-split__scroll-hint">
          <div className="case-studies-split__scroll-hint-line"></div>
          <span className="case-studies-split__scroll-hint-text">Scroll</span>
      </div>
      </main>
    </>
  )
}

'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import { caseStudies } from '@/data/case-studies'

export default function CaseStudiesPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  const TOTAL = caseStudies.length

  // Go to slide
  const goTo = (index: number) => {
    if (isAnimating) return

    // Infinite loop
    let newIndex = index
    if (newIndex < 0) newIndex = TOTAL - 1
    if (newIndex >= TOTAL) newIndex = 0

    if (newIndex === currentIndex) return

    setIsAnimating(true)
    if (!hasScrolled && scrollHintRef.current) {
      setHasScrolled(true)
      scrollHintRef.current.classList.add('hidden')
    }

    const oldIndex = currentIndex
    setCurrentIndex(newIndex)

    // Update slides
    const slides = document.querySelectorAll('.slide')
    slides[oldIndex]?.classList.remove('active')
    slides[newIndex]?.classList.add('active')

    // Update dots
    const dots = document.querySelectorAll('.dot')
    const dotInners = document.querySelectorAll('.dot__inner')
    dots[oldIndex]?.classList.remove('active')
    ;(dotInners[oldIndex] as HTMLElement)?.style.setProperty('background', '')
    dots[newIndex]?.classList.add('active')
    ;(dotInners[newIndex] as HTMLElement)?.style.setProperty('background', caseStudies[newIndex].color)

    setTimeout(() => setIsAnimating(false), 1000)
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
        goTo(currentIndex + 1)
      } else if (delta < -30) {
        lastScroll = now
        goTo(currentIndex - 1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })

    // Touch handling
    let touchY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return
      const diff = touchY - e.changedTouches[0].clientY

      if (diff > 50) {
        goTo(currentIndex + 1)
      } else if (diff < -50) {
        goTo(currentIndex - 1)
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    // Keyboard handling
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goTo(currentIndex + 1)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        goTo(currentIndex - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, isAnimating])

  // Initialize dots
  useEffect(() => {
    const dotInners = document.querySelectorAll('.dot__inner')
    if (dotInners[0]) {
      ;(dotInners[0] as HTMLElement).style.setProperty('background', caseStudies[0].color)
    }
  }, [])

  // Disable scroll-snap for normal scrolling
  useEffect(() => {
    if (typeof window === 'undefined') return
    document.documentElement.style.scrollSnapType = 'none'
    document.body.style.overflowY = 'auto'
    return () => {
      document.documentElement.style.scrollSnapType = ''
      document.body.style.overflowY = ''
    }
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="grain" aria-hidden="true"></div>

      <Header />

      {/* Main Layout */}
      <main id="main-content" role="main" className="case-studies-main">
        {/* Left: Content */}
        <section className="case-studies-content intro-content">
          {caseStudies.map((study, index) => (
            <article
              key={study.id}
              className={`slide ${index === currentIndex ? 'active' : ''}`}
              data-index={index}
            >
              <h1 className="slide__title" style={{ color: study.color }}>
                {study.title}
              </h1>
              <p className="slide__desc">{study.description}</p>
              <Link href={study.href} className="cta" style={{ color: study.color }}>
                Open Case Study <span className="cta__arrow">→</span>
              </Link>
            </article>
          ))}
        </section>

        {/* Right: Project Thumbnail */}
        <section className="case-studies-thumbnail" id="thumbnail">
          <Link 
            href={caseStudies[currentIndex].href}
            className="case-studies-thumbnail__link"
            aria-label={`View ${caseStudies[currentIndex].title} case study`}
          >
            <div className="case-studies-thumbnail__wrapper">
              <Image
                key={caseStudies[currentIndex].id}
                src={caseStudies[currentIndex].image}
                alt={caseStudies[currentIndex].title}
                fill
                quality={90}
                sizes="(max-width: 900px) 100vw, 42vw"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
                className="case-studies-thumbnail__image"
              />
              <div className="case-studies-thumbnail__overlay"></div>
            </div>
          </Link>
        </section>
      </main>

      {/* Dots Navigation */}
      <nav className="case-studies-dots intro-dots" id="dotsNav" aria-label="Case study navigation">
        {caseStudies.map((study, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            data-index={index}
            onClick={() => goTo(index)}
            aria-label={`Go to ${study.title}`}
            aria-current={index === currentIndex ? 'true' : undefined}
          >
            <span className="dot__inner" style={{ background: index === currentIndex ? study.color : '' }}></span>
          </button>
        ))}
      </nav>

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        className={`scroll-hint intro-scroll ${hasScrolled ? 'hidden' : ''}`}
        id="scrollHint"
        aria-hidden="true"
      >
        <div className="scroll-hint__line"></div>
        <span>Scroll</span>
      </div>
    </>
  )
}

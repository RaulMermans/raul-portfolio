'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'

// ========================================
// VISUAL WORK DATA
// ========================================
// Update this data structure with your actual visual work
// Images should be in /public/images/visuals/
// ========================================

interface VisualWork {
  title: string
  year: string
  catalogNumber: string
  type: string
  image: string
  medium: string
  support: string
  dimensions: string
  edition: string
  series: string
  note: string
  provenance: string
  status: string
}

const works: VisualWork[] = [
  {
    title: 'Neon Genesis',
    year: '2024',
    catalogNumber: 'RM-NG-24-001',
    type: 'AI Art',
    image: '/images/visuals/ai-art/piece-1.webp',
    medium: 'AI-generated image + digital post-production',
    support: 'Archival pigment print on 310gsm cotton rag (intended)',
    dimensions: '90 × 60 cm (35.4 × 23.6 in)',
    edition: 'Monotype (1/1)',
    series: 'From the collection: Digital Horizons',
    note: 'An exploration of synthetic light and color that challenges the boundary between organic warmth and digital precision. The work emerged from a dialogue with generative systems, seeking to capture the feeling of witnessing something simultaneously familiar and impossible—a sunset that never existed, yet feels like home.',
    provenance: "Artist's archive, Madrid.",
    status: 'Available.',
  },
  {
    title: 'Midnight Waves',
    year: '2024',
    catalogNumber: 'RM-MW-24-002',
    type: 'Album Cover',
    image: '/images/visuals/album-covers/cover-1.webp',
    medium: 'Digital composition + photography',
    support: 'Digital file, print-ready at 300dpi',
    dimensions: '3000 × 3000 px (album format)',
    edition: 'Commercial license',
    series: 'Music & Identity',
    note: 'Created for an electronic music release exploring themes of nocturnal solitude and urban isolation. The visual language draws from 80s synthwave aesthetics while maintaining a contemporary tension—the crowd is present but absorbed in something beyond the frame.',
    provenance: 'Client commission, 2024.',
    status: 'Licensed.',
  },
  {
    title: 'Digital Bloom',
    year: '2024',
    catalogNumber: 'RM-DB-24-003',
    type: 'AI Art',
    image: '/images/visuals/ai-art/piece-2.webp',
    medium: 'AI-generated image + color grading',
    support: 'Archival pigment print on Hahnemühle Photo Rag',
    dimensions: '70 × 100 cm (27.6 × 39.4 in)',
    edition: 'Edition of 3 + 1 AP',
    series: 'From the collection: Organic Algorithms',
    note: 'Nature reimagined through computational eyes. This piece questions whether synthetic beauty can evoke the same emotional response as the organic. The colors push beyond photographic reality while maintaining the structure of botanical truth.',
    provenance: "Artist's archive, Madrid.",
    status: 'Available (2/3 remaining).',
  },
  {
    title: 'Glitch Protocol',
    year: '2024',
    catalogNumber: 'RM-GP-24-004',
    type: 'Experiment',
    image: '/images/visuals/experiments/exp-1.webp',
    medium: 'Corrupted data visualization + AI reconstruction',
    support: 'Digital file, NFT available',
    dimensions: 'Variable (responsive artwork)',
    edition: 'Unique digital original',
    series: 'Error States',
    note: 'What happens when we intentionally break the system? This work embraces digital corruption as aesthetic—feeding errors back through neural networks until something beautiful emerges from the chaos. The glitch is not a bug; it is the art.',
    provenance: "Artist's archive, digital vault.",
    status: 'Available.',
  },
  {
    title: 'Echoes',
    year: '2024',
    catalogNumber: 'RM-EC-24-005',
    type: 'Album Cover',
    image: '/images/visuals/album-covers/cover-2.webp',
    medium: 'Photography + digital manipulation',
    support: 'Digital file, print-ready at 300dpi',
    dimensions: '3000 × 3000 px (album format)',
    edition: 'Commercial license',
    series: 'Music & Identity',
    note: 'An album cover exploring the resonance between sound and visual memory. The overlapping forms suggest how music occupies space—filling rooms, bouncing off walls, leaving traces in the mind long after the last note fades.',
    provenance: 'Client commission, 2024.',
    status: 'Licensed.',
  },
  {
    title: 'Synthetic Dreams',
    year: '2023',
    catalogNumber: 'RM-SD-23-006',
    type: 'AI Art',
    image: '/images/visuals/ai-art/piece-3.webp',
    medium: 'AI-generated image + digital post-production',
    support: 'Archival pigment print on 310gsm cotton rag',
    dimensions: '60 × 90 cm (23.6 × 35.4 in)',
    edition: 'Monotype (1/1)',
    series: 'From the collection: Counterfeit Memories',
    note: 'A photograph that insists it happened. The image carries the texture of proof—grain, softness, the suggestion of a private moment—yet its origin is purely synthetic. The work tests how quickly nostalgia becomes evidence, and how easily the mind accepts a beautiful artifact as personal history.',
    provenance: "Artist's archive, Madrid.",
    status: 'Available.',
  },
  {
    title: 'Particle Field',
    year: '2023',
    catalogNumber: 'RM-PF-23-007',
    type: 'Experiment',
    image: '/images/visuals/experiments/exp-2.webp',
    medium: 'Generative algorithm + data visualization',
    support: 'Real-time rendering / static capture available',
    dimensions: 'Variable (generative artwork)',
    edition: 'Unique generative system',
    series: 'Data Aesthetics',
    note: 'Thousands of particles following invisible rules create patterns that feel cosmic in scale. The work visualizes the tension between chaos and order—every particle is random, yet together they form something that looks inevitable.',
    provenance: "Artist's archive, digital vault.",
    status: 'Available for commission.',
  },
  {
    title: 'Chromatic',
    year: '2023',
    catalogNumber: 'RM-CH-23-008',
    type: 'Album Cover',
    image: '/images/visuals/album-covers/cover-3.webp',
    medium: 'Photography + color manipulation',
    support: 'Digital file, print-ready at 300dpi',
    dimensions: '3000 × 3000 px (album format)',
    edition: 'Commercial license',
    series: 'Music & Identity',
    note: 'Pure color as emotion. This cover strips away literal imagery to let chromatic relationships carry the musical mood. The gradients were developed through extensive iteration, seeking colors that "sound" like the music they represent.',
    provenance: 'Client commission, 2023.',
    status: 'Licensed.',
  },
]

export default function VisualsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [exhibitionOpen, setExhibitionOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const worksContainerRef = useRef<HTMLDivElement>(null)
  const titleTextRef = useRef<HTMLSpanElement>(null)
  const exhibitionViewRef = useRef<HTMLDivElement>(null)
  const touchStartXRef = useRef(0)
  const touchEndXRef = useRef(0)

  const currentWork = works[currentIndex]
  const totalWorks = works.length

  // Horizontal scroll on wheel
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const isLandscapeMobile = window.matchMedia('(max-height: 500px) and (orientation: landscape)').matches

    if (isMobile && !isLandscapeMobile) return

    const handleWheel = (e: WheelEvent) => {
      if (exhibitionOpen) return
      const mobileMenu = document.querySelector('.ui__mobile-menu')
      if (mobileMenu?.classList.contains('active')) return
      
      e.preventDefault()
      window.scrollBy({ left: e.deltaY * 2, behavior: 'auto' })
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [exhibitionOpen])

  // Progress bar
  useEffect(() => {
    const updateProgress = () => {
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft
      const maxScroll = document.documentElement.scrollWidth - window.innerWidth
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  // Title parallax
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile || !titleTextRef.current) return

    const handleScroll = () => {
      if (!titleTextRef.current) return
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft
      titleTextRef.current.style.transform = `translateX(${scrollLeft * -0.15}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Reveal cards on scroll
  useEffect(() => {
    const cards = document.querySelectorAll('.work-card')
    if (!('IntersectionObserver' in window)) {
      setTimeout(() => {
        cards.forEach((card) => card.classList.add('visible'))
      }, 100)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  // Hide scroll hint
  useEffect(() => {
    const handleScroll = () => {
      if (!hasScrolled) {
        setHasScrolled(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolled])

  // Keyboard navigation for exhibition view
  useEffect(() => {
    if (!exhibitionOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExhibitionOpen(false)
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      } else if (e.key === 'ArrowRight' && currentIndex < totalWorks - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [exhibitionOpen, currentIndex, totalWorks])

  // Touch swipe for exhibition view
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.changedTouches[0].screenX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndXRef.current = e.changedTouches[0].screenX
    handleSwipe()
  }

  const handleSwipe = () => {
    const swipeThreshold = 50
    const diff = touchStartXRef.current - touchEndXRef.current

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentIndex < totalWorks - 1) {
        setCurrentIndex(currentIndex + 1)
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
    }
  }

  const openExhibition = (index: number) => {
    setCurrentIndex(index)
    setExhibitionOpen(true)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }

  const closeExhibition = () => {
    setExhibitionOpen(false)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goToNext = () => {
    if (currentIndex < totalWorks - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  // Enable horizontal scroll for visuals page
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const isLandscapeMobile = window.matchMedia('(max-height: 500px) and (orientation: landscape)').matches

    // Enable horizontal scrolling on desktop/landscape mobile
    if (!isMobile || isLandscapeMobile) {
      // Set document/html to allow horizontal scroll
      document.documentElement.style.background = 'var(--ink)'
      document.documentElement.style.overflowY = 'hidden'
      document.documentElement.style.overflowX = 'auto'
      document.documentElement.style.height = '100vh'
      document.documentElement.style.height = '100svh'
      
      // Set body to allow horizontal scroll
      document.body.style.overflowY = 'hidden'
      document.body.style.overflowX = 'auto'
      document.body.style.height = '100vh'
      document.body.style.height = '100svh'
      document.body.style.background = 'var(--ink)'
      document.body.style.color = 'var(--cream)'
      
      // Ensure main container makes document wider than viewport
      const main = document.getElementById('main')
      if (main) {
        main.style.width = 'max-content'
        main.style.minWidth = '100vw'
      }
      
      // Calculate and set proper width based on works-container
      setTimeout(() => {
        const worksContainer = document.getElementById('works-container')
        if (worksContainer && main) {
          const containerWidth = worksContainer.scrollWidth
          const viewportWidth = window.innerWidth
          if (containerWidth > viewportWidth) {
            main.style.width = `${containerWidth}px`
          }
        }
      }, 100)
    } else {
      // Mobile: normal vertical scroll
      document.documentElement.style.background = 'var(--ink)'
      document.documentElement.style.overflowY = 'auto'
      document.documentElement.style.overflowX = 'hidden'
      document.documentElement.style.height = 'auto'
      document.body.style.overflowY = 'auto'
      document.body.style.overflowX = 'hidden'
      document.body.style.height = 'auto'
      document.body.style.background = 'var(--ink)'
      document.body.style.color = 'var(--cream)'
    }

    return () => {
      document.documentElement.style.background = ''
      document.documentElement.style.overflowY = ''
      document.documentElement.style.overflowX = ''
      document.documentElement.style.height = ''
      document.body.style.overflowY = ''
      document.body.style.overflowX = ''
      document.body.style.height = ''
      document.body.style.background = ''
      document.body.style.color = ''
      
      const main = document.getElementById('main')
      if (main) {
        main.style.width = ''
        main.style.minWidth = ''
      }
    }
  }, [])

  return (
    <>
      <div className="grain" aria-hidden="true"></div>

      {/* Background Effects */}
      <div className="bg-effects" aria-hidden="true">
        <div className="bg-orb bg-orb--1"></div>
        <div className="bg-orb bg-orb--2"></div>
        <div className="bg-orb bg-orb--3"></div>
      </div>

      <div className="light-leak" aria-hidden="true"></div>
      <div className="vignette" aria-hidden="true"></div>
      <div className="scanlines" aria-hidden="true"></div>

      <Header />

      {/* Large Title Overlay */}
      <div className="title-overlay" aria-hidden="true">
        <span className="title-overlay__text" ref={titleTextRef} id="title-text">
          Visuals
        </span>
      </div>

      {/* Main Content */}
      <main id="main">
        <div className="works-container" ref={worksContainerRef} id="works-container">
          {works.map((work, index) => (
            <article key={index} className="work-card" data-index={index}>
              <div className="work-card__image-wrapper">
                <img
                  className="work-card__image"
                  src={work.image}
                  alt={work.title}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/placeholders/visuals-fallback.webp'
                  }}
                />
              </div>
              <div className="work-card__overlay"></div>
              <span className="work-card__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="work-card__type">{work.type}</span>
              <div className="work-card__info">
                <h2 className="work-card__title">{work.title}</h2>
                <p className="work-card__meta">
                  {work.year} | {String(index + 1).padStart(2, '0')}
                </p>
              </div>
              <button
                className="work-card__link"
                aria-label={`View details for ${work.title}`}
                onClick={() => openExhibition(index)}
              ></button>
            </article>
          ))}
        </div>
      </main>

      {/* Scroll Hint */}
      {!hasScrolled && (
        <div className="scroll-hint" aria-hidden="true">
          <span className="scroll-hint__text">Scroll to explore</span>
          <span className="scroll-hint__arrow">→→</span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="progress-bar" aria-hidden="true">
        <div className="progress-bar__fill" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Exhibition Detail View */}
      <div
        className={`exhibition-view ${exhibitionOpen ? 'active' : ''}`}
        ref={exhibitionViewRef}
        role="dialog"
        aria-modal="true"
        aria-label="Artwork details"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close Button */}
        <button
          className="exhibition-view__close"
          onClick={closeExhibition}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Image Panel */}
        <div className="exhibition-view__image-panel">
          <div className="exhibition-view__image-wrapper">
            <img
              className="exhibition-view__image"
              src={currentWork.image}
              alt={currentWork.title}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/images/placeholders/visuals-fallback.webp'
              }}
            />
            <span className="exhibition-view__image-index">
              {String(currentIndex + 1).padStart(2, '0')} / {String(totalWorks).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Details Panel */}
        <div className="exhibition-view__details-panel">
          <div className="exhibition-view__content">
            {/* Catalog Number */}
            <div className="exhibition-view__catalog-number">
              <span>{currentWork.catalogNumber}</span>
            </div>

            {/* Title */}
            <h2 className="exhibition-view__title">{currentWork.title}</h2>

            {/* Year & Type */}
            <p className="exhibition-view__subtitle">
              {currentWork.year} — {currentWork.type}
            </p>

            {/* Divider */}
            <div className="exhibition-view__divider"></div>

            {/* Metadata Fields */}
            <div className="exhibition-view__fields">
              <div className="exhibition-view__field">
                <span className="exhibition-view__label">Medium</span>
                <p className="exhibition-view__value">{currentWork.medium}</p>
              </div>

              <div className="exhibition-view__field">
                <span className="exhibition-view__label">Dimensions</span>
                <p className="exhibition-view__value">{currentWork.dimensions}</p>
              </div>

              <div className="exhibition-view__field">
                <span className="exhibition-view__label">Support</span>
                <p className="exhibition-view__value">{currentWork.support}</p>
              </div>

              <div className="exhibition-view__field">
                <span className="exhibition-view__label">Edition</span>
                <p className="exhibition-view__value">{currentWork.edition}</p>
              </div>

              <div className="exhibition-view__field exhibition-view__field--full">
                <span className="exhibition-view__label">Series</span>
                <p className="exhibition-view__value">{currentWork.series}</p>
              </div>
            </div>

            {/* Curatorial Note */}
            <div className="exhibition-view__note">
              <span className="exhibition-view__label">Curatorial Note</span>
              <p className="exhibition-view__value">{currentWork.note}</p>
            </div>

            {/* Footer */}
            <div className="exhibition-view__footer">
              <div className="exhibition-view__footer-item">
                Provenance
                <span>{currentWork.provenance}</span>
              </div>
              <div className="exhibition-view__footer-item">
                Status
                <span>{currentWork.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="exhibition-view__nav">
          <div className="exhibition-view__nav-left">
            <button
              className="exhibition-view__nav-btn exhibition-view__nav-btn--prev"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              aria-label="Previous artwork"
            >
              <span className="arrow">←</span> Previous
            </button>
            <button
              className="exhibition-view__nav-btn exhibition-view__nav-btn--back"
              onClick={closeExhibition}
            >
              Back to Exhibition
            </button>
          </div>
          <div className="exhibition-view__nav-right">
            <button
              className="exhibition-view__nav-btn exhibition-view__nav-btn--next"
              onClick={goToNext}
              disabled={currentIndex === totalWorks - 1}
              aria-label="Next artwork"
            >
              Next <span className="arrow">→</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}

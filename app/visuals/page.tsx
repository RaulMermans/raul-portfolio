'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'

interface Work {
  title: string
  year: string
  type: string
  catalog: string
  image: string
  alt: string
  medium: string
  dimensions: string
  support: string
  edition: string
  series: string
  note: string
  provenance: string
  status: string
}

const works: Work[] = [
  {
    title: 'Neon Genesis',
    year: '2024',
    type: 'AI Art',
    catalog: 'RM-NG-24-001',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&q=95',
    alt: 'Neon Genesis',
    medium: 'AI-generated image + digital post-production',
    dimensions: '90 × 60 cm (35.4 × 23.6 in)',
    support: 'Archival pigment print on 310gsm cotton rag',
    edition: 'Monotype (1/1)',
    series: 'From the collection: Digital Horizons',
    note: 'An exploration of synthetic light and color that challenges the boundary between organic warmth and digital precision.',
    provenance: "Artist's archive, Madrid",
    status: 'Available'
  },
  {
    title: 'Midnight Waves',
    year: '2024',
    type: 'Album Cover',
    catalog: 'RM-MW-24-002',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1400&q=95',
    alt: 'Midnight Waves',
    medium: 'Digital composition + photography',
    dimensions: '3000 × 3000 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Commercial license',
    series: 'Music & Identity',
    note: 'Created for an electronic music release exploring themes of nocturnal solitude and urban isolation.',
    provenance: 'Client commission, 2024',
    status: 'Licensed'
  },
  {
    title: 'Digital Bloom',
    year: '2024',
    type: 'AI Art',
    catalog: 'RM-DB-24-003',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339bbe3c35?w=1400&q=95',
    alt: 'Digital Bloom',
    medium: 'AI-generated image + color grading',
    dimensions: '70 × 100 cm (27.6 × 39.4 in)',
    support: 'Archival pigment print on Hahnemühle Photo Rag',
    edition: 'Edition of 3 + 1 AP',
    series: 'From the collection: Organic Algorithms',
    note: 'Nature reimagined through computational eyes.',
    provenance: "Artist's archive, Madrid",
    status: 'Available (2/3 remaining)'
  },
  {
    title: 'Glitch Protocol',
    year: '2024',
    type: 'Experiment',
    catalog: 'RM-GP-24-004',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=95',
    alt: 'Glitch Protocol',
    medium: 'Corrupted data visualization + AI reconstruction',
    dimensions: 'Variable (responsive artwork)',
    support: 'Digital file, NFT available',
    edition: 'Unique digital original',
    series: 'Error States',
    note: 'What happens when we intentionally break the system?',
    provenance: "Artist's archive, digital vault",
    status: 'Available'
  },
  {
    title: 'Echoes',
    year: '2024',
    type: 'Album Cover',
    catalog: 'RM-EC-24-005',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1400&q=95',
    alt: 'Echoes',
    medium: 'Photography + digital manipulation',
    dimensions: '3000 × 3000 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Commercial license',
    series: 'Music & Identity',
    note: 'An album cover exploring the resonance between sound and visual memory.',
    provenance: 'Client commission, 2024',
    status: 'Licensed'
  },
  {
    title: 'Synthetic Dreams',
    year: '2023',
    type: 'AI Art',
    catalog: 'RM-SD-23-006',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1400&q=95',
    alt: 'Synthetic Dreams',
    medium: 'AI-generated image + digital post-production',
    dimensions: '60 × 90 cm (23.6 × 35.4 in)',
    support: 'Archival pigment print on 310gsm cotton rag',
    edition: 'Monotype (1/1)',
    series: 'From the collection: Counterfeit Memories',
    note: 'A photograph that insists it happened.',
    provenance: "Artist's archive, Madrid",
    status: 'Available'
  },
  {
    title: 'Particle Field',
    year: '2023',
    type: 'Experiment',
    catalog: 'RM-PF-23-007',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1400&q=95',
    alt: 'Particle Field',
    medium: 'Generative algorithm + data visualization',
    dimensions: 'Variable (generative artwork)',
    support: 'Real-time rendering / static capture available',
    edition: 'Unique generative system',
    series: 'Data Aesthetics',
    note: 'Thousands of particles following invisible rules create patterns that feel cosmic in scale.',
    provenance: "Artist's archive, digital vault",
    status: 'Available for commission'
  },
  {
    title: 'Chromatic',
    year: '2023',
    type: 'Album Cover',
    catalog: 'RM-CH-23-008',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=1400&q=95',
    alt: 'Chromatic',
    medium: 'Photography + color manipulation',
    dimensions: '3000 × 3000 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Commercial license',
    series: 'Music & Identity',
    note: 'Pure color as emotion.',
    provenance: 'Client commission, 2023',
    status: 'Licensed'
  }
]

export default function VisualsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExhibitionOpen, setIsExhibitionOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [targetScroll, setTargetScroll] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [visibleCardIndex, setVisibleCardIndex] = useState(1)

  const mainRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const scrollFillRef = useRef<HTMLDivElement>(null)
  const scrollCountRef = useRef<HTMLSpanElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const galleryTitleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])
  const animationFrameRef = useRef<number>()

  // Initialize text reveal
  useEffect(() => {
    if (!galleryTitleRef.current) return
    
    const title = 'Visuals'
    galleryTitleRef.current.innerHTML = ''
    
    title.split('').forEach((char, i) => {
      const span = document.createElement('span')
      span.className = 'char'
      span.textContent = char
      span.style.animationDelay = `${0.7 + i * 0.1}s`
      galleryTitleRef.current?.appendChild(span)
    })
  }, [])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > 768
      setIsDesktop(desktop)
      
      if (desktop && galleryRef.current) {
        const max = galleryRef.current.scrollWidth - window.innerWidth
        setMaxScroll(max)
        if (galleryRef.current) {
          galleryRef.current.style.transform = `translateX(${-scrollPosition}px)`
        }
      } else {
        if (galleryRef.current) {
          galleryRef.current.style.transform = ''
        }
        setScrollPosition(0)
        setTargetScroll(0)
        // Make all cards visible on mobile
        cardsRef.current.forEach(card => {
          if (card) card.classList.add('visible')
        })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [scrollPosition])

  // Smooth momentum scroll
  useEffect(() => {
    if (!isDesktop || !galleryRef.current) return

    const updateGalleryPosition = () => {
      const diff = targetScroll - scrollPosition
      const newVelocity = velocity + diff * 0.012
      const dampedVelocity = newVelocity * 0.88
      const newPosition = Math.max(0, Math.min(scrollPosition + dampedVelocity, maxScroll))
      
      setVelocity(dampedVelocity)
      setScrollPosition(newPosition)
      
      if (galleryRef.current) {
        galleryRef.current.style.transform = `translateX(${-newPosition}px)`
      }

      // Progress
      const progress = maxScroll > 0 ? (newPosition / maxScroll) * 100 : 0
      setScrollProgress(progress)
      if (scrollFillRef.current) {
        scrollFillRef.current.style.width = `${progress}%`
      }

      // Count
      if (cardsRef.current[0] && galleryRef.current) {
        const cardWidth = cardsRef.current[0].offsetWidth
        const gap = window.innerWidth * 0.07
        const introElement = galleryRef.current.querySelector('.gallery__intro') as HTMLElement
        const introWidth = introElement ? introElement.offsetWidth + gap : 0
        const visibleIndex = Math.floor((newPosition - introWidth + cardWidth / 2) / (cardWidth + gap))
        const displayIndex = Math.max(1, Math.min(visibleIndex + 1, works.length))
        setVisibleCardIndex(displayIndex)
        if (scrollCountRef.current) {
          scrollCountRef.current.textContent = `${String(displayIndex).padStart(2, '0')} / ${String(works.length).padStart(2, '0')}`
        }
      }

      // Hide scroll hint
      if (newPosition > 100 && scrollHintRef.current) {
        scrollHintRef.current.classList.add('hidden')
      }

      // Reveal cards
      revealCards()

      animationFrameRef.current = requestAnimationFrame(updateGalleryPosition)
    }

    updateGalleryPosition()
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isDesktop, targetScroll, scrollPosition, velocity, maxScroll])

  // Reveal cards function
  const revealCards = useCallback(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return
      const rect = card.getBoundingClientRect()
      if (rect.left < window.innerWidth * 1.3) {
        setTimeout(() => {
          card.classList.add('visible')
        }, index * 80)
      }
    })
  }, [])

  // Wheel scroll
  useEffect(() => {
    if (!isDesktop || !mainRef.current) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      setTargetScroll(prev => {
        const newTarget = prev + e.deltaY * 1.5
        return Math.max(0, Math.min(newTarget, maxScroll))
      })
    }

    mainRef.current.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      mainRef.current?.removeEventListener('wheel', handleWheel)
    }
  }, [isDesktop, maxScroll])

  // Touch scroll
  useEffect(() => {
    if (!isDesktop || !mainRef.current) return

    let touchStartX = 0
    let touchStartScroll = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartScroll = targetScroll
    }

    const handleTouchMove = (e: TouchEvent) => {
      const deltaX = touchStartX - e.touches[0].clientX
      setTargetScroll(Math.max(0, Math.min(touchStartScroll + deltaX * 2, maxScroll)))
    }

    mainRef.current.addEventListener('touchstart', handleTouchStart, { passive: true })
    mainRef.current.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      mainRef.current?.removeEventListener('touchstart', handleTouchStart)
      mainRef.current?.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isDesktop, targetScroll, maxScroll])

  // 3D Tilt Effect
  useEffect(() => {
    cardsRef.current.forEach(card => {
      if (!card) return
      const inner = card.querySelector('.card__inner') as HTMLElement
      const glare = card.querySelector('.card__glare') as HTMLElement
      if (!inner || !glare) return

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        const rotateX = (y - centerY) / 20
        const rotateY = (centerX - x) / 20
        
        inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
        
        const glareX = (x / rect.width) * 100
        const glareY = (y / rect.height) * 100
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.25) 0%, transparent 50%)`
      }

      const handleMouseLeave = () => {
        inner.style.transform = 'rotateX(0) rotateY(0) scale(1)'
      }

      card.addEventListener('mousemove', handleMouseMove)
      card.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        card.removeEventListener('mousemove', handleMouseMove)
        card.removeEventListener('mouseleave', handleMouseLeave)
      }
    })
  }, [])

  // Magnetic Effect
  useEffect(() => {
    const magneticElements = document.querySelectorAll('.magnetic')
    const cleanupFunctions: Array<() => void> = []
    
    magneticElements.forEach(el => {
      const element = el as HTMLElement
      const strength = parseFloat(element.dataset.strength || '0.2')
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        element.style.transform = `translate(${x * strength}px, ${y * strength}px)`
      }

      const handleMouseLeave = () => {
        element.style.transform = 'translate(0, 0)'
        element.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        setTimeout(() => {
          element.style.transition = ''
        }, 500)
      }

      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)
      
      cleanupFunctions.push(() => {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })
    })

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [isExhibitionOpen, currentIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExhibitionOpen) {
        if (e.key === 'Escape') {
          closeExhibition()
        }
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
          setCurrentIndex(prev => prev - 1)
        }
        if (e.key === 'ArrowRight' && currentIndex < works.length - 1) {
          setCurrentIndex(prev => prev + 1)
        }
      } else if (isDesktop) {
        if (e.key === 'ArrowRight') {
          setTargetScroll(prev => Math.min(prev + 500, maxScroll))
        }
        if (e.key === 'ArrowLeft') {
          setTargetScroll(prev => Math.max(prev - 500, 0))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isExhibitionOpen, currentIndex, isDesktop, maxScroll])

  // Touch swipe in exhibition
  useEffect(() => {
    if (!isExhibitionOpen) return

    let touchStartX = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartX - e.changedTouches[0].screenX
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex < works.length - 1) {
          setCurrentIndex(prev => prev + 1)
        } else if (diff < 0 && currentIndex > 0) {
          setCurrentIndex(prev => prev - 1)
        }
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isExhibitionOpen, currentIndex])

  const openExhibition = (index: number) => {
    setCurrentIndex(index)
    setIsExhibitionOpen(true)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }

  const closeExhibition = () => {
    setIsExhibitionOpen(false)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }

  const goToNext = () => {
    if (currentIndex < works.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }

  const currentWork = works[currentIndex]

  // Disable scroll-snap for this page
  useEffect(() => {
    if (typeof window === 'undefined') return
    document.documentElement.style.scrollSnapType = 'none'
    document.body.style.overflowY = isDesktop ? 'hidden' : 'auto'
    
    return () => {
      document.documentElement.style.scrollSnapType = ''
      document.body.style.overflowY = ''
    }
  }, [isDesktop])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="grain" aria-hidden="true"></div>
      <div className="vignette" aria-hidden="true"></div>
      <div className="scanlines" aria-hidden="true"></div>
      <div className="vhs-glitch" aria-hidden="true"></div>
      <div className="light-leak" aria-hidden="true"></div>
      <div className="light-leak-2" aria-hidden="true"></div>
      <div className="film-burn" aria-hidden="true"></div>
      
      <Header />
      
      <main ref={mainRef} className="visuals-main" id="main-content" role="main">
        <div ref={galleryRef} className="visuals-gallery" id="gallery">
          {/* Intro */}
          <div className="gallery__intro">
            <p className="gallery__label">
              <span className="gallery__label-inner">Collection</span>
            </p>
            <h1 ref={galleryTitleRef} className="gallery__title" id="galleryTitle"></h1>
            <div className="gallery__line"></div>
            <p className="gallery__desc">A curated collection of AI art, album covers, and digital experiments exploring the boundaries of synthetic creativity.</p>
            <p className="gallery__year">© 2024</p>
          </div>

          {/* Cards */}
          {works.map((work, index) => (
            <article
              key={work.catalog}
              ref={(el) => { cardsRef.current[index] = el as HTMLElement }}
              className="card"
              data-index={index}
            >
              <div className="card__inner">
                <Image
                  src={work.image}
                  alt={work.alt}
                  width={900}
                  height={1200}
                  className="card__image"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, clamp(360px, 36vw, 560px)"
                />
                <div className="card__overlay"></div>
                <div className="card__shine"></div>
                <div className="card__glare"></div>
                <div className="card__border"></div>
                <div className="card__accent"></div>
                <div className="card__content">
                  <p className="card__index">{String(index + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}</p>
                  <h2 className="card__title">{work.title}</h2>
                  <p className="card__meta">{work.year} — {work.type}</p>
                  <span className="card__btn magnetic" data-strength="0.12">
                    <span className="card__btn-text">See project</span>
                    <span className="card__btn-arrow">→</span>
                  </span>
                </div>
                <button
                  onClick={() => openExhibition(index)}
                  className="card__link"
                  aria-label={`View ${work.title}`}
                ></button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Scroll Indicator */}
      {isDesktop && (
        <div className="scroll-indicator">
          <div className="scroll-indicator__bar">
            <div ref={scrollFillRef} className="scroll-indicator__fill" id="scrollFill"></div>
          </div>
          <span ref={scrollCountRef} className="scroll-indicator__count" id="scrollCount">01 / {String(works.length).padStart(2, '0')}</span>
        </div>
      )}

      {/* Scroll Hint */}
      {isDesktop && (
        <div ref={scrollHintRef} className="scroll-hint" id="scrollHint">
          <span className="scroll-hint__line"></span>
          Scroll
        </div>
      )}

      {/* Exhibition View */}
      <div className={`exhibition ${isExhibitionOpen ? 'active' : ''}`} id="exhibition" role="dialog" aria-modal="true" aria-hidden={!isExhibitionOpen}>
        <button
          className="exhibition__close magnetic"
          data-strength="0.25"
          onClick={closeExhibition}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="exhibition__image-panel">
          <div className="exhibition__image-wrap">
            {currentWork && (
              <>
                <Image
                  src={currentWork.image}
                  alt={currentWork.alt}
                  width={1400}
                  height={1400}
                  className="exhibition__image"
                  id="exhibitionImage"
                  quality={95}
                  priority
                />
                <span className="exhibition__counter" id="exhibitionCounter">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="exhibition__details">
          <div className="exhibition__scroll">
            <div className="exhibition__content">
              {currentWork && (
                <>
                  <div className="exhibition__catalog">
                    <span id="exhibitionCatalog">{currentWork.catalog}</span>
                  </div>

                  <h2 className="exhibition__title" id="exhibitionTitle">{currentWork.title}</h2>
                  <p className="exhibition__subtitle" id="exhibitionSubtitle">{currentWork.year} — {currentWork.type}</p>
                  
                  <div className="exhibition__divider"></div>

                  <div className="exhibition__meta">
                    <div className="exhibition__field">
                      <span className="exhibition__label">Medium</span>
                      <span className="exhibition__value" id="exhibitionMedium">{currentWork.medium}</span>
                    </div>
                    <div className="exhibition__field">
                      <span className="exhibition__label">Dimensions</span>
                      <span className="exhibition__value" id="exhibitionDimensions">{currentWork.dimensions}</span>
                    </div>
                    <div className="exhibition__field">
                      <span className="exhibition__label">Support</span>
                      <span className="exhibition__value" id="exhibitionSupport">{currentWork.support}</span>
                    </div>
                    <div className="exhibition__field">
                      <span className="exhibition__label">Edition</span>
                      <span className="exhibition__value" id="exhibitionEdition">{currentWork.edition}</span>
                    </div>
                    <div className="exhibition__field exhibition__field--full">
                      <span className="exhibition__label">Series</span>
                      <span className="exhibition__value" id="exhibitionSeries">{currentWork.series}</span>
                    </div>
                  </div>

                  <div className="exhibition__note">
                    <p className="exhibition__note-label">Curatorial Note</p>
                    <p className="exhibition__note-text" id="exhibitionNote">{currentWork.note}</p>
                  </div>

                  <div className="exhibition__footer">
                    <div className="exhibition__footer-item">
                      Provenance
                      <span id="exhibitionProvenance">{currentWork.provenance}</span>
                    </div>
                    <div className="exhibition__footer-item">
                      Status
                      <span id="exhibitionStatus">{currentWork.status}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <nav className="exhibition__nav">
            <button
              className="exhibition__nav-btn"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
            >
              <span><span className="arrow arrow-left">←</span> Previous</span>
            </button>
            <button
              className="exhibition__nav-btn"
              onClick={closeExhibition}
            >
              <span>Back to Gallery</span>
            </button>
            <button
              className="exhibition__nav-btn"
              onClick={goToNext}
              disabled={currentIndex === works.length - 1}
            >
              <span>Next <span className="arrow arrow-right">→</span></span>
            </button>
          </nav>
        </div>
      </div>
    </>
  )
}


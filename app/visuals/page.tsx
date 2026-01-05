'use client'

import { useEffect, useRef, useState } from 'react'
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

// Shuffle array function for randomizing order
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const worksData: Work[] = [
  {
    title: 'Astralis',
    year: '2024',
    type: 'Album Cover',
    catalog: 'RM-AS-24-001',
    image: '/images/visuals/album-covers/Astralis_Cover.webp',
    alt: 'Square cover art showing fiery red-orange clouds against a black void with teal speckles on the left, grainy distressed texture, and the text "ASTRALIS" plus a parental advisory label.',
    medium: 'Digital composition + grain texture + typography',
    dimensions: '3000 × 3000 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Commercial license',
    series: 'Music & Identity',
    note: 'A dense red-orange cloud mass blooms out of a near-black field, with a vertical pocket of teal speckling along the left side. Soft, smoky transitions and rim-lit highlights shape the clouds, while a visible grain and faint scratch texture gives the surface a worn, film-like finish. Minimal typography sits low and wide, and stamped text elements add a packaged, explicit-release feel rather than a narrative caption.',
    provenance: 'Client commission, 2024',
    status: 'Licensed'
  },
  {
    title: 'Astro',
    year: '2024',
    type: 'Album Cover',
    catalog: 'RM-AO-24-002',
    image: '/images/visuals/album-covers/Astro.webp',
    alt: 'Cover art with the word "ASTRO" above a grainy, green-speckled close-up of an astronaut helmet and a shadowed face lit by red-orange light; Parental Advisory label at bottom left.',
    medium: 'Digital composition + photography + grain texture + typography',
    dimensions: '3000 × 3000 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Commercial license',
    series: 'Music & Identity',
    note: 'A close-up astronaut helmet dominates the frame, the visor swallowing most of the face in shadow while a red-orange glow cuts across the cheeks and nose. The suit reads in muted olive and steel tones, with a ribbed hose and hardware details giving the image a utilitarian, retro-space feel. The portrait sits inside a rounded-square window on a clean white field, while green speckling and heavy grain add a distressed, printed texture. Minimal typography ("ASTRO") and a Parental Advisory badge push it firmly into cover-art language—part cinematic still, part designed object.',
    provenance: 'Client commission, 2024',
    status: 'Licensed'
  },
  {
    title: 'Gaze',
    year: '2024',
    type: 'Album Cover',
    catalog: 'RM-GZ-24-003',
    image: '/images/visuals/album-covers/Gaze.webp',
    alt: 'Square cover art showing a heavily textured, saturated close-up of a human eye with a neon-green iris and red-orange skin tones; Parental Advisory label in the top-right.',
    medium: 'Digital composition + photography + grain texture + typography',
    dimensions: '3000 × 3000 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Commercial license',
    series: 'Music & Identity',
    note: 'A single eye is cropped to fill the square, turning skin, lash line, and iris into a hard-edged landscape of color. The iris reads as neon green with darker ringed structure, set against a cooler cyan white and surrounded by saturated red-orange tones that deepen into near-black shadow at the lid. A dense crosshatched grain and scattered speckling sit over the entire image, giving it the look of a distressed scan or printed fabric rather than a clean photo. The "Parental Advisory: Explicit Content" mark in the top-right completes the packaging language and heightens the sense of intensity and surveillance.',
    provenance: 'Client commission, 2024',
    status: 'Licensed'
  },
  {
    title: 'Dungeon Master\'s Torch',
    year: '2024',
    type: 'AI Poster Concept',
    catalog: 'RM-VC-24-001',
    image: '/images/visuals/visual-concepts/D&D_world.webp',
    alt: 'AI poster concept showing a party advancing through blue vapor led by a torch, with colossal reptilian heads emerging in a staggered procession, warm orange light falling into cool cyan.',
    medium: 'AI-generated image; AI-assisted concept poster',
    dimensions: '—',
    support: '—',
    edition: '—',
    series: 'Visual Concepts',
    note: 'A party advances through blue vapor, led by a single torch whose heat defines the entire scene. Its light rakes across stone and grit, revealing colossal reptilian heads emerging in a staggered procession—snouts, teeth, and ridged brows repeating with a measured cadence. The figures remain mostly in silhouette, compact and forward-leaning, their scale calibrated against the torch\'s small, unwavering flame. Warm orange falls into cool cyan with abrupt edges, so the image reads as a sequence of visibility: what the fire touches becomes real; what it doesn\'t recedes into atmosphere. The composition keeps the upper field spare, letting fog operate like a moving curtain over the creatures\' faces. Held at human height, the torch becomes a tool of agency—light as rule-set, peril as what waits just beyond its reach.',
    provenance: 'Personal exploration, 2024',
    status: 'Concept'
  },
  {
    title: 'Desert Eclipse',
    year: '2024',
    type: 'AI Poster Concept',
    catalog: 'RM-VC-24-002',
    image: '/images/visuals/visual-concepts/Dune_poster_concept.webp',
    alt: 'AI poster concept showing three figures cresting a dune ridge under an eclipsed sun, with a serpentine surge gathering behind them in amber light and blue-green shadow.',
    medium: 'AI-generated image; AI-assisted concept poster',
    dimensions: '—',
    support: '—',
    edition: '—',
    series: 'Visual Concepts',
    note: 'Under an eclipsed sun, three figures crest a dune ridge, their silhouettes held against wind-driven dust. A dense field of amber light meets a cooler blue-green shadow, giving the scene a split atmosphere—heat at the horizon, night in the foreground. The eclipse functions as a hard graphic anchor, while the ridge line carries the eye on a single, rising diagonal. Behind the figures, a towering serpentine surge gathers from sand and haze, its contour reading as a geological force before it resolves as a creature. Fine striations and soft drift lines across the dunes establish scale without detail overload, keeping the human forms legible at distance. The image holds tension through restraint: minimal landmarks, a distant settlement swallowed by air, and a landscape that never fully settles. It frames endurance as an act of navigation across shifting ground.',
    provenance: 'Personal exploration, 2024',
    status: 'Concept'
  },
  {
    title: 'Storm Rift',
    year: '2024',
    type: 'AI Poster Concept',
    catalog: 'RM-VC-24-003',
    image: '/images/visuals/visual-concepts/Oddisey_poster_concept.webp',
    alt: 'AI poster concept showing a lone figure standing on wet black rock with a staff, back turned, as rain slants through the frame and a storm mass opens into a bright rift above the sea.',
    medium: 'AI-generated image; AI-assisted concept poster',
    dimensions: '—',
    support: '—',
    edition: '—',
    series: 'Visual Concepts',
    note: 'A lone figure stands on wet black rock, back turned, a long staff held upright as rain slants through the frame. The sea breaks hard at the shoreline, throwing white spray that catches stray embers of warm light. Farther out, a small sailboat rides the chop, reduced to a dark silhouette against mist. Above, the sky becomes the image\'s engine: a dense, rotating storm mass opens into a bright rift, sending angled shafts down to the water like a seam cut through cloud. Armor plates take the glancing illumination while a torn cloak streams and frays, echoing the sea\'s turbulence. The palette stays in slate, iron, and smoke, with the rupture\'s pale gold acting as the only certainty. The scene fixes the journey at its threshold—weather as antagonist, light as direction.',
    provenance: 'Personal exploration, 2024',
    status: 'Concept'
  }
]

// Randomize the order of works on each page load
const works = shuffleArray(worksData)

export default function VisualsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExhibitionOpen, setIsExhibitionOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

  const cardRef = useRef<HTMLDivElement>(null)

  const goToPrevious = () => {
    if (isAnimating || currentIndex === 0) return
    setIsAnimating(true)
    setDirection('left')
    setCurrentIndex(prev => prev - 1)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const goToNext = () => {
    if (isAnimating || currentIndex === works.length - 1) return
    setIsAnimating(true)
    setDirection('right')
    setCurrentIndex(prev => prev + 1)
    setTimeout(() => setIsAnimating(false), 800)
  }

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

  const currentWork = works[currentIndex]

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
      } else {
        // Navigate cards on main page
        if (e.key === 'ArrowLeft') {
          e.preventDefault()
          goToPrevious()
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault()
          goToNext()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isExhibitionOpen, currentIndex, isAnimating])

  // Touch swipe
  useEffect(() => {
    if (isExhibitionOpen) return

    let touchStartX = 0
    let touchStartTime = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartTime = Date.now()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX
      const touchEndTime = Date.now()
      const diffX = touchStartX - touchEndX
      const diffTime = touchEndTime - touchStartTime

      if (diffTime < 300 && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          goToNext()
        } else {
          goToPrevious()
        }
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentIndex, isAnimating])

  // Disable scroll-snap for this page
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
      <div className="vignette" aria-hidden="true"></div>
      <div className="scanlines" aria-hidden="true"></div>
      <div className="vhs-glitch" aria-hidden="true"></div>
      <div className="light-leak" aria-hidden="true"></div>
      <div className="light-leak-2" aria-hidden="true"></div>
      <div className="film-burn" aria-hidden="true"></div>
      
      <Header />
      
      <main className="visuals-main" id="main-content" role="main">
        <div className="visuals-container">
          {/* Fixed Intro Section */}
          <div className="visuals-intro">
            <p className="visuals-label">
              <span className="visuals-label-line"></span>
              Collection
            </p>
            <h1 className="visuals-title">Visuals</h1>
            <div className="visuals-divider"></div>
            <p className="visuals-description">
              A curated collection of AI art, album covers, visual concepts, and digital experiments exploring the boundaries of synthetic creativity.
            </p>
            <p className="visuals-year">© 2024</p>
          </div>

          {/* Card Display with Navigation */}
          <div className="visuals-card-display">
            <div className="visuals-card-container">
              <div 
                ref={cardRef}
                key={currentIndex}
                className={`visuals-card-slide ${direction === 'right' ? 'slide-in-right' : 'slide-in-left'}`}
              >
            <article
                  className="visuals-card"
                  onClick={() => openExhibition(currentIndex)}
                >
                  <div className="visuals-card__image-wrapper">
                <Image
                      src={imageErrors.has(currentWork.catalog) ? '/images/placeholders/image-placeholder.webp' : currentWork.image}
                      alt={currentWork.alt}
                      fill
                      className="visuals-card__image"
                      priority
                  quality={85}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                  onError={() => {
                        setImageErrors(prev => new Set(prev).add(currentWork.catalog))
                      }}
                    />
                    <div className="visuals-card__overlay">
                      <div className="visuals-card__content">
                        <p className="visuals-card__index">
                          {String(currentIndex + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
                        </p>
                        <h2 className="visuals-card__title">{currentWork.title}</h2>
                        <p className="visuals-card__meta">{currentWork.year} — {currentWork.type}</p>
                        <span className="visuals-card__btn">
                          See project <span>→</span>
                  </span>
                </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              className="visuals-nav-btn visuals-nav-btn--prev"
              onClick={goToPrevious}
              disabled={currentIndex === 0 || isAnimating}
              aria-label="Previous project"
            >
              <span className="visuals-nav-arrow">←</span>
            </button>
            <button
              className="visuals-nav-btn visuals-nav-btn--next"
              onClick={goToNext}
              disabled={currentIndex === works.length - 1 || isAnimating}
              aria-label="Next project"
            >
              <span className="visuals-nav-arrow">→</span>
            </button>

            {/* Dots Indicator */}
            <div className="visuals-dots">
              {works.map((_, index) => (
                <button
                  key={index}
                  className={`visuals-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => {
                    if (index !== currentIndex && !isAnimating) {
                      setDirection(index > currentIndex ? 'right' : 'left')
                      setIsAnimating(true)
                      setCurrentIndex(index)
                      setTimeout(() => setIsAnimating(false), 800)
                    }
                  }}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
              </div>
        </div>
      </main>

      {/* Exhibition View */}
      <div className={`exhibition ${isExhibitionOpen ? 'active' : ''}`} id="exhibition" role="dialog" aria-modal="true" aria-hidden={!isExhibitionOpen}>
        <button
          className="exhibition__close"
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
                  key={currentWork.catalog}
                  src={imageErrors.has(currentWork.catalog) ? '/images/placeholders/image-placeholder.webp' : currentWork.image}
                  alt={currentWork.alt}
                  width={1400}
                  height={1400}
                  className="exhibition__image"
                  quality={90}
                  priority
                  style={{ objectFit: 'contain' }}
                  onError={() => {
                    setImageErrors(prev => new Set(prev).add(currentWork.catalog))
                  }}
                />
                <span className="exhibition__counter">
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
                    <span>{currentWork.catalog}</span>
                  </div>

                  <h2 className="exhibition__title">{currentWork.title}</h2>
                  <p className="exhibition__subtitle">{currentWork.year} — {currentWork.type}</p>
                  
                  <div className="exhibition__divider"></div>

                  <div className="exhibition__meta">
                    <div className="exhibition__field">
                      <span className="exhibition__label">Medium</span>
                      <span className="exhibition__value">{currentWork.medium}</span>
                    </div>
                    <div className="exhibition__field">
                      <span className="exhibition__label">Dimensions</span>
                      <span className="exhibition__value">{currentWork.dimensions}</span>
                    </div>
                    <div className="exhibition__field">
                      <span className="exhibition__label">Support</span>
                      <span className="exhibition__value">{currentWork.support}</span>
                    </div>
                    <div className="exhibition__field">
                      <span className="exhibition__label">Edition</span>
                      <span className="exhibition__value">{currentWork.edition}</span>
                    </div>
                    <div className="exhibition__field exhibition__field--full">
                      <span className="exhibition__label">Series</span>
                      <span className="exhibition__value">{currentWork.series}</span>
                    </div>
                  </div>

                  <div className="exhibition__note">
                    <p className="exhibition__note-label">Curatorial Note</p>
                    <p className="exhibition__note-text">{currentWork.note}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <nav className="exhibition__nav">
            <button
              className="exhibition__nav-btn"
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex(prev => prev - 1)
                }
              }}
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
              onClick={() => {
                if (currentIndex < works.length - 1) {
                  setCurrentIndex(prev => prev + 1)
                }
              }}
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

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { trapFocus } from '@/lib/accessibility'
import styles from './VisualsPage.module.css'

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
    dimensions: '3840 × 2160 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Unique concept',
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
    dimensions: '3840 × 2160 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Unique concept',
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
    dimensions: '3840 × 2160 px',
    support: 'Digital file, print-ready at 300dpi',
    edition: 'Unique concept',
    series: 'Visual Concepts',
    note: 'A lone figure stands on wet black rock, back turned, a long staff held upright as rain slants through the frame. The sea breaks hard at the shoreline, throwing white spray that catches stray embers of warm light. Farther out, a small sailboat rides the chop, reduced to a dark silhouette against mist. Above, the sky becomes the image\'s engine: a dense, rotating storm mass opens into a bright rift, sending angled shafts down to the water like a seam cut through cloud. Armor plates take the glancing illumination while a torn cloak streams and frays, echoing the sea\'s turbulence. The palette stays in slate, iron, and smoke, with the rupture\'s pale gold acting as the only certainty. The scene fixes the journey at its threshold—weather as antagonist, light as direction.',
    provenance: 'Personal exploration, 2024',
    status: 'Concept'
  }
]

const works = worksData

export default function VisualsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isExhibitionOpen, setIsExhibitionOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const [isMobile, setIsMobile] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)
  const scrollLockRef = useRef<{ scrollY: number; bodyOverflow: string; bodyPosition: string; bodyTop: string; bodyWidth: string; htmlOverflow: string } | null>(null)
  const swipeStateRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    locked: false,
  })
  const suppressCardClickRef = useRef(false)

  // Detect mobile device for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    // No resize listener - check only on mount to avoid unnecessary re-renders
  }, [])

  const cardRef = useRef<HTMLDivElement>(null)

  const goToPrevious = useCallback(() => {
    if (isAnimating || currentIndex === 0) return
    setIsAnimating(true)
    setDirection('left')
    setCurrentIndex(prev => prev - 1)
    setTimeout(() => setIsAnimating(false), 400)
  }, [currentIndex, isAnimating])

  const goToNext = useCallback(() => {
    if (isAnimating || currentIndex === works.length - 1) return
    setIsAnimating(true)
    setDirection('right')
    setCurrentIndex(prev => prev + 1)
    setTimeout(() => setIsAnimating(false), 400)
  }, [currentIndex, isAnimating])

  const openExhibition = (index: number, trigger?: HTMLElement | null) => {
    lastTriggerRef.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null)
    setCurrentIndex(index)
    setIsExhibitionOpen(true)
  }

  const closeExhibition = useCallback((restoreFocus = true) => {
    setIsExhibitionOpen(false)
    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        lastTriggerRef.current?.focus()
      })
    }
  }, [])

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
  }, [closeExhibition, currentIndex, goToNext, goToPrevious, isAnimating, isExhibitionOpen])

  useEffect(() => {
    if (!isExhibitionOpen || !dialogRef.current) return

    const cleanupFocusTrap = trapFocus(dialogRef.current)
    const { body, documentElement } = document
    const scrollY = window.scrollY

    scrollLockRef.current = {
      scrollY,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      htmlOverflow: documentElement.style.overflow,
    }

    documentElement.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'

    return () => {
      cleanupFocusTrap()

      if (scrollLockRef.current) {
        const lock = scrollLockRef.current
        documentElement.style.overflow = lock.htmlOverflow
        body.style.overflow = lock.bodyOverflow
        body.style.position = lock.bodyPosition
        body.style.top = lock.bodyTop
        body.style.width = lock.bodyWidth
        window.scrollTo({ top: lock.scrollY, behavior: 'auto' })
      }
    }
  }, [isExhibitionOpen])

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

  const isInteractiveTarget = (target: EventTarget | null) => {
    return target instanceof Element && Boolean(target.closest('a, button, input, textarea, select, [role="button"]'))
  }

  const resetSwipeState = () => {
    swipeStateRef.current = {
      active: false,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      locked: false,
    }
  }

  const handleSwipeStart = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isExhibitionOpen || event.pointerType !== 'touch' || !event.isPrimary || isInteractiveTarget(event.target)) {
      return
    }

    suppressCardClickRef.current = false
    swipeStateRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      locked: false,
    }
  }

  const handleSwipeMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = swipeStateRef.current
    if (!state.active) return

    state.lastX = event.clientX
    state.lastY = event.clientY

    const dx = state.lastX - state.startX
    const dy = state.lastY - state.startY
    const absX = Math.abs(dx)
    const absY = Math.abs(dy)

    if (!state.locked) {
      if (absX < 12 && absY < 12) return

      const hasClearHorizontalIntent =
        absX >= 28 &&
        absX > absY * 1.75 &&
        absY <= 28

      if (hasClearHorizontalIntent) {
        state.locked = true
        suppressCardClickRef.current = true
        return
      }

      if (absY >= 18 && absY >= absX * 0.85) {
        resetSwipeState()
      }
    }
  }

  const handleSwipeEnd = () => {
    const state = swipeStateRef.current
    if (!state.active) return

    if (state.locked) {
      const dx = state.lastX - state.startX
      if (Math.abs(dx) >= 56) {
        suppressCardClickRef.current = true
        if (dx < 0) {
          goToNext()
        } else {
          goToPrevious()
        }
        window.setTimeout(() => {
          suppressCardClickRef.current = false
        }, 0)
      } else {
        suppressCardClickRef.current = false
      }
    }

    resetSwipeState()
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {/* Decorative elements - disabled on mobile for performance */}
      <div className={styles.grain} aria-hidden="true"></div>
      {!isMobile && (
        <>
          <div className={styles.vignette} aria-hidden="true"></div>
          <div className={styles.scanlines} aria-hidden="true"></div>
          <div className={styles.vhsGlitch} aria-hidden="true"></div>
          <div className={styles.lightLeak} aria-hidden="true"></div>
          <div className={styles.lightLeakTwo} aria-hidden="true"></div>
          <div className={styles.filmBurn} aria-hidden="true"></div>
        </>
      )}

      <Header />
      
      <main className={styles.main} id="main-content" role="main" data-mobile-audit="visuals-page">
        <div className={styles.container}>
          {/* Fixed Intro Section */}
          <div className={styles.intro}>
            <p className={styles.label}>
              <span className={styles.labelLine}></span>
              Collection
            </p>
            <h1 className={styles.title}>Visuals</h1>
            <div className={styles.divider}></div>
            <p className={styles.description}>
              A curated collection of AI art, album covers, visual concepts, and digital experiments exploring the boundaries of synthetic creativity.
            </p>
            <p className={styles.year}>© 2024</p>
          </div>

          {/* Card Display with Navigation */}
          <div
            className={styles.cardDisplay}
            data-mobile-audit="visuals-surface"
            onPointerDown={handleSwipeStart}
            onPointerMove={handleSwipeMove}
            onPointerUp={handleSwipeEnd}
            onPointerCancel={handleSwipeEnd}
          >
            <div className={styles.cardContainer}>
              <div 
                ref={cardRef}
                key={currentIndex}
                className={`${styles.cardSlide} ${direction === 'right' ? styles.slideInRight : styles.slideInLeft}`}
              >
                <article
                  className={styles.card}
                  data-mobile-audit="visual-card"
                  onClick={(event) => {
                    if (suppressCardClickRef.current) {
                      suppressCardClickRef.current = false
                      return
                    }
                    openExhibition(currentIndex, event.currentTarget)
                  }}
                >
                  <div className={styles.cardImageWrapper}>
                    <Image
                      src={imageErrors.has(currentWork.catalog) ? '/images/placeholders/image-placeholder.webp' : currentWork.image}
                      alt={currentWork.alt}
                      fill
                      className={styles.cardImage}
                      priority
                      quality={85}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                      onError={() => {
                        setImageErrors(prev => new Set(prev).add(currentWork.catalog))
                      }}
                    />
                    <div className={styles.cardOverlay}>
                      <div className={styles.cardContent}>
                        <p className={styles.cardIndex}>
                          {String(currentIndex + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
                        </p>
                        <h2 className={styles.cardTitle}>{currentWork.title}</h2>
                        <p className={styles.cardMeta}>{currentWork.year} — {currentWork.type}</p>
                        <span className={styles.cardButton}>
                          <span>See project</span>
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              className={`${styles.navButton} ${styles.navButtonPrev}`}
              onClick={goToPrevious}
              disabled={currentIndex === 0 || isAnimating}
              aria-label="Previous project"
            >
              <span className={styles.navArrow}>←</span>
            </button>
            <button
              type="button"
              className={`${styles.navButton} ${styles.navButtonNext}`}
              onClick={goToNext}
              disabled={currentIndex === works.length - 1 || isAnimating}
              aria-label="Next project"
            >
              <span className={styles.navArrow}>→</span>
            </button>

            </div>
        </div>
      </main>

      <Footer />

      {/* Exhibition View */}
      {isExhibitionOpen ? (
        <div
          ref={dialogRef}
          className={`${styles.exhibition} ${styles.exhibitionActive}`}
          id="exhibition"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exhibition-title"
        >
          <button
            type="button"
            className={styles.exhibitionClose}
            onClick={() => closeExhibition()}
            aria-label="Close exhibition"
          >
            ✕
          </button>

          <div className={styles.exhibitionImagePanel}>
            <div className={styles.exhibitionImageWrap}>
              {currentWork && (
                <>
                  <Image
                    key={currentWork.catalog}
                    src={imageErrors.has(currentWork.catalog) ? '/images/placeholders/image-placeholder.webp' : currentWork.image}
                    alt={currentWork.alt}
                    width={1400}
                    height={1400}
                    className={styles.exhibitionImage}
                    quality={90}
                    priority
                    style={{ objectFit: 'contain' }}
                    onError={() => {
                      setImageErrors(prev => new Set(prev).add(currentWork.catalog))
                    }}
                  />
                  <span className={styles.exhibitionCounter}>
                    {String(currentIndex + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className={styles.exhibitionDetails}>
            <div className={styles.exhibitionScroll} data-mobile-audit="visuals-exhibition-scroll">
              <div className={styles.exhibitionContent}>
                {currentWork && (
                  <>
                    <div className={styles.exhibitionCatalog}>
                      <span>{currentWork.catalog}</span>
                    </div>

                    <h2 id="exhibition-title" className={styles.exhibitionTitle}>{currentWork.title}</h2>
                    <p className={styles.exhibitionSubtitle}>{currentWork.year} — {currentWork.type}</p>
                    
                    <div className={styles.exhibitionDivider}></div>

                    <div className={styles.exhibitionMeta}>
                      <div className={styles.exhibitionField}>
                        <span className={styles.exhibitionLabel}>Medium</span>
                        <span className={styles.exhibitionValue}>{currentWork.medium}</span>
                      </div>
                      <div className={styles.exhibitionField}>
                        <span className={styles.exhibitionLabel}>Dimensions</span>
                        <span className={styles.exhibitionValue}>{currentWork.dimensions}</span>
                      </div>
                      <div className={styles.exhibitionField}>
                        <span className={styles.exhibitionLabel}>Support</span>
                        <span className={styles.exhibitionValue}>{currentWork.support}</span>
                      </div>
                      <div className={styles.exhibitionField}>
                        <span className={styles.exhibitionLabel}>Edition</span>
                        <span className={styles.exhibitionValue}>{currentWork.edition}</span>
                      </div>
                      <div className={`${styles.exhibitionField} ${styles.exhibitionFieldFull}`}>
                        <span className={styles.exhibitionLabel}>Series</span>
                        <span className={styles.exhibitionValue}>{currentWork.series}</span>
                      </div>
                    </div>

                    <div className={styles.exhibitionNote}>
                      <p className={styles.exhibitionNoteLabel}>Curatorial Note</p>
                      <p className={styles.exhibitionNoteText}>{currentWork.note}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <nav className={styles.exhibitionNav}>
              <button
                type="button"
                className={styles.exhibitionNavButton}
                onClick={() => {
                  if (currentIndex > 0) {
                    setCurrentIndex(prev => prev - 1)
                  }
                }}
                disabled={currentIndex === 0}
              >
                <span><span aria-hidden="true">←</span> Previous</span>
              </button>
              <button
                type="button"
                className={styles.exhibitionNavButton}
                onClick={() => closeExhibition()}
              >
                <span>Back to Gallery</span>
              </button>
              <button
                type="button"
                className={styles.exhibitionNavButton}
                onClick={() => {
                  if (currentIndex < works.length - 1) {
                    setCurrentIndex(prev => prev + 1)
                  }
                }}
                disabled={currentIndex === works.length - 1}
              >
                <span>Next <span aria-hidden="true">→</span></span>
              </button>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  )
}

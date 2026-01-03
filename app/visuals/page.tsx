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
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())

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
                  src={imageErrors.has(work.catalog) ? '/images/placeholders/image-placeholder.webp' : work.image}
                  alt={work.alt}
                  width={900}
                  height={1200}
                  className="card__image"
                  priority={index <= 1}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, clamp(360px, 36vw, 560px)"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  onError={() => {
                    setImageErrors(prev => new Set(prev).add(work.catalog))
                  }}
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
                  src={imageErrors.has(currentWork.catalog) ? '/images/placeholders/image-placeholder.webp' : currentWork.image}
                  alt={currentWork.alt}
                  width={1400}
                  height={1400}
                  className="exhibition__image"
                  id="exhibitionImage"
                  quality={95}
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  onError={() => {
                    setImageErrors(prev => new Set(prev).add(currentWork.catalog))
                  }}
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


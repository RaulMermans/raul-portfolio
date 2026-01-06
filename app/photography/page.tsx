'use client'

import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'

// ========================================
// PHOTO DATA STRUCTURE
// ========================================
// Add your photos here! Each photo needs:
// - src: image path (from /public/images/photography/[category]/)
// - alt: description for accessibility
// - category: 'landscape', 'architecture', or 'street'
//
// RANDOM SELECTION:
// - You can add more than 12 images per category
// - The system will randomly select 12 images on each visit
// - Selection is consistent during the session (stored in sessionStorage)
// ========================================

interface Photo {
  src: string
  alt: string
  category: 'landscape' | 'architecture' | 'street'
}

// Helper function to shuffle array and select random items
function shuffleAndSelect<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Helper function to get or create random selection (persisted per session)
function getRandomSelection<T>(key: string, allItems: T[], count: number): T[] {
  if (typeof window === 'undefined') {
    // Server-side: return first N items
    return allItems.slice(0, count)
  }

  // Check sessionStorage for existing selection
  const stored = sessionStorage.getItem(`photo-selection-${key}`)
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      // Validate that stored selection still exists in allItems
      const validSelection = parsed.filter((item: T) => 
        allItems.some(ai => JSON.stringify(ai) === JSON.stringify(item))
      )
      if (validSelection.length === count) {
        return validSelection
      }
    } catch (e) {
      // Invalid stored data, continue to generate new
    }
  }

  // Generate new random selection
  const selection = shuffleAndSelect(allItems, count)
  sessionStorage.setItem(`photo-selection-${key}`, JSON.stringify(selection))
  return selection
}

// ALL AVAILABLE IMAGES
// Automatically includes all uploaded images in each category
// The system will randomly select 12 images from the available pool
const allAvailableImages = {
  landscape: Array.from({ length: 15 }, (_, i) => ({
    src: `/images/photography/landscape/Landscape${i + 1}.webp`,
    alt: `Landscape photography ${i + 1}`,
    category: 'landscape' as const,
  })),
  architecture: Array.from({ length: 13 }, (_, i) => ({
    src: `/images/photography/architecture/Arquitecture${i + 1}.webp`,
    alt: `Architecture photography ${i + 1}`,
    category: 'architecture' as const,
  })),
  street: Array.from({ length: 18 }, (_, i) => ({
    src: `/images/photography/street/Street${i + 1}.webp`,
    alt: `Street photography ${i + 1}`,
    category: 'street' as const,
  })),
}

// Number of images to display per category
const IMAGES_PER_CATEGORY = 12

// Generate categories with random selection (consistent per session)
function getCategories() {
  return {
    landscape: {
      name: 'Landscape',
      count: IMAGES_PER_CATEGORY,
      images: getRandomSelection('landscape', allAvailableImages.landscape, IMAGES_PER_CATEGORY),
    },
    architecture: {
      name: 'Architecture',
      count: IMAGES_PER_CATEGORY,
      images: getRandomSelection('architecture', allAvailableImages.architecture, IMAGES_PER_CATEGORY),
    },
    street: {
      name: 'Street',
      count: IMAGES_PER_CATEGORY,
      images: getRandomSelection('street', allAvailableImages.street, IMAGES_PER_CATEGORY),
    },
  }
}

export default function PhotographyPage() {
  // Get categories with random selection (consistent per session)
  const [categoriesState] = useState(() => getCategories())
  
  // Combine all images in the scattered order: landscape (1-12), architecture (13-24), street (25-36)
  const allImages: Photo[] = [
    ...categoriesState.landscape.images,
    ...categoriesState.architecture.images,
    ...categoriesState.street.images,
  ]

  const [activeCategory, setActiveCategory] = useState<'landscape' | 'architecture' | 'street'>('landscape')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxCategory, setLightboxCategory] = useState<'landscape' | 'architecture' | 'street'>('landscape')
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Memoize current category images to prevent unnecessary recalculations
  const currentCategoryImages = useMemo(
    () => categoriesState[lightboxCategory]?.images || [],
    [categoriesState, lightboxCategory]
  )
  const activeCount = categoriesState[activeCategory]?.count || 0

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') {
          setLightboxOpen(false)
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev - 1 + currentCategoryImages.length) % currentCategoryImages.length)
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev + 1) % currentCategoryImages.length)
        }
      } else {
        // Horizontal scroll with arrow keys when lightbox is closed
        const gallery = document.getElementById('main-content')
        if (!gallery) return
        
        if (e.key === 'ArrowRight') {
          gallery.scrollBy({ left: 300, behavior: 'smooth' })
        } else if (e.key === 'ArrowLeft') {
          gallery.scrollBy({ left: -300, behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, currentCategoryImages.length])

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  // Smooth horizontal scroll on wheel with improved performance (desktop only)
  // Optimized with refs to prevent closure issues and improve performance
  const wheelHandlerRef = useRef<((e: WheelEvent) => void) | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const scrollTargetRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(performance.now())

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Skip on mobile - use native touch scrolling
    const isMobile = window.innerWidth <= 768
    if (isMobile) return
    
    const gallery = document.getElementById('main-content')
    if (!gallery) return

    scrollTargetRef.current = gallery.scrollLeft

    const smoothScroll = (currentTime: number) => {
      const deltaTime = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime
      
      const current = gallery.scrollLeft
      const diff = scrollTargetRef.current - current
      
      if (Math.abs(diff) > 0.5) {
        // Use time-based easing for consistent speed
        const easing = Math.min(0.2 * (deltaTime / 16), 0.3) // Normalize to 60fps
        gallery.scrollLeft += diff * easing
        rafIdRef.current = requestAnimationFrame(smoothScroll)
      } else {
        gallery.scrollLeft = scrollTargetRef.current
        rafIdRef.current = null
      }
    }

    // Throttled wheel handler for better performance
    wheelHandlerRef.current = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        
        // Update target scroll position with momentum
        const scrollAmount = e.deltaY * 1.5
        scrollTargetRef.current = Math.max(0, Math.min(
          gallery.scrollWidth - gallery.clientWidth,
          scrollTargetRef.current + scrollAmount
        ))
        
        // Start smooth scroll if not already running
        if (rafIdRef.current === null) {
          lastTimeRef.current = performance.now()
          rafIdRef.current = requestAnimationFrame(smoothScroll)
        }
      }
    }

    const handleWheel = wheelHandlerRef.current
    gallery.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      gallery.removeEventListener('wheel', handleWheel)
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
    }
  }, [])

  // Set overflow hidden on mount for horizontal scroll
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Disable scroll-snap for normal scrolling
    document.documentElement.style.scrollSnapType = 'none'
    document.body.style.overflowY = 'auto'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      document.documentElement.style.scrollSnapType = ''
      document.body.style.overflowY = ''
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  const openLightbox = (imgElement: HTMLImageElement, category: 'landscape' | 'architecture' | 'street') => {
    setLightboxCategory(category)
    const categoryImages = categoriesState[category]?.images || []
    // Find index by comparing src paths (handle both relative and absolute paths)
    const imgSrc = imgElement.src.includes(imgElement.src.split('/').pop() || '') 
      ? imgElement.src 
      : imgElement.getAttribute('src') || imgElement.src
    const index = categoryImages.findIndex((img) => {
      const imgPath = img.src.startsWith('/') ? img.src : `/${img.src}`
      return imgElement.src.includes(imgPath) || imgElement.src.endsWith(imgPath) || imgPath === imgSrc
    })
    setLightboxIndex(index >= 0 ? index : 0)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToImage = (index: number) => {
    setLightboxIndex(index)
  }

  const showPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + currentCategoryImages.length) % currentCategoryImages.length)
  }

  const showNext = () => {
    setLightboxIndex((prev) => (prev + 1) % currentCategoryImages.length)
  }

  // Touch handlers for swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      showNext()
    }
    if (isRightSwipe) {
      showPrev()
    }
  }

  // Memoize category setter to prevent unnecessary re-renders
  const setCategory = useCallback((category: 'landscape' | 'architecture' | 'street') => {
    setActiveCategory(category)
  }, [])

  return (
    <>
      <div className="grain" aria-hidden="true"></div>

      <Header />

      {/* Gallery */}
      <main id="main-content" role="main" className="gallery">
        <div className="gallery__track">
          <div className="gallery__grid">
            {allImages.map((photo, index) => {
              const isActive = photo.category === activeCategory
              const categoryImages = categoriesState[photo.category]?.images || []
              const photoIndex = categoryImages.findIndex((img) => img.src === photo.src)
              
              return (
                <div
                  key={`${photo.category}-${index}`}
                  className={`gallery__item ${isActive ? 'active' : ''}`}
                  data-category={photo.category}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setLightboxCategory(photo.category)
                    setLightboxIndex(photoIndex >= 0 ? photoIndex : 0)
                    setLightboxOpen(true)
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 140px, (max-width: 1024px) 160px, 180px"
                    quality={85}
                    loading={index < 6 ? 'eager' : 'lazy'}
                    priority={index < 3}
                    className="gallery__item-image"
                    style={{ objectFit: 'cover', willChange: 'transform, opacity, filter' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Category Overlay */}
      <div className="category-overlay">
        <h1 className="category-overlay__title">
          <span id="category-name">{categoriesState[activeCategory]?.name || 'Landscape'}</span>
          <span className="category-overlay__count">({activeCount})</span>
        </h1>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="bottom-bar" aria-label="Gallery navigation">
        <div className="bottom-bar__categories">
          <button
            className={`category-btn ${activeCategory === 'landscape' ? 'active' : ''}`}
            onClick={() => setCategory('landscape')}
            data-category="landscape"
          >
            Landscape
          </button>
          <button
            className={`category-btn ${activeCategory === 'architecture' ? 'active' : ''}`}
            onClick={() => setCategory('architecture')}
            data-category="architecture"
          >
            Architecture
          </button>
          <button
            className={`category-btn ${activeCategory === 'street' ? 'active' : ''}`}
            onClick={() => setCategory('street')}
            data-category="street"
          >
            Street
          </button>
        </div>
      </nav>

      {/* Lightbox Modal */}
      {lightboxOpen && currentCategoryImages[lightboxIndex] && (
        <div
          className={`lightbox ${lightboxOpen ? 'active' : ''}`}
          aria-hidden={!lightboxOpen}
          role="dialog"
          aria-label="Image viewer"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox()
          }}
        >
          <button
            className="lightbox__close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <img
            className="lightbox__image"
            src={currentCategoryImages[lightboxIndex].src}
            alt={currentCategoryImages[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              // Fallback to a placeholder or hide the image
              target.style.display = 'none'
            }}
          />

          {/* Navigation Buttons - Visible on Mobile */}
          <button
            className="lightbox__nav-btn lightbox__nav-btn--prev"
            onClick={(e) => {
              e.stopPropagation()
              showPrev()
            }}
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            className="lightbox__nav-btn lightbox__nav-btn--next"
            onClick={(e) => {
              e.stopPropagation()
              showNext()
            }}
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Progress Tracker */}
          <div className="lightbox__progress">
            <div className="lightbox__category">
              {categoriesState[lightboxCategory]?.name || 'Gallery'}
            </div>
            <div className="lightbox__progress-bar">
              <div 
                className="lightbox__progress-fill" 
                style={{ width: `${((lightboxIndex + 1) / currentCategoryImages.length) * 100}%` }}
              ></div>
            </div>
            <div className="lightbox__progress-info">
              <span className="lightbox__counter">
                {String(lightboxIndex + 1).padStart(2, '0')} / {String(currentCategoryImages.length).padStart(2, '0')}
              </span>
              <span className="lightbox__hint">ESC to close</span>
            </div>
          </div>

          <div className="lightbox__nav">
            {currentCategoryImages.map((_, index) => (
              <button
                key={index}
                className={`lightbox__dot ${index === lightboxIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  goToImage(index)
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

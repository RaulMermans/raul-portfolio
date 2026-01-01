'use client'

import { useEffect, useState } from 'react'
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

  const currentCategoryImages = categoriesState[lightboxCategory]?.images || []
  const activeCount = categoriesState[activeCategory]?.count || 0

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

  // Smooth horizontal scroll on wheel with improved performance
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const gallery = document.getElementById('main-content')
    if (!gallery) return

    let scrollTarget = gallery.scrollLeft
    let rafId: number | null = null
    let lastTime = performance.now()

    const smoothScroll = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime
      
      const current = gallery.scrollLeft
      const diff = scrollTarget - current
      
      if (Math.abs(diff) > 0.5) {
        // Use time-based easing for consistent speed
        const easing = Math.min(0.2 * (deltaTime / 16), 0.3) // Normalize to 60fps
        gallery.scrollLeft += diff * easing
        rafId = requestAnimationFrame(smoothScroll)
      } else {
        gallery.scrollLeft = scrollTarget
        rafId = null
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        
        // Update target scroll position with momentum
        const scrollAmount = e.deltaY * 1.5
        scrollTarget = Math.max(0, Math.min(
          gallery.scrollWidth - gallery.clientWidth,
          scrollTarget + scrollAmount
        ))
        
        // Start smooth scroll if not already running
        if (rafId === null) {
          lastTime = performance.now()
          rafId = requestAnimationFrame(smoothScroll)
        }
      }
    }

    gallery.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      gallery.removeEventListener('wheel', handleWheel)
      if (rafId !== null) cancelAnimationFrame(rafId)
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
    const index = categoryImages.findIndex((img) => img.src === imgElement.src)
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

  const setCategory = (category: 'landscape' | 'architecture' | 'street') => {
    setActiveCategory(category)
  }

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
              return (
                <div
                  key={`${photo.category}-${index}`}
                  className={`gallery__item ${isActive ? 'active' : ''}`}
                  data-category={photo.category}
                  onClick={(e) => {
                    const img = e.currentTarget.querySelector('img')
                    if (img) openLightbox(img, photo.category)
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{ willChange: 'transform, opacity, filter' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      // Fallback to a placeholder or hide the image
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
            onError={(e) => {
              const target = e.target as HTMLImageElement
              // Fallback to a placeholder or hide the image
              target.style.display = 'none'
            }}
          />

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

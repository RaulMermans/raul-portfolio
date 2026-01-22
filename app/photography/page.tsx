'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
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

type CategoryType = 'landscape' | 'architecture' | 'street'

// Helper function to shuffle array and select random items
function shuffleAndSelect<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Helper function to get or create random selection (persisted per session)
// Optimized: Uses direct property comparison instead of JSON.stringify
function getRandomSelection(key: string, allItems: Photo[], count: number): Photo[] {
  if (typeof window === 'undefined') {
    // Server-side: return first N items
    return allItems.slice(0, count)
  }

  // Check sessionStorage for existing selection
  const stored = sessionStorage.getItem(`photo-selection-${key}`)
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Photo[]
      // Validate using direct src comparison (much faster than JSON.stringify)
      const validSelection = parsed.filter((item: Photo) => 
        allItems.some(ai => ai.src === item.src)
      )
      if (validSelection.length === count) {
        return validSelection
      }
    } catch {
      // Invalid stored data, continue to generate new
    }
  }

  // Generate new random selection
  const selection = shuffleAndSelect(allItems, count)
  sessionStorage.setItem(`photo-selection-${key}`, JSON.stringify(selection))
  return selection
}

// Get adjacent categories for prefetching
function getAdjacentCategories(current: CategoryType): CategoryType[] {
  const order: CategoryType[] = ['landscape', 'architecture', 'street']
  const idx = order.indexOf(current)
  const adjacent: CategoryType[] = []
  if (idx > 0) adjacent.push(order[idx - 1])
  if (idx < order.length - 1) adjacent.push(order[idx + 1])
  return adjacent
}

// Aspect ratio patterns for masonry variety (matching CSS)
const getAspectRatio = (index: number): { width: number; height: number } => {
  const pattern = index % 4
  switch (pattern) {
    case 0: return { width: 3, height: 4 }  // 3:4
    case 1: return { width: 4, height: 5 }  // 4:5
    case 2: return { width: 1, height: 1 }  // 1:1
    case 3: return { width: 5, height: 6 }  // 5:6
    default: return { width: 4, height: 5 }
  }
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
  
  const [activeCategory, setActiveCategory] = useState<CategoryType>('landscape')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxCategory, setLightboxCategory] = useState<CategoryType>('landscape')
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [prefetchedCategories, setPrefetchedCategories] = useState<Set<CategoryType>>(() => new Set<CategoryType>(['landscape']))
  const [loadedImages, setLoadedImages] = useState<Set<string>>(() => new Set<string>())
  const [lightboxLoaded, setLightboxLoaded] = useState(false)

  // Memoize active category images (only 12 images rendered at a time)
  const activeCategoryImages = useMemo(
    () => categoriesState[activeCategory]?.images || [],
    [categoriesState, activeCategory]
  )

  // Memoize current lightbox category images
  const currentCategoryImages = useMemo(
    () => categoriesState[lightboxCategory]?.images || [],
    [categoriesState, lightboxCategory]
  )
  
  const activeCount = categoriesState[activeCategory]?.count || 0

  // Handle image load completion
  const handleImageLoad = useCallback((src: string) => {
    setLoadedImages(prev => new Set(prev).add(src))
  }, [])

  // Prefetch adjacent category images when active category changes
  useEffect(() => {
    const adjacent = getAdjacentCategories(activeCategory)
    const newPrefetched = new Set(prefetchedCategories)
    
    adjacent.forEach(cat => {
      if (!newPrefetched.has(cat)) {
        newPrefetched.add(cat)
        // Prefetch images for adjacent categories
        const images = categoriesState[cat]?.images || []
        images.slice(0, 4).forEach(img => {
          const link = document.createElement('link')
          link.rel = 'prefetch'
          link.as = 'image'
          link.href = img.src
          document.head.appendChild(link)
        })
      }
    })
    
    if (newPrefetched.size !== prefetchedCategories.size) {
      setPrefetchedCategories(newPrefetched)
    }
  }, [activeCategory, categoriesState, prefetchedCategories])

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') {
          setLightboxOpen(false)
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev - 1 + currentCategoryImages.length) % currentCategoryImages.length)
          setLightboxLoaded(false)
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev + 1) % currentCategoryImages.length)
          setLightboxLoaded(false)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, currentCategoryImages.length])

  // Lock body scroll when lightbox is open
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

  // Reset lightbox loaded state when opening
  useEffect(() => {
    if (lightboxOpen) {
      setLightboxLoaded(false)
    }
  }, [lightboxOpen, lightboxIndex])

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToImage = (index: number) => {
    setLightboxIndex(index)
  }

  const showPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + currentCategoryImages.length) % currentCategoryImages.length)
    setLightboxLoaded(false)
  }

  const showNext = () => {
    setLightboxIndex((prev) => (prev + 1) % currentCategoryImages.length)
    setLightboxLoaded(false)
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
  const setCategory = useCallback((category: CategoryType) => {
    setActiveCategory(category)
  }, [])

  // Memoize image items - only for active category (12 images instead of 36)
  const imageItems = useMemo(() => {
    return activeCategoryImages.map((photo, index) => ({
      photo,
      index,
      photoIndex: index, // Already within the category
    }))
  }, [activeCategoryImages])

  return (
    <>
      <div className="grain" aria-hidden="true"></div>

      <Header />

      {/* Masonry Gallery - Renders active category images */}
      <main id="main-content" role="main" className="gallery">
        <div className="gallery__grid" data-category={activeCategory}>
          {imageItems.map(({ photo, index, photoIndex }) => {
            const aspectRatio = getAspectRatio(index)
            const isLoaded = loadedImages.has(photo.src)
            
            return (
              <div
                key={`${activeCategory}-${index}`}
                className={`gallery__item ${isLoaded ? 'loaded' : 'loading'}`}
                data-category={activeCategory}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setLightboxCategory(activeCategory)
                  setLightboxIndex(photoIndex)
                  setLightboxOpen(true)
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={400}
                  height={Math.round(400 * (aspectRatio.height / aspectRatio.width))}
                  sizes="(max-width: 480px) 45vw, (max-width: 768px) 45vw, (max-width: 1200px) 30vw, 25vw"
                  quality={75}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  priority={index < 2}
                  className="gallery__item-image"
                  onLoad={() => handleImageLoad(photo.src)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>
            )
          })}
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

          {/* Loading skeleton */}
          {!lightboxLoaded && (
            <div className="lightbox__skeleton" aria-hidden="true">
              <div className="lightbox__skeleton-spinner" />
            </div>
          )}

          {/* Main lightbox image - progressive loading */}
          <Image
            key={currentCategoryImages[lightboxIndex].src}
            className={`lightbox__image ${lightboxLoaded ? 'loaded' : ''}`}
            src={currentCategoryImages[lightboxIndex].src}
            alt={currentCategoryImages[lightboxIndex].alt}
            width={1400}
            height={1400}
            quality={85}
            priority
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 80vw"
            style={{ 
              objectFit: 'contain',
              opacity: lightboxLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onLoad={() => setLightboxLoaded(true)}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              setLightboxLoaded(true) // Hide skeleton even on error
            }}
          />
          
          {/* Preload adjacent images for smoother navigation (larger size) */}
          {currentCategoryImages.length > 1 && (
            <div style={{ display: 'none' }} aria-hidden="true">
              <Image
                src={currentCategoryImages[(lightboxIndex + 1) % currentCategoryImages.length].src}
                alt=""
                width={800}
                height={800}
                quality={75}
                loading="eager"
              />
              <Image
                src={currentCategoryImages[(lightboxIndex - 1 + currentCategoryImages.length) % currentCategoryImages.length].src}
                alt=""
                width={800}
                height={800}
                quality={75}
                loading="eager"
              />
            </div>
          )}

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

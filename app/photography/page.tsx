'use client'

import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// ========================================
// PHOTO DATA STRUCTURE
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
function getRandomSelection(key: string, allItems: Photo[], count: number): Photo[] {
  if (typeof window === 'undefined') {
    return allItems.slice(0, count)
  }

  const stored = sessionStorage.getItem(`photo-selection-${key}`)
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as Photo[]
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

// Editorial aspect ratio patterns — dramatic variety for magazine feel
const getAspectRatio = (index: number): { width: number; height: number } => {
  const pattern = index % 6
  switch (pattern) {
    case 0: return { width: 2, height: 3 }   // tall portrait
    case 1: return { width: 3, height: 2 }   // landscape
    case 2: return { width: 1, height: 1 }   // square
    case 3: return { width: 3, height: 4 }   // portrait
    case 4: return { width: 4, height: 3 }   // wide
    case 5: return { width: 9, height: 16 }  // ultra-tall editorial
    default: return { width: 3, height: 4 }
  }
}

// Featured images that span full width for editorial emphasis
const isFeaturedImage = (index: number): boolean => {
  return index === 0 || index === 5 || index === 9
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
  const [categoriesState] = useState(() => getCategories())
  const [activeCategory, setActiveCategory] = useState<CategoryType>('landscape')
  const [prefetchedCategories, setPrefetchedCategories] = useState<Set<CategoryType>>(() => new Set<CategoryType>(['landscape']))
  const [loadedImages, setLoadedImages] = useState<Set<string>>(() => new Set<string>())
  const bottomBarRef = useRef<HTMLElement | null>(null)

  const activeCategoryImages = useMemo(
    () => categoriesState[activeCategory]?.images || [],
    [categoriesState, activeCategory]
  )
  
  const activeCount = categoriesState[activeCategory]?.count || 0

  const handleImageLoad = useCallback((src: string) => {
    setLoadedImages(prev => new Set(prev).add(src))
  }, [])

  // Prefetch adjacent category images when active category changes (desktop only)
  useEffect(() => {
    // Skip prefetching on mobile for better performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767
    if (isMobile) return

    const adjacent = getAdjacentCategories(activeCategory)
    const newPrefetched = new Set(prefetchedCategories)
    
    adjacent.forEach(cat => {
      if (!newPrefetched.has(cat)) {
        newPrefetched.add(cat)
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

  // Bottom bar: fixed until footer comes into view (rAF-throttled scroll + resize handlers)
  useEffect(() => {
    let ticking = false
    let scrollCleanup: (() => void) | null = null

    const setupMobileHandler = () => {
      const isMobile = window.innerWidth <= 767
      const footer = document.getElementById('footer')
      const bottomBar = bottomBarRef.current

      // Clean up existing scroll handler if present
      if (scrollCleanup) {
        scrollCleanup()
        scrollCleanup = null
      }

      // Only setup if mobile AND elements exist
      if (!isMobile || !footer || !bottomBar) return

      const updateBarPosition = () => {
        const footerRect = footer.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        if (footerRect.top < viewportHeight) {
          // Footer is in view - push bar up to avoid overlap
          const overlap = viewportHeight - footerRect.top
          bottomBar.style.bottom = `${overlap}px`
        } else {
          // Footer not in view - bar stays fixed at bottom
          bottomBar.style.bottom = '0'
        }
        ticking = false
      }

      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(updateBarPosition)
          ticking = true
        }
      }

      // Set initial position
      updateBarPosition()

      window.addEventListener('scroll', handleScroll, { passive: true })

      // Return cleanup function
      scrollCleanup = () => window.removeEventListener('scroll', handleScroll)
    }

    // Run on mount
    setupMobileHandler()

    // Re-run on window resize (debounced via RAF)
    let resizeTicking = false
    const handleResize = () => {
      if (!resizeTicking) {
        requestAnimationFrame(() => {
          setupMobileHandler()
          resizeTicking = false
        })
        resizeTicking = true
      }
    }

    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      if (scrollCleanup) scrollCleanup()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const setCategory = useCallback((category: CategoryType) => {
    setActiveCategory(category)
  }, [])

  // Keyboard navigation for category buttons
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if focus is on a category button
      const target = e.target as HTMLElement
      if (!target.classList.contains('category-btn')) return

      let newCategory: CategoryType | null = null

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          if (activeCategory === 'architecture') newCategory = 'landscape'
          else if (activeCategory === 'street') newCategory = 'architecture'
          break
        case 'ArrowRight':
          e.preventDefault()
          if (activeCategory === 'landscape') newCategory = 'architecture'
          else if (activeCategory === 'architecture') newCategory = 'street'
          break
        case 'Home':
          e.preventDefault()
          newCategory = 'landscape'
          break
        case 'End':
          e.preventDefault()
          newCategory = 'street'
          break
      }

      if (newCategory) {
        setCategory(newCategory)
        // Focus the newly active button
        const newButton = document.querySelector(`[data-category="${newCategory}"]`) as HTMLButtonElement
        newButton?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeCategory, setCategory])

  const imageItems = useMemo(() => {
    return activeCategoryImages.map((photo, index) => ({
      photo,
      index,
    }))
  }, [activeCategoryImages])

  return (
    <>
      <div className="grain" aria-hidden="true"></div>

      <Header />

      {/* Masonry Gallery */}
      <main id="main-content" role="main" className="gallery" aria-label="Photography gallery">
        {/* Mobile category header */}
        <div className="photography-header-mobile">
          <h1 className="photography-category-title-mobile">
            {activeCategory}
          </h1>
        </div>

        <div className="gallery__grid" id="gallery-content" role="tabpanel" aria-live="polite" data-category={activeCategory}>
          {imageItems.map(({ photo, index }) => {
            const aspectRatio = getAspectRatio(index)
            const isLoaded = loadedImages.has(photo.src)
            const featured = isFeaturedImage(index)

            return (
              <div
                key={`${activeCategory}-${index}`}
                className={`gallery__item ${isLoaded ? 'loaded' : 'loading'}${featured ? ' gallery__item--featured' : ''}`}
                data-category={activeCategory}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={featured ? 1200 : 800}
                  height={featured ? 800 : Math.round(800 * (aspectRatio.height / aspectRatio.width))}
                  sizes={featured ? '100vw' : '(max-width: 767px) 100vw, 50vw'}
                  quality={90}
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

      {/* Navigation Bar */}
      <nav className="bottom-bar" aria-label="Gallery category navigation" role="navigation" ref={bottomBarRef}>
        <div className="bottom-bar__categories" role="tablist">
          <button
            className={`category-btn ${activeCategory === 'landscape' ? 'active' : ''}`}
            onClick={() => setCategory('landscape')}
            role="tab"
            aria-selected={activeCategory === 'landscape'}
            aria-controls="gallery-content"
            aria-label="Show landscape photography"
            data-category="landscape"
          >
            Landscape
          </button>
          <button
            className={`category-btn ${activeCategory === 'architecture' ? 'active' : ''}`}
            onClick={() => setCategory('architecture')}
            role="tab"
            aria-selected={activeCategory === 'architecture'}
            aria-controls="gallery-content"
            aria-label="Show architecture photography"
            data-category="architecture"
          >
            Architecture
          </button>
          <button
            className={`category-btn ${activeCategory === 'street' ? 'active' : ''}`}
            onClick={() => setCategory('street')}
            role="tab"
            aria-selected={activeCategory === 'street'}
            aria-controls="gallery-content"
            aria-label="Show street photography"
            data-category="street"
          >
            Street
          </button>
        </div>
      </nav>

      <Footer />
    </>
  )
}

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

interface EditorialLayout {
  itemClassName: string
  sizes: string
  eager?: boolean
  priority?: boolean
  fetchPriority?: 'high' | 'auto' | 'low'
}

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

const PHOTO_BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='

const editorialPattern: EditorialLayout[] = [
  {
    itemClassName: 'gallery__item--hero',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), min(100vw - 8rem, 1280px)',
    eager: true,
    priority: true,
    fetchPriority: 'high',
  },
  {
    itemClassName: 'gallery__item--portrait-xl',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 34vw, 30vw',
    eager: true,
    priority: true,
    fetchPriority: 'high',
  },
  {
    itemClassName: 'gallery__item--landscape-lg',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 52vw, 44vw',
    eager: true,
    priority: true,
  },
  {
    itemClassName: 'gallery__item--square',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 42vw, 28vw',
    eager: true,
  },
  {
    itemClassName: 'gallery__item--portrait',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 42vw, 28vw',
    eager: true,
  },
  {
    itemClassName: 'gallery__item--tall',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 42vw, 28vw',
  },
  {
    itemClassName: 'gallery__item--wide',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 52vw, 48vw',
  },
  {
    itemClassName: 'gallery__item--portrait',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 34vw, 28vw',
  },
  {
    itemClassName: 'gallery__item--portrait-xl',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 34vw, 30vw',
  },
  {
    itemClassName: 'gallery__item--landscape',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 52vw, 44vw',
  },
  {
    itemClassName: 'gallery__item--square',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 42vw, 28vw',
  },
  {
    itemClassName: 'gallery__item--wide-compact',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 52vw, 44vw',
  },
]

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
  const [loadedImages, setLoadedImages] = useState<Set<string>>(() => new Set<string>())
  const bottomBarRef = useRef<HTMLElement | null>(null)
  const prefetchedCategoriesRef = useRef<Set<CategoryType>>(new Set<CategoryType>(['landscape']))

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

    adjacent.forEach(cat => {
      if (!prefetchedCategoriesRef.current.has(cat)) {
        prefetchedCategoriesRef.current.add(cat)
        const images = categoriesState[cat]?.images || []
        images.slice(0, 2).forEach(img => {
          const link = document.createElement('link')
          link.rel = 'prefetch'
          link.as = 'image'
          link.href = img.src
          document.head.appendChild(link)
        })
      }
    })
  }, [activeCategory, categoriesState])

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
      layout: editorialPattern[index % editorialPattern.length],
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
          {imageItems.map(({ photo, index, layout }) => {
            const isLoaded = loadedImages.has(photo.src)
            const shouldPrioritize = Boolean(layout.priority || index < 3)
            const shouldEagerLoad = Boolean(layout.eager || index < 4)

            return (
              <div
                key={`${activeCategory}-${index}`}
                className={`gallery__item ${layout.itemClassName} ${isLoaded ? 'loaded' : 'loading'}`}
                data-category={activeCategory}
                style={{ animationDelay: `${Math.min(index, 4) * 0.08}s` }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={layout.sizes}
                  quality={index < 3 ? 85 : 82}
                  loading={shouldEagerLoad ? 'eager' : 'lazy'}
                  priority={shouldPrioritize}
                  fetchPriority={layout.fetchPriority ?? (index < 2 ? 'high' : 'auto')}
                  placeholder="blur"
                  blurDataURL={PHOTO_BLUR_DATA_URL}
                  className="gallery__item-image"
                  onLoad={() => handleImageLoad(photo.src)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                  style={{ objectFit: 'cover' }}
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

'use client'

import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { type Locale, getLocaleFromPath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  PHOTOGRAPHY_IMAGES,
  type PhotographyCategory as CategoryType,
  type PhotographyPhoto as Photo,
} from '@/data/photography'

// ========================================
// PHOTO DATA STRUCTURE
// ========================================

interface EditorialLayout {
  itemClassName: string
  sizes: string
  eager?: boolean
  priority?: boolean
  fetchPriority?: 'high' | 'auto' | 'low'
}

type PhotoFormat = 'landscape' | 'portrait' | 'tall' | 'square'

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
    itemClassName: 'gallery__item--flush',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 46vw, 40vw',
    eager: true,
    priority: true,
    fetchPriority: 'high',
  },
  {
    itemClassName: 'gallery__item--matte',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 46vw, 40vw',
    eager: true,
  },
  {
    itemClassName: 'gallery__item--paper',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 46vw, 40vw',
    eager: true,
  },
  {
    itemClassName: 'gallery__item--bordered',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 46vw, 40vw',
    eager: true,
  },
  {
    itemClassName: 'gallery__item--soft',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 46vw, 40vw',
  },
  {
    itemClassName: 'gallery__item--flush',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 46vw, 40vw',
  },
  {
    itemClassName: 'gallery__item--matte',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 46vw, 40vw',
  },
  {
    itemClassName: 'gallery__item--flush',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 46vw, 40vw',
  },
  {
    itemClassName: 'gallery__item--paper',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 46vw, 40vw',
  },
  {
    itemClassName: 'gallery__item--bordered',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 46vw, 40vw',
  },
  {
    itemClassName: 'gallery__item--soft',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 46vw, 40vw',
  },
  {
    itemClassName: 'gallery__item--flush',
    sizes: '(max-width: 767px) calc(100vw - 2rem), (max-width: 1023px) 46vw, 40vw',
  },
]

function getPhotoFormat(photo: Photo): PhotoFormat {
  const ratio = photo.width / photo.height

  if (ratio >= 1.18) return 'landscape'
  if (ratio <= 0.72) return 'tall'
  if (ratio >= 0.92) return 'square'

  return 'portrait'
}

function takeNextPhoto(
  buckets: Record<PhotoFormat, Photo[]>,
  preferredOrder: readonly PhotoFormat[]
): Photo | undefined {
  for (const format of preferredOrder) {
    const nextPhoto = buckets[format].shift()
    if (nextPhoto) return nextPhoto
  }

  return undefined
}

function arrangeEditorialFlow(photos: Photo[]): Photo[] {
  const buckets: Record<PhotoFormat, Photo[]> = {
    landscape: [],
    portrait: [],
    tall: [],
    square: [],
  }

  photos.forEach((photo) => {
    buckets[getPhotoFormat(photo)].push(photo)
  })

  const desiredSequence: readonly PhotoFormat[] = [
    'tall',
    'landscape',
    'portrait',
    'landscape',
    'portrait',
    'square',
    'tall',
    'portrait',
    'landscape',
    'portrait',
    'landscape',
    'tall',
  ]

  const fallbackOrder: Record<PhotoFormat, readonly PhotoFormat[]> = {
    landscape: ['landscape', 'portrait', 'square', 'tall'],
    portrait: ['portrait', 'tall', 'square', 'landscape'],
    tall: ['tall', 'portrait', 'square', 'landscape'],
    square: ['square', 'portrait', 'landscape', 'tall'],
  }

  const orderedPhotos = desiredSequence
    .map((format) => takeNextPhoto(buckets, fallbackOrder[format]))
    .filter((photo): photo is Photo => Boolean(photo))

  return orderedPhotos.concat(
    buckets.landscape,
    buckets.portrait,
    buckets.square,
    buckets.tall
  )
}

// Generate categories using the full image inventory for each topic.
function getCategories(locale: Locale) {
  const landscapeImages = arrangeEditorialFlow(PHOTOGRAPHY_IMAGES.landscape)
  const architectureImages = arrangeEditorialFlow(PHOTOGRAPHY_IMAGES.architecture)
  const streetImages = arrangeEditorialFlow(PHOTOGRAPHY_IMAGES.street)

  return {
    landscape: {
      name: locale === 'es' ? 'Paisaje' : 'Landscape',
      count: landscapeImages.length,
      images: landscapeImages,
    },
    architecture: {
      name: locale === 'es' ? 'Arquitectura' : 'Architecture',
      count: architectureImages.length,
      images: architectureImages,
    },
    street: {
      name: locale === 'es' ? 'Calle' : 'Street',
      count: streetImages.length,
      images: streetImages,
    },
  }
}

export default function PhotographyPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const [categoriesState] = useState(() => getCategories(locale))
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
    const prefetchDelay = window.setTimeout(() => {
      adjacent.forEach(cat => {
        if (!prefetchedCategoriesRef.current.has(cat)) {
          prefetchedCategoriesRef.current.add(cat)
          const images = categoriesState[cat]?.images || []
          images.slice(0, 1).forEach(img => {
            const link = document.createElement('link')
            link.rel = 'prefetch'
            link.as = 'image'
            link.href = img.src
            document.head.appendChild(link)
          })
        }
      })
    }, 1400)

    return () => window.clearTimeout(prefetchDelay)
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

      <Header locale={locale} />

      {/* Masonry Gallery */}
      <main id="main-content" role="main" className="gallery" aria-label={locale === 'es' ? 'Galería de fotografía' : 'Photography gallery'}>
        <h1 className="visually-hidden">{locale === 'es' ? 'Fotografía' : 'Photography'}</h1>
        {/* Mobile category header */}
        <div className="photography-header-mobile">
          <div className="photography-header-mobile__inner">
            <div>
              <p className="photography-header-mobile__eyebrow">{locale === 'es' ? 'Fotografía' : 'Photography'}</p>
              <div className="photography-header-mobile__heading">
                <p className="photography-category-title-mobile">
                  {categoriesState[activeCategory]?.name || (locale === 'es' ? 'Paisaje' : 'Landscape')}
                </p>
                <p className="photography-category-count-mobile" aria-live="polite">
                  {activeCount} {locale === 'es' ? 'fotos' : 'photos'}
                </p>
              </div>
            </div>

            <div className="photography-mobile-filter">
              <label className="photography-mobile-filter__label" htmlFor="photography-category-select">
                {locale === 'es' ? 'Categoría' : 'Category'}
              </label>
              <div className="photography-mobile-filter__field">
                <select
                  id="photography-category-select"
                  className="photography-mobile-filter__select"
                  value={activeCategory}
                  onChange={(event) => setCategory(event.target.value as CategoryType)}
                  aria-label={locale === 'es' ? 'Elegir categoría de fotografía' : 'Choose photography category'}
                >
                  <option value="landscape">{locale === 'es' ? 'Paisaje' : 'Landscape'}</option>
                  <option value="architecture">{locale === 'es' ? 'Arquitectura' : 'Architecture'}</option>
                  <option value="street">{locale === 'es' ? 'Calle' : 'Street'}</option>
                </select>
                <span className="photography-mobile-filter__icon" aria-hidden="true">
                  ▾
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="gallery__grid" id="gallery-content" role="tabpanel" aria-live="polite" data-category={activeCategory}>
          {imageItems.map(({ photo, index, layout }) => {
            const isLoaded = loadedImages.has(photo.src)
            const shouldPrioritize = Boolean(layout.priority || index < 2)
            const shouldEagerLoad = Boolean(layout.eager || index < 3)

            return (
              <div
                key={photo.src}
                className={`gallery__item ${layout.itemClassName} ${isLoaded ? 'loaded' : 'loading'}`}
                data-category={activeCategory}
                style={{ animationDelay: `${Math.min(index, 4) * 0.08}s` }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes={layout.sizes}
                  quality={index < 2 ? 82 : 76}
                  loading={shouldEagerLoad ? 'eager' : 'lazy'}
                  priority={shouldPrioritize}
                  fetchPriority={layout.fetchPriority ?? (index < 2 ? 'high' : 'auto')}
                  placeholder={index < 6 ? 'blur' : 'empty'}
                  blurDataURL={index < 6 ? PHOTO_BLUR_DATA_URL : undefined}
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
        <p className="category-overlay__title" aria-hidden="true">
          <span id="category-name">{categoriesState[activeCategory]?.name || (locale === 'es' ? 'Paisaje' : 'Landscape')}</span>
        </p>
      </div>

      {/* Navigation Bar */}
      <nav className="bottom-bar" aria-label={locale === 'es' ? 'Navegación de categorías de la galería' : 'Gallery category navigation'} role="navigation" ref={bottomBarRef}>
        <div className="bottom-bar__categories" role="tablist">
          <button
            className={`category-btn ${activeCategory === 'landscape' ? 'active' : ''}`}
            onClick={() => setCategory('landscape')}
            role="tab"
            aria-selected={activeCategory === 'landscape'}
            aria-controls="gallery-content"
            aria-label={locale === 'es' ? 'Mostrar fotografía de paisaje' : 'Show landscape photography'}
            data-category="landscape"
          >
            {locale === 'es' ? 'Paisaje' : 'Landscape'}
          </button>
          <button
            className={`category-btn ${activeCategory === 'architecture' ? 'active' : ''}`}
            onClick={() => setCategory('architecture')}
            role="tab"
            aria-selected={activeCategory === 'architecture'}
            aria-controls="gallery-content"
            aria-label={locale === 'es' ? 'Mostrar fotografía de arquitectura' : 'Show architecture photography'}
            data-category="architecture"
          >
            {locale === 'es' ? 'Arquitectura' : 'Architecture'}
          </button>
          <button
            className={`category-btn ${activeCategory === 'street' ? 'active' : ''}`}
            onClick={() => setCategory('street')}
            role="tab"
            aria-selected={activeCategory === 'street'}
            aria-controls="gallery-content"
            aria-label={locale === 'es' ? 'Mostrar fotografía de calle' : 'Show street photography'}
            data-category="street"
          >
            {locale === 'es' ? 'Calle' : 'Street'}
          </button>
        </div>
      </nav>

      <Footer locale={locale} />
    </>
  )
}

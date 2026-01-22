'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'

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

// Aspect ratio patterns for masonry variety
const getAspectRatio = (index: number): { width: number; height: number } => {
  const pattern = index % 4
  switch (pattern) {
    case 0: return { width: 3, height: 4 }
    case 1: return { width: 4, height: 5 }
    case 2: return { width: 1, height: 1 }
    case 3: return { width: 5, height: 6 }
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
  const [categoriesState] = useState(() => getCategories())
  const [activeCategory, setActiveCategory] = useState<CategoryType>('landscape')
  const [prefetchedCategories, setPrefetchedCategories] = useState<Set<CategoryType>>(() => new Set<CategoryType>(['landscape']))
  const [loadedImages, setLoadedImages] = useState<Set<string>>(() => new Set<string>())

  const activeCategoryImages = useMemo(
    () => categoriesState[activeCategory]?.images || [],
    [categoriesState, activeCategory]
  )
  
  const activeCount = categoriesState[activeCategory]?.count || 0

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

  const setCategory = useCallback((category: CategoryType) => {
    setActiveCategory(category)
  }, [])

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
      <main id="main-content" role="main" className="gallery">
        <div className="gallery__grid" data-category={activeCategory}>
          {imageItems.map(({ photo, index }) => {
            const aspectRatio = getAspectRatio(index)
            const isLoaded = loadedImages.has(photo.src)
            
            return (
              <div
                key={`${activeCategory}-${index}`}
                className={`gallery__item ${isLoaded ? 'loaded' : 'loading'}`}
                data-category={activeCategory}
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

      {/* Navigation Bar */}
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
    </>
  )
}

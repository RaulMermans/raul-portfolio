'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// ========================================
// PHOTO DATA STRUCTURE
// ========================================
// Add your photos here! Each photo needs:
// - src: image path (from /public/images/photography/[category]/)
// - alt: description for accessibility
// - category: 'landscape', 'architecture', or 'street'
// ========================================

interface Photo {
  src: string
  alt: string
  category: 'landscape' | 'architecture' | 'street'
}

const categories = {
  landscape: {
    name: 'Landscape',
    count: 12,
    images: [
      { src: '/images/photography/landscape/photo-1.webp', alt: 'Mountain landscape at dawn', category: 'landscape' as const },
      { src: '/images/photography/landscape/photo-2.webp', alt: 'Forest valley with morning mist', category: 'landscape' as const },
      { src: '/images/photography/landscape/photo-3.webp', alt: 'Waterfall in tropical forest', category: 'landscape' as const },
      { src: '/images/photography/landscape/photo-4.webp', alt: 'Lake reflection at sunset', category: 'landscape' as const },
      { src: '/images/photography/landscape/photo-5.webp', alt: 'Rolling hills in fog', category: 'landscape' as const },
      { src: '/images/photography/landscape/photo-6.webp', alt: 'Sunlight through forest trees', category: 'landscape' as const },
      { src: '/images/photography/landscape/photo-7.webp', alt: 'Ocean cliffs at golden hour', category: 'landscape' as const },
      { src: '/images/photography/landscape/photo-8.webp', alt: 'Green meadow with mountains', category: 'landscape' as const },
      { src: '/images/photography/landscape/photo-9.webp', alt: 'Dramatic mountain peaks', category: 'landscape' as const },
      { src: '/images/photography/landscape/photo-10.webp', alt: 'Autumn forest road', category: 'landscape' as const },
      { src: '/images/photography/landscape/photo-11.webp', alt: 'Pine trees in mist', category: 'landscape' as const },
      { src: '/images/photography/landscape/photo-12.webp', alt: 'Desert dunes at sunset', category: 'landscape' as const },
    ],
  },
  architecture: {
    name: 'Architecture',
    count: 12,
    images: [
      { src: '/images/photography/architecture/photo-1.webp', alt: 'Modern glass building facade', category: 'architecture' as const },
      { src: '/images/photography/architecture/photo-2.webp', alt: 'Brutalist concrete structure', category: 'architecture' as const },
      { src: '/images/photography/architecture/photo-3.webp', alt: 'Geometric building patterns', category: 'architecture' as const },
      { src: '/images/photography/architecture/photo-4.webp', alt: 'White modern architecture', category: 'architecture' as const },
      { src: '/images/photography/architecture/photo-5.webp', alt: 'Classical columns', category: 'architecture' as const },
      { src: '/images/photography/architecture/photo-6.webp', alt: 'Japanese traditional building', category: 'architecture' as const },
      { src: '/images/photography/architecture/photo-7.webp', alt: 'Urban skyline', category: 'architecture' as const },
      { src: '/images/photography/architecture/photo-8.webp', alt: 'Minimalist house exterior', category: 'architecture' as const },
      { src: '/images/photography/architecture/photo-9.webp', alt: 'Interior spiral staircase', category: 'architecture' as const },
      { src: '/images/photography/architecture/photo-10.webp', alt: 'Museum architecture', category: 'architecture' as const },
      { src: '/images/photography/architecture/photo-11.webp', alt: 'Industrial building', category: 'architecture' as const },
      { src: '/images/photography/architecture/photo-12.webp', alt: 'Bridge architecture', category: 'architecture' as const },
    ],
  },
  street: {
    name: 'Street',
    count: 12,
    images: [
      { src: '/images/photography/street/photo-1.webp', alt: 'Rainy city street at night', category: 'street' as const },
      { src: '/images/photography/street/photo-2.webp', alt: 'Person crossing urban street', category: 'street' as const },
      { src: '/images/photography/street/photo-3.webp', alt: 'City crowd in motion', category: 'street' as const },
      { src: '/images/photography/street/photo-4.webp', alt: 'New York taxi cab', category: 'street' as const },
      { src: '/images/photography/street/photo-5.webp', alt: 'Neon signs in alley', category: 'street' as const },
      { src: '/images/photography/street/photo-6.webp', alt: 'London street scene', category: 'street' as const },
      { src: '/images/photography/street/photo-7.webp', alt: 'City buildings from below', category: 'street' as const },
      { src: '/images/photography/street/photo-8.webp', alt: 'Tokyo street crossing', category: 'street' as const },
      { src: '/images/photography/street/photo-9.webp', alt: 'Urban graffiti wall', category: 'street' as const },
      { src: '/images/photography/street/photo-10.webp', alt: 'Street vendor scene', category: 'street' as const },
      { src: '/images/photography/street/photo-11.webp', alt: 'Moody alleyway', category: 'street' as const },
      { src: '/images/photography/street/photo-12.webp', alt: 'Street performer', category: 'street' as const },
    ],
  },
}

// Combine all images in the scattered order: landscape (1-12), architecture (13-24), street (25-36)
const allImages: Photo[] = [
  ...categories.landscape.images,
  ...categories.architecture.images,
  ...categories.street.images,
]

export default function PhotographyPage() {
  const [activeCategory, setActiveCategory] = useState<'landscape' | 'architecture' | 'street'>('landscape')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxCategory, setLightboxCategory] = useState<'landscape' | 'architecture' | 'street'>('landscape')

  const currentCategoryImages = categories[lightboxCategory]?.images || []
  const activeCount = categories[activeCategory]?.count || 0

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

  // Horizontal scroll on wheel
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const gallery = document.getElementById('main-content')
    if (!gallery) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        gallery.scrollLeft += e.deltaY
      }
    }

    gallery.addEventListener('wheel', handleWheel, { passive: false })
    return () => gallery.removeEventListener('wheel', handleWheel)
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
    const categoryImages = categories[category]?.images || []
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
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/images/placeholders/visuals-fallback.webp'
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
          <span id="category-name">{categories[activeCategory]?.name || 'Landscape'}</span>
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
              target.src = '/images/placeholders/visuals-fallback.webp'
            }}
          />

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

          <span className="lightbox__counter">
            {lightboxIndex + 1} / {currentCategoryImages.length}
          </span>
          <span className="lightbox__hint">ESC to close</span>
        </div>
      )}

      <Footer />
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// ========================================
// VISUAL WORK DATA STRUCTURE
// ========================================
// Add your visual work here! Each item needs:
// - src: image path (from /public/images/visuals/)
// - alt: description for accessibility
// - category: 'ai-art', 'album-covers', 'experiments', or 'client-work'
// - title: (optional) title of the piece
// ========================================

const categories = {
  'ai-art': {
    name: 'AI Art',
    images: [
      { src: '/images/visuals/ai-art/piece-1.webp', alt: 'AI-generated artwork', category: 'ai-art', title: 'Digital Dreamscape' },
      { src: '/images/visuals/ai-art/piece-2.webp', alt: 'AI-generated artwork', category: 'ai-art', title: 'Neural Landscapes' },
      { src: '/images/visuals/ai-art/piece-3.webp', alt: 'AI-generated artwork', category: 'ai-art', title: 'Abstract Synthesis' },
      { src: '/images/visuals/ai-art/piece-4.webp', alt: 'AI-generated artwork', category: 'ai-art', title: 'Virtual Realities' },
      { src: '/images/visuals/ai-art/piece-5.webp', alt: 'AI-generated artwork', category: 'ai-art', title: 'Algorithmic Beauty' },
      { src: '/images/visuals/ai-art/piece-6.webp', alt: 'AI-generated artwork', category: 'ai-art', title: 'Synthetic Visions' },
    ],
  },
  'album-covers': {
    name: 'Album Covers',
    images: [
      { src: '/images/visuals/album-covers/cover-1.webp', alt: 'Album cover design', category: 'album-covers', title: 'Midnight Sessions' },
      { src: '/images/visuals/album-covers/cover-2.webp', alt: 'Album cover design', category: 'album-covers', title: 'Electric Dreams' },
      { src: '/images/visuals/album-covers/cover-3.webp', alt: 'Album cover design', category: 'album-covers', title: 'Urban Echoes' },
      { src: '/images/visuals/album-covers/cover-4.webp', alt: 'Album cover design', category: 'album-covers', title: 'Neon Nights' },
    ],
  },
  'experiments': {
    name: 'Experiments',
    images: [
      { src: '/images/visuals/experiments/exp-1.webp', alt: 'Experimental visual piece', category: 'experiments', title: 'Color Study #1' },
      { src: '/images/visuals/experiments/exp-2.webp', alt: 'Experimental visual piece', category: 'experiments', title: 'Form Exploration' },
      { src: '/images/visuals/experiments/exp-3.webp', alt: 'Experimental visual piece', category: 'experiments', title: 'Texture Experiment' },
      { src: '/images/visuals/experiments/exp-4.webp', alt: 'Experimental visual piece', category: 'experiments', title: 'Motion Study' },
    ],
  },
  'client-work': {
    name: 'Client Work',
    images: [
      { src: '/images/visuals/client-work/client-1.webp', alt: 'Client visual project', category: 'client-work', title: 'Brand Visual Identity' },
      { src: '/images/visuals/client-work/client-2.webp', alt: 'Client visual project', category: 'client-work', title: 'Campaign Visuals' },
      { src: '/images/visuals/client-work/client-3.webp', alt: 'Client visual project', category: 'client-work', title: 'Digital Campaign' },
    ],
  },
}

// Combine all images for rendering
const allImages = [
  ...categories['ai-art'].images,
  ...categories['album-covers'].images,
  ...categories['experiments'].images,
  ...categories['client-work'].images,
]

export default function VisualsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filteredImages = activeCategory === 'all' 
    ? allImages 
    : allImages.filter(img => img.category === activeCategory)

  const currentCategoryImages = activeCategory === 'all'
    ? allImages
    : categories[activeCategory as keyof typeof categories]?.images || []

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return

      if (e.key === 'Escape') {
        setLightboxOpen(false)
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + currentCategoryImages.length) % currentCategoryImages.length)
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % currentCategoryImages.length)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, currentCategoryImages.length])

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setLightboxIndex((prev) => (prev - 1 + currentCategoryImages.length) % currentCategoryImages.length)
    } else {
      setLightboxIndex((prev) => (prev + 1) % currentCategoryImages.length)
    }
  }

  return (
    <>
      <Header />
      
      <main className="visuals-page">
        <div className="visuals-page__header reveal">
          <Link href="/" className="visuals-page__back">
            ← Back
          </Link>
          <h1 className="visuals-page__title">Visuals</h1>
          <p className="visuals-page__description">
            AI art, album covers, and experiments. Digital pieces made for clients, or just because.
          </p>
        </div>

        {/* Category Filter */}
        <div className="visuals-page__filters reveal reveal-delay-1">
          <button
            className={`visuals-page__filter ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              className={`visuals-page__filter ${activeCategory === key ? 'active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="visuals-page__gallery">
          {filteredImages.map((image, index) => {
            const globalIndex = allImages.findIndex(img => img.src === image.src)
            return (
              <div
                key={`${image.category}-${index}`}
                className="visuals-page__item reveal"
                onClick={() => openLightbox(globalIndex)}
              >
                <div className="visuals-page__image-wrapper">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      const target = e.target as HTMLImageElement
                      target.src = '/images/placeholders/visuals-fallback.webp'
                    }}
                  />
                </div>
                {image.title && (
                  <p className="visuals-page__item-title">{image.title}</p>
                )}
              </div>
            )
          })}
        </div>
      </main>

      <Footer />

      {/* Lightbox */}
      {lightboxOpen && currentCategoryImages[lightboxIndex] && (
        <div className="lightbox opacity-100 visible" onClick={closeLightbox}>
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <img
            src={currentCategoryImages[lightboxIndex].src}
            alt={currentCategoryImages[lightboxIndex].alt}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = '/images/placeholders/visuals-fallback.webp'
            }}
          />
          {currentCategoryImages.length > 1 && (
            <>
              <button
                className="lightbox-nav lightbox-nav--prev"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateLightbox('prev')
                }}
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                className="lightbox-nav lightbox-nav--next"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateLightbox('next')
                }}
                aria-label="Next image"
              >
                →
              </button>
              <div className="lightbox-counter">
                {lightboxIndex + 1} / {currentCategoryImages.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}


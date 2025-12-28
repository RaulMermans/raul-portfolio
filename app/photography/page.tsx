'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'

// ========================================
// PHOTO DATA STRUCTURE
// ========================================
// Add your photos here! Each photo needs:
// - src: image path (from /public/images/photography/[category]/)
// - alt: description for accessibility
// - category: 'landscape', 'architecture', or 'street'
// ========================================

const categories = {
  landscape: {
    name: 'Landscape',
    count: 12,
    images: [
      { src: '/images/photography/landscape/photo-1.webp', alt: 'Mountain landscape at dawn', category: 'landscape' },
      { src: '/images/photography/landscape/photo-2.webp', alt: 'Forest valley with morning mist', category: 'landscape' },
      { src: '/images/photography/landscape/photo-3.webp', alt: 'Waterfall in tropical forest', category: 'landscape' },
      { src: '/images/photography/landscape/photo-4.webp', alt: 'Lake reflection at sunset', category: 'landscape' },
      { src: '/images/photography/landscape/photo-5.webp', alt: 'Rolling hills in fog', category: 'landscape' },
      { src: '/images/photography/landscape/photo-6.webp', alt: 'Sunlight through forest trees', category: 'landscape' },
      { src: '/images/photography/landscape/photo-7.webp', alt: 'Ocean cliffs at golden hour', category: 'landscape' },
      { src: '/images/photography/landscape/photo-8.webp', alt: 'Green meadow with mountains', category: 'landscape' },
      { src: '/images/photography/landscape/photo-9.webp', alt: 'Dramatic mountain peaks', category: 'landscape' },
      { src: '/images/photography/landscape/photo-10.webp', alt: 'Autumn forest road', category: 'landscape' },
      { src: '/images/photography/landscape/photo-11.webp', alt: 'Pine trees in mist', category: 'landscape' },
      { src: '/images/photography/landscape/photo-12.webp', alt: 'Desert dunes at sunset', category: 'landscape' },
    ],
  },
  architecture: {
    name: 'Architecture',
    count: 12,
    images: [
      { src: '/images/photography/architecture/photo-1.webp', alt: 'Modern glass building facade', category: 'architecture' },
      { src: '/images/photography/architecture/photo-2.webp', alt: 'Brutalist concrete structure', category: 'architecture' },
      { src: '/images/photography/architecture/photo-3.webp', alt: 'Geometric building patterns', category: 'architecture' },
      { src: '/images/photography/architecture/photo-4.webp', alt: 'White modern architecture', category: 'architecture' },
      { src: '/images/photography/architecture/photo-5.webp', alt: 'Classical columns', category: 'architecture' },
      { src: '/images/photography/architecture/photo-6.webp', alt: 'Japanese traditional building', category: 'architecture' },
      { src: '/images/photography/architecture/photo-7.webp', alt: 'Urban skyline', category: 'architecture' },
      { src: '/images/photography/architecture/photo-8.webp', alt: 'Minimalist house exterior', category: 'architecture' },
      { src: '/images/photography/architecture/photo-9.webp', alt: 'Interior spiral staircase', category: 'architecture' },
      { src: '/images/photography/architecture/photo-10.webp', alt: 'Museum architecture', category: 'architecture' },
      { src: '/images/photography/architecture/photo-11.webp', alt: 'Industrial building', category: 'architecture' },
      { src: '/images/photography/architecture/photo-12.webp', alt: 'Bridge architecture', category: 'architecture' },
    ],
  },
  street: {
    name: 'Street',
    count: 12,
    images: [
      { src: '/images/photography/street/photo-1.webp', alt: 'Rainy city street at night', category: 'street' },
      { src: '/images/photography/street/photo-2.webp', alt: 'Person crossing urban street', category: 'street' },
      { src: '/images/photography/street/photo-3.webp', alt: 'City crowd in motion', category: 'street' },
      { src: '/images/photography/street/photo-4.webp', alt: 'New York taxi cab', category: 'street' },
      { src: '/images/photography/street/photo-5.webp', alt: 'Neon signs in alley', category: 'street' },
      { src: '/images/photography/street/photo-6.webp', alt: 'London street scene', category: 'street' },
      { src: '/images/photography/street/photo-7.webp', alt: 'City buildings from below', category: 'street' },
      { src: '/images/photography/street/photo-8.webp', alt: 'Tokyo street crossing', category: 'street' },
      { src: '/images/photography/street/photo-9.webp', alt: 'Urban graffiti wall', category: 'street' },
      { src: '/images/photography/street/photo-10.webp', alt: 'Street vendor scene', category: 'street' },
      { src: '/images/photography/street/photo-11.webp', alt: 'Moody alleyway', category: 'street' },
      { src: '/images/photography/street/photo-12.webp', alt: 'Street performer', category: 'street' },
    ],
  },
}

// Combine all images for rendering
const allImages = [
  ...categories.landscape.images,
  ...categories.architecture.images,
  ...categories.street.images,
]

export default function PhotographyPage() {
  const [activeCategory, setActiveCategory] = useState('landscape')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxCategory, setLightboxCategory] = useState('landscape')

  const currentCategoryImages = categories[lightboxCategory as keyof typeof categories]?.images || []

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

  const openLightbox = (index: number, category: string) => {
    setLightboxCategory(category)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToImage = (index: number) => {
    setLightboxIndex(index)
  }

  const currentCount = categories[activeCategory as keyof typeof categories]?.count || 0

  return (
    <>
      <CustomCursor />
      <div className="grain" aria-hidden="true"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center p-6 pointer-events-none opacity-0 animate-[fadeIn_0.8s_ease-out_0.3s_forwards]">
        <Link href="/" className="font-mono text-sm tracking-[0.2em] uppercase p-2 min-h-[44px] flex items-center transition-colors hover:text-accent pointer-events-auto">
          RM
        </Link>
        <nav className="hidden md:flex gap-6 pointer-events-auto" aria-label="Primary navigation">
          {['/#case-studies', '/#about', '/#services', '/#contact'].map((href) => (
            <a
              key={href}
              href={href}
              className="font-mono text-xs tracking-[0.1em] uppercase text-ink-muted px-3 py-2 min-h-[44px] flex items-center relative transition-colors hover:text-ink group"
            >
              {href === '/#case-studies' ? 'Work' : href.slice(2).charAt(0).toUpperCase() + href.slice(3)}
              <span className="absolute bottom-1.5 left-3 right-3 h-px bg-ink scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </a>
          ))}
        </nav>
        <button
          className="md:hidden w-[44px] h-[44px] flex flex-col justify-center items-center gap-1.5 pointer-events-auto"
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-ink"></span>
          <span className="block w-6 h-0.5 bg-ink"></span>
          <span className="block w-6 h-0.5 bg-ink"></span>
        </button>
      </header>

      {/* Gallery */}
      <main className="gallery w-full h-screen h-[100svh] overflow-x-auto overflow-y-hidden flex items-center scrollbar-none" id="gallery">
        <div className="gallery__track flex items-center h-full px-[10vw] gap-0 relative">
          <div className="gallery__grid grid grid-cols-[repeat(18,1fr)] grid-rows-[repeat(6,1fr)] gap-4 w-max min-w-[420vw] h-[85vh] py-20">
            {allImages.map((image, index) => {
              const isActive = image.category === activeCategory
              return (
                <div
                  key={index}
                  onClick={() => {
                    const categoryImages = categories[image.category as keyof typeof categories]?.images || []
                    const categoryIndex = categoryImages.findIndex((img) => img.src === image.src)
                    openLightbox(categoryIndex, image.category)
                  }}
                  className={`gallery__item relative overflow-hidden transition-all duration-600 ease-out cursor-pointer opacity-0 translate-y-5 animate-[slideUp_0.6s_ease-out_forwards] ${
                    isActive ? 'active' : ''
                  }`}
                  data-category={image.category}
                  style={{
                    animationDelay: `${0.1 + (index % 12) * 0.05}s`,
                    gridColumn: getGridColumn(index, image.category),
                    gridRow: getGridRow(index, image.category),
                    width: getImageWidth(index),
                    aspectRatio: getAspectRatio(index),
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-all duration-600 ease-out ${
                      isActive ? 'grayscale-0 contrast-100 opacity-100' : 'grayscale contrast-[0.95] opacity-40'
                    } hover:grayscale-0 hover:contrast-[1.02] hover:opacity-100 hover:scale-105`}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Category Overlay */}
      <div className="category-overlay fixed bottom-[calc(2rem+80px)] left-1/2 -translate-x-1/2 text-center z-50 pointer-events-none opacity-0 animate-[slideUp_0.8s_ease-out_0.5s_forwards]">
        <h1 className="category-overlay__title font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-[-0.02em] text-ink flex items-baseline justify-center gap-3 transition-opacity duration-600 ease-out">
          <span id="category-name">{categories[activeCategory as keyof typeof categories]?.name}</span>
          <span className="category-overlay__count font-body text-[clamp(1rem,2vw,1.5rem)] font-normal text-ink-muted ml-2">
            ({currentCount})
          </span>
        </h1>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="bottom-bar fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-0 z-[100] bg-cream opacity-0 animate-[fadeIn_0.8s_ease-out_0.7s_forwards]" aria-label="Gallery navigation">
        <div className="bottom-bar__categories flex">
          {Object.keys(categories).map((categoryKey) => (
            <button
              key={categoryKey}
              onClick={() => setActiveCategory(categoryKey)}
              className={`category-btn font-mono text-xs tracking-[0.3em] uppercase px-6 py-4 border border-cream-dark min-h-[56px] min-w-[160px] flex items-center justify-center transition-all duration-300 ease-out ${
                activeCategory === categoryKey
                  ? 'text-ink bg-ink/4 active'
                  : 'text-ink-faint hover:text-ink hover:bg-ink/2'
              } ${categoryKey !== Object.keys(categories)[0] ? 'border-l-0' : ''}`}
            >
              {categories[categoryKey as keyof typeof categories].name}
            </button>
          ))}
        </div>
      </nav>

      {/* Lightbox Modal */}
      <div
        className={`lightbox fixed inset-0 z-[9000] bg-[rgba(26,23,20,0.95)] flex flex-col items-center justify-center p-16 pb-[calc(4rem+60px)] opacity-0 invisible transition-all duration-600 ease-out ${
          lightboxOpen ? 'opacity-100 visible' : ''
        }`}
        aria-hidden={!lightboxOpen}
        role="dialog"
        aria-label="Image viewer"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox()
        }}
      >
        <button
          onClick={closeLightbox}
          className="lightbox__close absolute top-6 right-6 w-14 h-14 flex items-center justify-center border border-white/20 text-white/60 font-mono text-sm transition-all duration-300 hover:border-white/50 hover:text-cream hover:bg-white/10"
          aria-label="Close lightbox"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <img
          className="lightbox__image max-w-[90vw] max-h-[75vh] object-contain transform scale-90 opacity-0 transition-all duration-600 ease-out"
          style={{
            transform: lightboxOpen ? 'scale(1)' : 'scale(0.9)',
            opacity: lightboxOpen ? 1 : 0,
          }}
          src={currentCategoryImages[lightboxIndex]?.src || ''}
          alt={currentCategoryImages[lightboxIndex]?.alt || ''}
        />

        <div className="lightbox__nav absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {currentCategoryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`lightbox__dot w-2.5 h-2.5 rounded-full border-none p-0 transition-all duration-300 ease-out ${
                index === lightboxIndex
                  ? 'bg-cream scale-110 active'
                  : 'bg-white/25 hover:bg-white/50 hover:scale-120'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        <span className="lightbox__counter absolute bottom-12 left-6 font-mono text-xs tracking-[0.1em] text-white/40">
          {lightboxIndex + 1} / {currentCategoryImages.length}
        </span>
        <span className="lightbox__hint absolute bottom-12 right-6 font-mono text-xs tracking-[0.1em] uppercase text-white/30 hidden md:block">
          ESC to close
        </span>
      </div>
    </>
  )
}

// Helper functions for scattered grid positioning
function getGridColumn(index: number, category: string): string {
  const positions: Record<string, number[]> = {
    landscape: [1, 2, 4, 5, 7, 8, 10, 12, 13, 15, 16, 18],
    architecture: [1, 3, 4, 6, 7, 9, 10, 11, 13, 14, 16, 17],
    street: [2, 3, 5, 6, 8, 9, 11, 12, 14, 15, 17, 18],
  }
  const categoryPositions = positions[category] || []
  return String(categoryPositions[index % categoryPositions.length] || 1)
}

function getGridRow(index: number, category: string): string {
  const positions: Record<string, string[]> = {
    landscape: ['2/4', '4/6', '1/3', '3/5', '5/7', '2/4', '1/3', '4/6', '2/4', '5/7', '1/3', '3/5'],
    architecture: ['5/7', '3/5', '5/7', '1/3', '3/5', '5/7', '3/5', '1/3', '5/7', '1/3', '4/6', '1/3'],
    street: ['1/3', '5/7', '5/7', '3/5', '5/7', '1/3', '4/6', '1/3', '4/6', '2/4', '5/7', '1/3'],
  }
  const categoryPositions = positions[category] || []
  return categoryPositions[index % categoryPositions.length] || '1/3'
}

function getImageWidth(index: number): string {
  const widths = [160, 145, 180, 170, 155, 165, 150, 175, 160, 170, 155, 165]
  return `${widths[index % widths.length]}px`
}

function getAspectRatio(index: number): string {
  if (index % 4 === 0) return '3/4'
  if (index % 4 === 1) return '4/5'
  if (index % 4 === 2) return '1/1'
  return '4/3'
}

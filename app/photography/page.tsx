'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'

// ========================================
// PHOTO DATA STRUCTURE
// ========================================
// Add your photos here! Each photo needs:
// - src: image URL or path
// - alt: description for accessibility
// - category: 'landscape' or 'architecture' (or add more categories)
// ========================================

const categories = {
  landscape: {
    name: 'Landscape',
    count: 12,
    images: [
      { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop', alt: 'Mountain landscape at dawn' },
      { src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop', alt: 'Forest valley with morning mist' },
      { src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=400&fit=crop', alt: 'Waterfall in tropical forest' },
      { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop', alt: 'Lake reflection at sunset' },
      { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop', alt: 'Rolling hills in fog' },
      { src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=500&fit=crop', alt: 'Sunlight through forest trees' },
      { src: 'https://images.unsplash.com/photo-1518173946687-a4c036bc3c94?w=400&h=600&fit=crop', alt: 'Ocean cliffs at golden hour' },
      { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=500&fit=crop', alt: 'Green meadow with mountains' },
      { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop', alt: 'Dramatic mountain peaks' },
      { src: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=400&h=300&fit=crop', alt: 'Autumn forest road' },
      { src: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=600&fit=crop', alt: 'Pine trees in mist' },
      { src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=500&fit=crop', alt: 'Desert dunes at sunset' },
    ],
  },
  architecture: {
    name: 'Architecture',
    count: 12,
    images: [
      { src: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=400&h=600&fit=crop', alt: 'Modern glass building facade' },
      { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=500&fit=crop', alt: 'Brutalist concrete structure' },
      { src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=400&h=400&fit=crop', alt: 'Geometric building patterns' },
      { src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop', alt: 'White modern architecture' },
      { src: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=600&fit=crop', alt: 'Classical columns' },
      { src: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=500&fit=crop', alt: 'Japanese traditional building' },
      { src: 'https://images.unsplash.com/photo-1494145904049-0dca59b4bbad?w=400&h=600&fit=crop', alt: 'Urban skyline' },
      { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=500&fit=crop', alt: 'Minimalist house exterior' },
      { src: 'https://images.unsplash.com/photo-1481026469463-66327c86e544?w=400&h=400&fit=crop', alt: 'Interior spiral staircase' },
      { src: 'https://images.unsplash.com/photo-1520355009940-c7f53f1c9ece?w=400&h=300&fit=crop', alt: 'Museum architecture' },
      { src: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=400&h=600&fit=crop', alt: 'Industrial building' },
      { src: 'https://images.unsplash.com/photo-1485628390555-1a7bd503f9fe?w=400&h=500&fit=crop', alt: 'Bridge architecture' },
    ],
  },
}

export default function PhotographyPage() {
  const [activeCategory, setActiveCategory] = useState('landscape')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [lightboxCategory, setLightboxCategory] = useState('landscape')
  const galleryRef = useRef<HTMLDivElement>(null)
  const lightboxImageRef = useRef<HTMLImageElement>(null)

  // Get all images for current category
  const currentCategoryImages = categories[lightboxCategory as keyof typeof categories]?.images || []

  useEffect(() => {
    // Horizontal scroll with mouse wheel
    const gallery = galleryRef.current
    if (!gallery) return

    const handleWheel = (e: WheelEvent) => {
      if (!lightboxOpen && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        gallery.scrollLeft += e.deltaY
      }
    }

    gallery.addEventListener('wheel', handleWheel, { passive: false })

    // Keyboard navigation (only when lightbox is closed)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        // Lightbox keyboard controls
        if (e.key === 'Escape') {
          closeLightbox()
        } else if (e.key === 'ArrowLeft') {
          showPrevImage()
        } else if (e.key === 'ArrowRight') {
          showNextImage()
        }
      } else {
        // Gallery keyboard controls
        if (e.key === 'ArrowRight') {
          gallery.scrollBy({ left: 300, behavior: 'smooth' })
        } else if (e.key === 'ArrowLeft') {
          gallery.scrollBy({ left: -300, behavior: 'smooth' })
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      gallery.removeEventListener('wheel', handleWheel)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = !isMenuOpen ? 'hidden' : ''
    }
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    closeMenu()
  }

  const openLightbox = (imageIndex: number, category: string) => {
    setLightboxCategory(category)
    setLightboxIndex(imageIndex)
    setLightboxOpen(true)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden'
    }
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    if (typeof document !== 'undefined') {
      document.body.style.overflow = ''
    }
  }

  const showNextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % currentCategoryImages.length)
  }

  const showPrevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + currentCategoryImages.length) % currentCategoryImages.length)
  }

  const goToImage = (index: number) => {
    setLightboxIndex(index)
  }

  // Get high-res image URL (replace w=400 with w=1200 for lightbox)
  const getHighResImage = (src: string) => {
    return src.replace(/w=\d+/, 'w=1200').replace(/h=\d+/, 'h=1200')
  }

  const allImages = [
    ...categories.landscape.images.map((img, i) => ({ ...img, category: 'landscape', index: i })),
    ...categories.architecture.images.map((img, i) => ({ ...img, category: 'architecture', index: i + 12 })),
  ]

  return (
    <>
      <CustomCursor />
      <div className="grain" aria-hidden="true"></div>

      {/* Skip Link */}
      <a href="#gallery" className="visually-hidden">
        Skip to gallery
      </a>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center p-6 pointer-events-none opacity-0 animate-[fadeIn_0.8s_ease-out_0.3s_forwards]">
        <div className="pointer-events-auto">
          <Link
            href="/"
            className="font-mono text-sm tracking-[0.2em] uppercase p-2 min-h-[44px] flex items-center transition-colors duration-300 hover:text-accent"
          >
            Raúl Mermans
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 pointer-events-auto" aria-label="Primary navigation">
          {['/#work', '/#about', '/#services', '/#contact'].map((href) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="font-mono text-xs tracking-[0.12em] uppercase text-ink-muted px-3 py-2 min-h-[44px] flex items-center relative transition-colors duration-300 hover:text-ink group"
            >
              {href.slice(2).charAt(0).toUpperCase() + href.slice(3)}
              <span className="absolute bottom-1.5 left-3 right-3 h-px bg-ink scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-[44px] h-[44px] flex flex-col justify-center items-center gap-1.5 bg-transparent border-none cursor-pointer pointer-events-auto"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-x-1 translate-y-1' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 translate-x-1 -translate-y-1' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile Menu */}
      <nav
        className={`fixed inset-0 bg-cream z-[99] flex flex-col justify-center items-center gap-8 transition-all duration-500 ease-out md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="Mobile navigation"
      >
        {['/#work', '/#about', '/#services', '/#contact'].map((href, index) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleNavClick(e, href)}
            className={`font-display text-[clamp(2rem,8vw,3.5rem)] uppercase text-ink transition-all duration-400 ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isMenuOpen ? `${0.1 + index * 0.05}s` : '0s' }}
          >
            {href.slice(2).charAt(0).toUpperCase() + href.slice(3)}
          </a>
        ))}
      </nav>

      {/* Gallery */}
      <main
        ref={galleryRef}
        id="gallery"
        className="w-full h-screen h-[100svh] overflow-x-auto overflow-y-hidden flex items-center scrollbar-none"
      >
        <div className="flex items-center h-full px-[10vw] gap-0 relative">
          <div className="gallery-grid grid grid-cols-12 grid-rows-6 gap-4 w-max min-w-[280vw] h-[85vh] py-20">
            {allImages.map((img, index) => {
              const isActive = img.category === activeCategory
              return (
                <div
                  key={index}
                  onClick={() => openLightbox(img.index, img.category)}
                  className={`gallery-item relative overflow-hidden transition-all duration-600 ease-out cursor-pointer ${
                    isActive ? 'active' : ''
                  }`}
                  data-category={img.category}
                  style={{
                    gridColumn: getGridColumn(index),
                    gridRow: getGridRow(index),
                    width: getItemWidth(index),
                    aspectRatio: getAspectRatio(index),
                    justifySelf: getJustifySelf(index),
                    alignSelf: getAlignSelf(index),
                    marginTop: getMarginTop(index),
                    marginLeft: getMarginLeft(index),
                    opacity: 0,
                    transform: 'translateY(20px)',
                    animation: `slideUp 0.6s ease-out ${0.1 + (index % 24) * 0.05}s forwards`,
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading={index < 6 ? 'eager' : 'lazy'}
                    className={`w-full h-full object-cover transition-all duration-600 ease-out ${
                      isActive ? 'grayscale-0 contrast-100 opacity-100' : 'grayscale contrast-95 opacity-40'
                    } hover:grayscale-0 hover:contrast-[1.02] hover:opacity-100 hover:scale-105`}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <div
        className={`lightbox fixed inset-0 z-[9000] bg-[rgba(26,23,20,0.95)] flex flex-col items-center justify-center p-8 pb-[calc(2rem+60px)] opacity-0 invisible transition-all duration-600 ease-out ${
          lightboxOpen ? 'opacity-100 visible' : ''
        }`}
        onClick={closeLightbox}
        aria-hidden={!lightboxOpen}
        role="dialog"
        aria-label="Image viewer"
      >
        <button
          className="lightbox-close absolute top-6 right-6 w-14 h-14 flex items-center justify-center border border-white/20 text-white/60 font-mono text-sm transition-all duration-300 hover:border-white/50 hover:text-cream hover:bg-white/10"
          onClick={(e) => {
            e.stopPropagation()
            closeLightbox()
          }}
          aria-label="Close lightbox"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <img
          ref={lightboxImageRef}
          src={getHighResImage(currentCategoryImages[lightboxIndex]?.src || '')}
          alt={currentCategoryImages[lightboxIndex]?.alt || ''}
          className="lightbox-image max-w-[90vw] max-h-[75vh] object-contain transform scale-90 opacity-0 transition-all duration-600 ease-out"
          style={{
            transform: lightboxOpen ? 'scale(1)' : 'scale(0.9)',
            opacity: lightboxOpen ? 1 : 0,
          }}
          onClick={(e) => e.stopPropagation()}
        />

        {/* Navigation Dots */}
        <div className="lightbox-nav absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {currentCategoryImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                goToImage(index)
              }}
              className={`lightbox-dot w-2.5 h-2.5 rounded-full border-none p-0 transition-all duration-300 ${
                index === lightboxIndex
                  ? 'bg-cream scale-110'
                  : 'bg-white/25 hover:bg-white/50 hover:scale-120'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <span className="lightbox-counter absolute bottom-7 left-6 font-mono text-xs tracking-[0.1em] text-white/40">
          {lightboxIndex + 1} / {currentCategoryImages.length}
        </span>

        {/* Hint */}
        <span className="lightbox-hint absolute bottom-7 right-6 font-mono text-xs tracking-[0.1em] uppercase text-white/30 hidden md:block">
          ESC to close
        </span>
      </div>

      {/* Category Overlay */}
      <div className="fixed bottom-[calc(2rem+80px)] left-1/2 -translate-x-1/2 text-center z-50 pointer-events-none opacity-0 animate-[slideUp_0.8s_ease-out_0.5s_forwards]">
        <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-[-0.02em] text-ink flex items-baseline justify-center gap-3">
          <span>{categories[activeCategory as keyof typeof categories].name}</span>
          <span className="font-body text-[clamp(1rem,2vw,1.5rem)] font-normal text-ink-muted ml-2">
            ({categories[activeCategory as keyof typeof categories].count})
          </span>
        </h1>
      </div>

      {/* Bottom Navigation Bar */}
      <nav
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-0 z-[100] bg-cream opacity-0 animate-[fadeIn_0.8s_ease-out_0.7s_forwards]"
        aria-label="Gallery navigation"
      >
        <div className="flex">
          {Object.keys(categories).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-btn font-mono text-xs tracking-[0.3em] uppercase min-h-[56px] min-w-[160px] md:min-w-[160px] flex items-center justify-center transition-all duration-300 border ${
                activeCategory === category
                  ? 'text-ink bg-[rgba(26,23,20,0.04)] border-cream-dark'
                  : 'text-ink-faint border-cream-dark hover:text-ink hover:bg-[rgba(26,23,20,0.02)]'
              } ${category === 'architecture' ? 'border-l-0' : ''}`}
            >
              {categories[category as keyof typeof categories].name}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}

// Helper functions for grid positioning
function getGridColumn(index: number): string {
  const positions = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
  ]
  return positions[index] || '1'
}

function getGridRow(index: number): string {
  const positions = [
    '1 / 3', '2 / 4', '1 / 3', '2 / 4', '1 / 2', '2 / 4',
    '1 / 3', '2 / 4', '1 / 3', '2 / 4', '1 / 2', '2 / 4',
    '4 / 6', '5 / 7', '4 / 6', '5 / 7', '4 / 5', '5 / 7',
    '4 / 6', '5 / 7', '4 / 6', '5 / 7', '4 / 6', '5 / 7',
  ]
  return positions[index] || '1 / 2'
}

function getItemWidth(index: number): string {
  const widths = [
    '140px', '160px', '180px', '200px', '150px', '170px',
    '145px', '190px', '165px', '175px', '155px', '185px',
    '170px', '155px', '195px', '165px', '180px', '150px',
    '175px', '160px', '185px', '145px', '170px', '190px',
  ]
  return widths[index] || '150px'
}

function getAspectRatio(index: number): string {
  if (index % 4 === 0) return '4/3'
  if (index % 3 === 0) return '1/1'
  if (index % 2 === 0) return '4/5'
  return '3/4'
}

function getJustifySelf(index: number): string {
  const positions = ['end', 'start', 'center', 'start', 'end', 'start', 'end', 'start', 'end', 'start', 'center', 'start']
  return positions[index % 12] || 'start'
}

function getAlignSelf(index: number): string {
  const positions = ['start', 'center', 'end', 'start', 'center', 'start', 'end', 'start', 'center', 'end', 'start', 'center']
  return positions[index % 12] || 'start'
}

function getMarginTop(index: number): string {
  const margins = ['0', '2vh', '0', '0', '0', '-3vh', '0', '0', '0', '4vh', '0', '0', '0', '0', '2vh', '0', '0', '0', '0', '-2vh', '0', '0', '0', '0']
  return margins[index] || '0'
}

function getMarginLeft(index: number): string {
  const margins = ['0', '0', '0', '0', '0', '0', '2vw', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '-1vw', '0']
  return margins[index] || '0'
}

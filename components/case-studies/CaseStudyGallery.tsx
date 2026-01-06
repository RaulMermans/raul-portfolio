'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { CaseStudyGalleryRow } from '@/types/case-study'

interface CaseStudyGalleryProps {
  rows: CaseStudyGalleryRow[]
  accentColor?: string
}

export default function CaseStudyGallery({ rows, accentColor }: CaseStudyGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  const handleImageClick = (src: string, alt: string) => {
    setSelectedImage({ src, alt })
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  // Flatten all images from rows for the grid
  const allImages = rows.flatMap(row => row.items)

  return (
    <>
      <section className="case-study-gallery-new">
        <div className="case-study-gallery-new__container">
          <h2 className="case-study-gallery-new__title reveal">Gallery</h2>
          <div className="case-study-gallery-new__grid">
            {allImages.map((image, index) => {
              // Apply color/grayscale pattern: 1,4 = color, 2,3 = grayscale
              const isGrayscale = index === 1 || index === 2
              // Aspect ratios: 1,4 = landscape (4:3), 2,3 = portrait (3:4)
              const aspectRatio = index === 1 || index === 2 ? '3/4' : '4/3'

              return (
                <div
                  key={index}
                  className={`case-study-gallery-new__item reveal ${isGrayscale ? 'case-study-gallery-new__item--grayscale' : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    aspectRatio 
                  }}
                  onClick={() => handleImageClick(image.src, image.alt)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={image.quality ?? 90}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    className="case-study-gallery-new__img"
                  />
                  <div className="case-study-gallery-new__overlay">
                    <span className="case-study-gallery-new__view">View</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="case-study-gallery-new__lightbox"
          onClick={closeLightbox}
        >
          <button 
            className="case-study-gallery-new__close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <div className="case-study-gallery-new__lightbox-content">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              quality={95}
              sizes="100vw"
              style={{ objectFit: 'contain' }}
              className="case-study-gallery-new__lightbox-img"
            />
          </div>
        </div>
      )}
    </>
  )
}


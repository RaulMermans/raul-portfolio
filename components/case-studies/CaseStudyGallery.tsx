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
  const [hiddenImages, setHiddenImages] = useState<Set<string>>(new Set())

  const handleImageClick = (src: string, alt: string) => {
    setSelectedImage({ src, alt })
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const handleImageError = (src: string) => {
    setHiddenImages(prev => new Set(prev).add(src))
  }

  // Flatten all images from rows and filter out invalid ones
  const allImages = rows
    .flatMap(row => row.items)
    .filter(image => image.src && !hiddenImages.has(image.src))

  // Don't render gallery if no valid images
  if (allImages.length === 0) {
    return null
  }

  return (
    <>
      <section className="case-study-gallery-new">
        <div className="case-study-gallery-new__container">
          <h2 className="case-study-gallery-new__title reveal">Gallery</h2>
          <div className="case-study-gallery-new__grid">
            {allImages.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="case-study-gallery-new__item reveal"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  position: 'relative'
                }}
                onClick={() => handleImageClick(image.src, image.alt)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={image.quality ?? 90}
                  sizes={image.sizes ?? "(max-width: 768px) 100vw, 50vw"}
                  style={{ objectFit: 'cover' }}
                  className="case-study-gallery-new__img"
                  loading={index < 4 ? 'eager' : 'lazy'}
                  onError={() => handleImageError(image.src)}
                />
              </div>
            ))}
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


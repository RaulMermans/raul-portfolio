// =============================================
// CASE STUDY GALLERY COMPONENT
// =============================================

import Image from 'next/image'
import type { GallerySection } from '@/types/case-study'

interface CaseStudyGalleryProps {
  gallery: GallerySection
}

export default function CaseStudyGallery({ gallery }: CaseStudyGalleryProps) {
  const getRowClassName = (type: '3' | '2' | 'asymmetric') => {
    switch (type) {
      case '3':
        return 'gallery__row--3'
      case '2':
        return 'gallery__row--2'
      case 'asymmetric':
        return 'gallery__row--asymmetric'
      default:
        return ''
    }
  }

  return (
    <section className="section section--light">
      <div className="section__inner">
        <div className="gallery__grid">
          {gallery.rows.map((row, rowIndex) => (
            <div key={rowIndex} className={getRowClassName(row.type)}>
              {row.items.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className={`gallery__item ${row.type === 'asymmetric' && imageIndex === 0 ? 'gallery__item--wide' : ''} reveal ${imageIndex > 0 ? `reveal-delay-${imageIndex}` : ''}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={image.quality ?? 90}
                    sizes={image.sizes ?? '(max-width: 768px) 100vw, 33vw'}
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


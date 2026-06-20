'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { CaseStudyGalleryRow } from '@/types/case-study'
import { getSiteCopy } from '@/data/site-copy'
import { type Locale } from '@/lib/i18n'

interface CaseStudyGalleryProps {
  rows: CaseStudyGalleryRow[]
  accentColor?: string
  locale?: Locale
}

export default function CaseStudyGallery({ rows, locale = 'en' }: CaseStudyGalleryProps) {
  const [hiddenImages, setHiddenImages] = useState<Set<string>>(new Set())
  const copy = getSiteCopy(locale).caseStudiesUi

  const handleImageError = (src: string) => {
    setHiddenImages(prev => new Set(prev).add(src))
  }

  // Filter rows to only those with valid images
  const validRows = rows
    .map(row => ({
      ...row,
      items: row.items.filter(img => img.src && !hiddenImages.has(img.src)),
    }))
    .filter(row => row.items.length > 0)

  if (validRows.length === 0) {
    return null
  }

  let imageIndex = 0

  return (
    <section className="case-study-gallery-new">
      <div className="case-study-gallery-new__container">
        <h2 className="case-study-gallery-new__title reveal">{copy.gallery}</h2>
        <div className="case-study-gallery-new__rows">
          {validRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={`case-study-gallery-new__row case-study-gallery-new__row--${row.layout}`}
            >
              {row.items.map((image, itemIndex) => {
                const idx = imageIndex++
                return (
                  <div
                    key={`${image.src}-${idx}`}
                    className="case-study-gallery-new__item reveal"
                    style={{ animationDelay: `${idx * 0.08}s` }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      quality={image.quality ?? 90}
                      sizes={
                        row.layout === '3-col'
                          ? '(max-width: 768px) 100vw, 33vw'
                          : row.layout === 'asymmetric'
                            ? '(max-width: 768px) 100vw, 50vw'
                            : '(max-width: 768px) 100vw, 50vw'
                      }
                      style={{ objectFit: 'cover' }}
                      className="case-study-gallery-new__img"
                      loading={idx < 4 ? 'eager' : 'lazy'}
                      onError={() => handleImageError(image.src)}
                    />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { CaseStudyImage as CaseStudyImageType } from '@/types/case-study'

interface CaseStudyImageProps {
  image: CaseStudyImageType
  aspectRatio?: string
  className?: string
  priority?: boolean
  onClick?: () => void
}

export default function CaseStudyImage({ 
  image, 
  aspectRatio = '16/9',
  className = '',
  priority = false,
  onClick
}: CaseStudyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div 
      className={`case-study-image-new ${className} ${onClick ? 'case-study-image-new--clickable' : ''}`}
      style={{ aspectRatio, position: 'relative' }}
      onClick={onClick}
    >
      {error ? (
        <div className="case-study-image-new__error">
          <span>Image failed to load</span>
        </div>
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          quality={image.quality ?? 90}
          sizes={image.sizes ?? '(max-width: 768px) 100vw, 80vw'}
          style={{ objectFit: 'contain' }}
          className={`case-study-image-new__img ${loaded ? 'case-study-image-new__img--loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setError(true)
            console.error('Image failed to load:', image.src)
          }}
        />
      )}
    </div>
  )
}


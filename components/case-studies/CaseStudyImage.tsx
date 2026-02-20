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

  // Don't render if image is missing or failed to load
  if (error || !image?.src) {
    return null
  }

  return (
    <div 
      className={`case-study-image-new ${className} ${onClick ? 'case-study-image-new--clickable' : ''}`}
      style={{ aspectRatio, position: 'relative' }}
      onClick={onClick}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        quality={image.quality ?? 80}
        sizes={image.sizes ?? '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw'}
        style={{ objectFit: 'contain' }}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        className={`case-study-image-new__img ${loaded ? 'case-study-image-new__img--loaded' : ''}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setError(true)
          // Image failed to load - component will return null
        }}
      />
    </div>
  )
}


// =============================================
// CASE STUDY IMAGE COMPONENT
// Optimized Next.js Image wrapper for case studies
// =============================================

import Image from 'next/image'
import type { CaseStudyImage } from '@/types/case-study'

interface CaseStudyImageProps {
  image: CaseStudyImage
  className?: string
  priority?: boolean
  fill?: boolean
  aspectRatio?: string
}

export default function CaseStudyImageComponent({
  image,
  className = '',
  priority = false,
  fill = true,
  aspectRatio,
}: CaseStudyImageProps) {
  const imageProps = {
    src: image.src,
    alt: image.alt,
    quality: image.quality ?? 90,
    sizes: image.sizes ?? '100vw',
    priority,
    fill,
    style: {
      objectFit: 'cover' as const,
      objectPosition: image.objectPosition ?? 'center',
    },
  }

  if (fill) {
    return (
      <div className={className} style={aspectRatio ? { aspectRatio } : undefined}>
        <Image {...imageProps} />
      </div>
    )
  }

  return <Image {...imageProps} width={1920} height={1080} />
}


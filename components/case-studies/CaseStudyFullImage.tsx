// =============================================
// CASE STUDY FULL BLEED IMAGE COMPONENT
// =============================================

import Image from 'next/image'
import type { CaseStudyImage } from '@/types/case-study'

interface CaseStudyFullImageProps {
  image: CaseStudyImage
}

export default function CaseStudyFullImage({ image }: CaseStudyFullImageProps) {
  return (
    <div className="full-image">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        quality={image.quality ?? 90}
        sizes={image.sizes ?? '100vw'}
        style={{ objectFit: 'cover', objectPosition: image.objectPosition ?? 'center' }}
      />
    </div>
  )
}


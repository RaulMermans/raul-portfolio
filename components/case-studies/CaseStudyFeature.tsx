// =============================================
// CASE STUDY FEATURE IMAGE COMPONENT
// =============================================

import Image from 'next/image'
import type { CaseStudyImage } from '@/types/case-study'

interface CaseStudyFeatureProps {
  image: CaseStudyImage
}

export default function CaseStudyFeature({ image }: CaseStudyFeatureProps) {
  return (
    <section className="feature">
      <div className="feature__image reveal">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          quality={image.quality ?? 95}
          sizes={image.sizes ?? '(max-width: 1400px) 100vw, 1400px'}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
    </section>
  )
}


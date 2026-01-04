// =============================================
// CASE STUDY HERO COMPONENT
// =============================================

import Image from 'next/image'
import type { HeroSection } from '@/types/case-study'

interface CaseStudyHeroProps {
  hero: HeroSection
}

export default function CaseStudyHero({ hero }: CaseStudyHeroProps) {
  return (
    <section className="hero case-study-hero">
      <div className="hero__letterbox hero__letterbox--top"></div>
      <div className="hero__bg">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          quality={hero.image.quality ?? 90}
          sizes={hero.image.sizes ?? '100vw'}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <h1 className="hero__title">
          {hero.title.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < hero.title.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h1>
        <p className="hero__tagline">{hero.tagline}</p>
        <p className="hero__subtitle">{hero.subtitle}</p>
      </div>
      <div className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll-line"></div>
      </div>
      <div className="hero__letterbox hero__letterbox--bottom"></div>
    </section>
  )
}


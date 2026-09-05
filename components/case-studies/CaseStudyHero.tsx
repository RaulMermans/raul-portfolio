'use client'
import Image from 'next/image'
import Link from 'next/link'
import type {
  CaseStudyHero as CaseStudyHeroType,
  CaseStudyPresentationFamily,
} from '@/types/case-study'
import { getSiteCopy } from '@/data/site-copy'
import { type Locale, localizePath } from '@/lib/i18n'

interface CaseStudyHeroProps {
  hero: CaseStudyHeroType
  accentColor?: string
  presentationFamily: CaseStudyPresentationFamily
  locale?: Locale
}

export default function CaseStudyHero({
  hero,
  accentColor,
  presentationFamily,
  locale = 'en',
}: CaseStudyHeroProps) {
  const copy = getSiteCopy(locale).caseStudiesUi

  return (
    <section
      className={`case-study-hero-new case-study-hero-new--${presentationFamily}`}
      style={{ '--accent-color': accentColor } as React.CSSProperties}
      data-case-study-hero
      data-presentation-family={presentationFamily}
    >
      <div className="case-study-hero-new__image-wrapper">
        <div className="case-study-hero-new__image">
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            priority
            quality={hero.image.quality ?? 90}
            sizes={hero.image.sizes ?? '100vw'}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            className="case-study-hero-new__img"
          />
          <div className="case-study-hero-new__overlay"></div>
        </div>
      </div>
      <div className="case-study-hero-new__navigation">
        <div className="case-study-hero-new__container">
          <Link
            href={localizePath('/case-studies', locale)}
            className="case-study-hero-new__back"
            data-case-study-hero-back
          >
            <span aria-hidden="true">←</span>
            <span>{copy.backToCaseStudies}</span>
          </Link>
        </div>
      </div>
      <div className="case-study-hero-new__content">
        <div className="case-study-hero-new__container">
          <p
            className="case-study-hero-new__badge"
            data-case-study-hero-label
          >
            {copy.caseStudyBadge}
          </p>
          <h1 className="case-study-hero-new__title">{hero.title}</h1>
          {hero.tagline && (
            <p
              className="case-study-hero-new__tagline"
              aria-label={hero.tagline}
              data-case-study-hero-tagline
            >
              {hero.tagline.split(/\s+/).map((word, i) => (
                <span
                  key={i}
                  className="case-study-hero-new__tagline-word"
                  style={{ animationDelay: `${i * 0.08}s` }}
                  aria-hidden="true"
                >
                  {word}
                </span>
              ))}
            </p>
          )}
          {hero.subtitle && (
            <p className="case-study-hero-new__subtitle">{hero.subtitle}</p>
          )}
          {hero.description && (
            <p className="case-study-hero-new__description">{hero.description}</p>
          )}
        </div>
      </div>

      <div className="case-study-hero-new__scroll-indicator">
        <div className="case-study-hero-new__scroll-line"></div>
        <span className="case-study-hero-new__scroll-text">{copy.scroll}</span>
      </div>
    </section>
  )
}

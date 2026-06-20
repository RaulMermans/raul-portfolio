'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getRandomCaseStudy } from '@/data/case-studies'
import { getSiteCopy } from '@/data/site-copy'
import { type Locale } from '@/lib/i18n'

interface CaseStudy {
  title: string
  href: string
  subtitle?: string
  image?: string
}

interface CaseStudyNextProps {
  nextCaseStudy?: CaseStudy
  currentHref?: string
  accentColor?: string
  locale?: Locale
}

export default function CaseStudyNext({ nextCaseStudy, currentHref, accentColor, locale = 'en' }: CaseStudyNextProps) {
  const copy = getSiteCopy(locale).caseStudiesUi
  const [randomNextCaseStudy, setRandomNextCaseStudy] = useState<CaseStudy | undefined>(undefined)
  const [showHint, setShowHint] = useState(false)
  const nextSectionRef = useRef<HTMLElement>(null)
  const selectedNextCaseStudy = randomNextCaseStudy ?? nextCaseStudy

  useEffect(() => {
    if (!currentHref) return

    setRandomNextCaseStudy(getRandomCaseStudy(currentHref, locale))
  }, [currentHref, locale])

  useEffect(() => {
    if (!selectedNextCaseStudy) return

    const handleScroll = () => {
      const section = nextSectionRef.current
      if (!section) return

      const distanceToNextSection = section.getBoundingClientRect().top - window.innerHeight
      setShowHint(distanceToNextSection < 800 && distanceToNextSection > 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [selectedNextCaseStudy])

  if (!selectedNextCaseStudy) return null

  return (
    <>
      {/* Scroll Hint - Visible when near bottom */}
      <div className={`case-study-scroll-hint ${showHint ? 'visible' : ''}`}>
        <div className="case-study-scroll-hint__text">{copy.moreProjects}</div>
        <div className="case-study-scroll-hint__arrow">↓</div>
      </div>

      <section ref={nextSectionRef} className="case-study-next-new">
        <div className="case-study-next-new__container">
          <div className="case-study-next-new__divider"></div>
          
          {/* Preview Image with Peek Effect */}
          {selectedNextCaseStudy.image && (
            <div className="case-study-next-new__preview">
              <Link href={selectedNextCaseStudy.href} className="case-study-next-new__preview-link">
                <div className="case-study-next-new__preview-image">
                  <Image
                    src={selectedNextCaseStudy.image}
                    alt={`${selectedNextCaseStudy.title} preview`}
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 500px"
                    style={{ objectFit: 'cover' }}
                    className="case-study-next-new__preview-img"
                  />
                  <div className="case-study-next-new__preview-overlay">
                    <span className="case-study-next-new__preview-label">{copy.viewCaseStudy}</span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div className="case-study-next-new__content">
            <p className="case-study-next-new__label">{copy.nextProject}</p>
            <Link 
              href={selectedNextCaseStudy.href}
              className="case-study-next-new__link"
            >
              <h2 className="case-study-next-new__title">{selectedNextCaseStudy.title}</h2>
              {selectedNextCaseStudy.subtitle && (
                <p className="case-study-next-new__subtitle">{selectedNextCaseStudy.subtitle}</p>
              )}
              <div className="case-study-next-new__arrow">→</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface CaseStudy {
  title: string
  href: string
  subtitle?: string
  image?: string
}

interface CaseStudyNextProps {
  nextCaseStudy?: CaseStudy
  accentColor?: string
}

export default function CaseStudyNext({ nextCaseStudy, accentColor }: CaseStudyNextProps) {
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    if (!nextCaseStudy) return

    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const distanceFromBottom = documentHeight - scrollPosition
      
      // Show hint when within 800px of bottom
      setShowHint(distanceFromBottom < 800 && distanceFromBottom > 200)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [nextCaseStudy])

  if (!nextCaseStudy) return null

  return (
    <>
      {/* Scroll Hint - Visible when near bottom */}
      <div className={`case-study-scroll-hint ${showHint ? 'visible' : ''}`}>
        <div className="case-study-scroll-hint__text">More Projects</div>
        <div className="case-study-scroll-hint__arrow">↓</div>
      </div>

      <section className="case-study-next-new">
        <div className="case-study-next-new__container">
          <div className="case-study-next-new__divider"></div>
          
          {/* Preview Image with Peek Effect */}
          {nextCaseStudy.image && (
            <div className="case-study-next-new__preview">
              <Link href={nextCaseStudy.href} className="case-study-next-new__preview-link">
                <div className="case-study-next-new__preview-image">
                  <Image
                    src={nextCaseStudy.image}
                    alt={`${nextCaseStudy.title} preview`}
                    fill
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 500px"
                    style={{ objectFit: 'cover' }}
                    className="case-study-next-new__preview-img"
                  />
                  <div className="case-study-next-new__preview-overlay">
                    <span className="case-study-next-new__preview-label">View Case Study</span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          <div className="case-study-next-new__content">
            <p className="case-study-next-new__label">Next Project</p>
            <Link 
              href={nextCaseStudy.href} 
              className="case-study-next-new__link"
            >
              <h2 className="case-study-next-new__title">{nextCaseStudy.title}</h2>
              {nextCaseStudy.subtitle && (
                <p className="case-study-next-new__subtitle">{nextCaseStudy.subtitle}</p>
              )}
              <div className="case-study-next-new__arrow">→</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}


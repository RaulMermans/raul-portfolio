// =============================================
// CASE STUDIES LANDING PAGE COMPONENT
// Cinematic, editorial gallery following template spec
// =============================================

'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { caseStudies } from '@/data/case-studies'

export default function CaseStudiesLanding() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Reveal animations
    const reveals = document.querySelectorAll('.case-study-card')
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    reveals.forEach((el) => revealObserver.observe(el))

    // Header scroll effect
    const header = document.getElementById('header')
    const handleScroll = () => {
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('scrolled')
        } else {
          header.classList.remove('scrolled')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      revealObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section className="case-studies-landing">
      <div className="case-studies-landing__inner">
        {/* Header Section */}
        <header className="case-studies-landing__header reveal">
          <p className="case-studies-landing__label">Case Studies</p>
          <div className="case-studies-landing__divider"></div>
        </header>

        {/* Case Studies Grid */}
        <div className="case-studies-landing__grid">
          {caseStudies.map((study, index) => (
            <Link
              key={study.id}
              href={study.href}
              className="case-study-card reveal"
            >
              <div className="case-study-card__image-wrapper">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  quality={90}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  className="case-study-card__image"
                />
                <div className="case-study-card__overlay"></div>
              </div>

              <div className="case-study-card__content">
                <div className="case-study-card__meta">
                  <span className="case-study-card__number">{String(index + 1).padStart(2, '0')}</span>
                  {study.subtitle && (
                    <span className="case-study-card__subtitle">{study.subtitle}</span>
                  )}
                </div>

                <h2 className="case-study-card__title">{study.title}</h2>
                <p className="case-study-card__description">{study.description}</p>

                <div className="case-study-card__link">
                  <span>View Case Study</span>
                  <span className="case-study-card__arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


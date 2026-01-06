'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import { caseStudies } from '@/data/case-studies'

export default function CaseStudiesPage() {
  const projectsRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for reveal animations and scroll indicator
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })

      // Hide scroll indicator if last card is visible
      const allCards = document.querySelectorAll('.case-study-card')
      const lastCard = allCards[allCards.length - 1]
      const scrollIndicator = document.querySelector('.case-studies-landing__scroll-indicator')
      
      if (lastCard && scrollIndicator) {
        const lastCardRect = lastCard.getBoundingClientRect()
        const isLastVisible = lastCardRect.bottom <= window.innerHeight + 100
        if (isLastVisible) {
          scrollIndicator.classList.add('hidden')
        } else {
          scrollIndicator.classList.remove('hidden')
        }
      }
    }, observerOptions)

    const projectCards = document.querySelectorAll('.case-study-card')
    projectCards.forEach((card) => observer.observe(card))

    // Handle scroll for indicator visibility
    const handleScroll = () => {
      const scrollIndicator = document.querySelector('.case-studies-landing__scroll-indicator')
      if (!scrollIndicator) return

      const allCards = document.querySelectorAll('.case-study-card')
      if (allCards.length === 0) return

      const lastCard = allCards[allCards.length - 1]
      const lastCardRect = lastCard.getBoundingClientRect()
      const isLastVisible = lastCardRect.bottom <= window.innerHeight + 100

      if (isLastVisible) {
        scrollIndicator.classList.add('hidden')
      } else {
        scrollIndicator.classList.remove('hidden')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => {
      projectCards.forEach((card) => observer.unobserve(card))
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="grain" aria-hidden="true"></div>

      <Header />

      {/* Main Layout */}
      <main id="main-content" role="main" className="case-studies-landing">
        {/* Hero Section */}
        <section className="case-studies-landing__hero">
          <div className="case-studies-landing__hero-content">
            <h1 className="case-studies-landing__title">
              Selected <br /> Work
            </h1>
            <p className="case-studies-landing__subtitle">
              A curated collection of creative projects and case studies
            </p>
            <div className="case-studies-landing__count">
              <span className="case-studies-landing__count-number">{caseStudies.length}</span>
              <span className="case-studies-landing__count-label">Projects</span>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="case-studies-landing__projects" ref={projectsRef}>
          <div className="case-studies-landing__projects-grid">
            {caseStudies.map((study, index) => (
              <Link
                key={study.id}
                href={study.href}
                className="case-study-card"
                data-index={index}
                aria-label={`View ${study.title} case study`}
              >
                <div className="case-study-card__image-wrapper">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    quality={90}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="case-study-card__image"
                    priority={index < 2}
                  />
                  <div 
                    className="case-study-card__overlay"
                    style={{ 
                      background: `linear-gradient(135deg, ${study.color}15 0%, ${study.color}08 100%)` 
                    }}
                  ></div>
                  <div className="case-study-card__hover-overlay">
                    <div className="case-study-card__arrow">→</div>
                  </div>
                </div>
                
                <div className="case-study-card__content">
                  <div className="case-study-card__meta">
                    <span 
                      className="case-study-card__number"
                      style={{ color: study.color }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {study.subtitle && (
                      <span className="case-study-card__category">{study.subtitle}</span>
                    )}
                  </div>
                  <h2 
                    className="case-study-card__title"
                    style={{ color: study.color }}
                  >
                    {study.title}
                  </h2>
                  <p className="case-study-card__description">{study.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Scroll Indicator - Only visible when more projects can be scrolled */}
          <div className="case-studies-landing__scroll-indicator">
            <span>Scroll for more</span>
            <div className="case-studies-landing__scroll-arrow">↓</div>
          </div>
        </section>
      </main>
    </>
  )
}

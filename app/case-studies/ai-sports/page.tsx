'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyHero from '@/components/case-studies/CaseStudyHero'
import CaseStudyMeta from '@/components/case-studies/CaseStudyMeta'
import CaseStudySection from '@/components/case-studies/CaseStudySection'
import CaseStudyImage from '@/components/case-studies/CaseStudyImage'
import CaseStudyGallery from '@/components/case-studies/CaseStudyGallery'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import { getCaseStudyContent } from '@/data/case-studies-content'
import { caseStudies } from '@/data/case-studies'
import '@/styles/case-study-new.css'

export default function AISportsCampaignPage() {
  const content = getCaseStudyContent('ai-sports')
  const nextCaseStudy = caseStudies.find((cs) => cs.href === '/case-studies/remoria')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Header styling
    const logo = document.querySelector('.ui__logo')
    const nav = document.querySelector('.ui__nav')
    const menuBtn = document.querySelector('.ui__menu-btn')
    if (logo) logo.classList.add('on-dark')
    if (nav) nav.classList.add('on-dark')
    if (menuBtn) menuBtn.classList.add('on-dark')

    // Scroll reveal animations
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    reveals.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      if (logo) logo.classList.remove('on-dark')
      if (nav) nav.classList.remove('on-dark')
      if (menuBtn) menuBtn.classList.remove('on-dark')
    }
  }, [])

  if (!content) {
    return <div>Case study not found</div>
  }

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="grain" aria-hidden="true"></div>
      
      <Header />

      <main id="main-content" className="case-study-page-new">
        {/* Hero Section */}
        <CaseStudyHero 
          hero={content.hero} 
          accentColor={content.accentColor}
        />

        {/* Meta Section */}
        {content.overview?.meta && (
          <CaseStudyMeta 
            meta={content.overview.meta} 
            accentColor={content.accentColor}
          />
        )}

        {/* Introduction Section */}
        {content.overview && (
          <CaseStudySection 
            title="Overview" 
            variant="light"
            id="overview"
          >
            <div className="case-study-intro">
              <p className="case-study-intro__text">
                {content.overview.description}
              </p>
              {content.overview.intentQuote && (
                <blockquote className="case-study-intro__quote">
                  {content.overview.intentQuote}
                </blockquote>
              )}
            </div>
          </CaseStudySection>
        )}

        {/* Challenge Section */}
        {content.challenge && (
          <CaseStudySection 
            title="The Challenge" 
            variant="dark"
            id="challenge"
          >
            <div className="case-study-challenge">
              <h3 className="case-study-challenge__quote">
                {content.challenge.quote}
              </h3>
              <p className="case-study-challenge__text">
                {content.challenge.context}
              </p>
              {content.challenge.successCriteria && content.challenge.successCriteria.length > 0 && (
                <div className="case-study-challenge__criteria">
                  <h4 className="case-study-challenge__criteria-title">Success Criteria</h4>
                  <ul className="case-study-challenge__criteria-list">
                    {content.challenge.successCriteria.map((criterion, index) => (
                      <li key={index} className="case-study-challenge__criteria-item">
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CaseStudySection>
        )}

        {/* Full Bleed Images */}
        {content.fullBleedImages && content.fullBleedImages.length > 0 && (
          <section className="case-study-fullbleed">
            {content.fullBleedImages.map((image, index) => (
              <CaseStudyImage
                key={index}
                image={image}
                aspectRatio="16/9"
                className="case-study-fullbleed__image"
              />
            ))}
          </section>
        )}

        {/* Approach Section */}
        {content.approach && (
          <CaseStudySection 
            title="The Approach" 
            variant="light"
            id="approach"
          >
            <div className="case-study-approach">
              <p className="case-study-approach__text">
                {content.approach.text}
              </p>

              {content.approach.tools && content.approach.tools.length > 0 && (
                <div className="case-study-approach__tools">
                  <h4 className="case-study-approach__tools-title">Tools & Technologies</h4>
                  <div className="case-study-approach__tools-list">
                    {content.approach.tools.map((tool, index) => (
                      <span key={index} className="case-study-approach__tool">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {content.approach.system && (
                <div className="case-study-approach__system">
                  <h4 className="case-study-approach__system-title">
                    {content.approach.system.label}
                  </h4>
                  <div className="case-study-approach__system-grid">
                    {content.approach.system.items.map((item, index) => (
                      <div key={index} className="case-study-approach__system-item">
                        <h5 className="case-study-approach__system-item-title">
                          {item.title}
                        </h5>
                        <p className="case-study-approach__system-item-desc">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.approach.images && content.approach.images.length > 0 && (
                <div className="case-study-approach__images">
                  {content.approach.images.map((image, index) => (
                    <CaseStudyImage
                      key={index}
                      image={image}
                      aspectRatio="4/3"
                      className="case-study-approach__image"
                    />
                  ))}
                </div>
              )}
            </div>
          </CaseStudySection>
        )}

        {/* Feature Image */}
        {content.featureImage && (
          <section className="case-study-feature">
            <CaseStudyImage
              image={content.featureImage}
              aspectRatio="16/9"
              className="case-study-feature__image"
            />
          </section>
        )}

        {/* Gallery Section */}
        {content.gallery && content.gallery.rows && (
          <CaseStudyGallery 
            rows={content.gallery.rows}
            accentColor={content.accentColor}
          />
        )}

        {/* Results Section */}
        {content.results && (
          <CaseStudySection 
            title="Results" 
            variant="dark"
            id="results"
          >
            <div className="case-study-results">
              <p className="case-study-results__text">
                {content.results.text}
              </p>
              <blockquote className="case-study-results__quote">
                {content.results.takeawayQuote}
              </blockquote>
            </div>
          </CaseStudySection>
        )}

        {/* Next Case Study */}
        <CaseStudyNext 
          nextCaseStudy={nextCaseStudy ? {
            ...nextCaseStudy,
            image: nextCaseStudy.image
          } : undefined}
          accentColor={content.accentColor}
        />
      </main>

      <Footer />
    </>
  )
}

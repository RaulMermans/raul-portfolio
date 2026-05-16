'use client'

import { useCaseStudySetup } from '@/hooks'
import { notFound, usePathname } from 'next/navigation'
import { getSiteCopy } from '@/data/site-copy'
import { getLocaleFromPath } from '@/lib/i18n'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CaseStudyHero from '@/components/case-studies/CaseStudyHero'
import CaseStudyMeta from '@/components/case-studies/CaseStudyMeta'
import CaseStudySection from '@/components/case-studies/CaseStudySection'
import CaseStudyImage from '@/components/case-studies/CaseStudyImage'
import CaseStudyImageContainer from '@/components/case-studies/CaseStudyImageContainer'
import CaseStudyGallery from '@/components/case-studies/CaseStudyGallery'
import CaseStudyNext from '@/components/case-studies/CaseStudyNext'
import RemoriaBrandSystem from '@/components/case-studies/RemoriaBrandSystem'
import BoldText from '@/components/case-studies/BoldText'
import { getCaseStudyContent } from '@/data/case-studies-content'
import '@/styles/remoria-brand-system.css'

export default function RemoriaPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname)
  const copy = getSiteCopy(locale).caseStudiesUi
  const content = getCaseStudyContent('remoria', locale)

  useCaseStudySetup()

  if (!content) {
    notFound()
  }

  return (
    <>
      <Header locale={locale} />

      <main id="main-content" className={`case-study-page-new case-study-page-new--${content.layoutVariant ?? 'default'}`}>
        <CaseStudyHero 
          hero={content.hero} 
          accentColor={content.accentColor}
          locale={locale}
            />

        {content.overview?.meta && (
          <CaseStudyMeta 
            meta={content.overview.meta} 
            accentColor={content.accentColor}
          />
              )}

        {content.overview && (
          <CaseStudySection 
            title={copy.overview} 
            variant="light"
            id="overview"
                      >
            <div className="case-study-intro">
              <p className="case-study-intro__text">
                <BoldText text={content.overview.description} />
                  </p>
                  {content.overview.intentQuote && (
                <blockquote className="case-study-intro__quote">
                  {content.overview.intentQuote}
                </blockquote>
                  )}
            </div>
          </CaseStudySection>
        )}

        {content.challenge && (
          <CaseStudySection 
            title={copy.challenge} 
            variant="dark"
            id="challenge"
          >
            <div className="case-study-challenge">
              <h3 className="case-study-challenge__quote">
                {content.challenge.quote}
              </h3>
              <p className="case-study-challenge__text">
                <BoldText text={content.challenge.context} />
              </p>
              {content.challenge.successCriteria && content.challenge.successCriteria.length > 0 && (
                <div className="case-study-challenge__criteria">
                  <h4 className="case-study-challenge__criteria-title">{copy.successCriteria}</h4>
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

        {content.fullBleedImages && 
         content.fullBleedImages.filter((img) => img?.src).length > 0 && (
          <CaseStudyImageContainer className="case-study-fullbleed">
            {content.fullBleedImages
              .filter((image) => image?.src)
              .map((image, index) => (
                <CaseStudyImage
                  key={index}
                  image={image}
                  aspectRatio="16/9"
                  className="case-study-fullbleed__image"
                />
            ))}
          </CaseStudyImageContainer>
        )}

        {content.approach && (
          <CaseStudySection 
            title={copy.approach} 
            variant="light"
            id="approach"
          >
            <div className="case-study-approach">
              <p className="case-study-approach__text">
                <BoldText text={content.approach.text} />
              </p>

                {content.approach.tools && content.approach.tools.length > 0 && (
                <div className="case-study-approach__tools">
                  <h4 className="case-study-approach__tools-title">{copy.tools}</h4>
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
                <RemoriaBrandSystem
                  items={content.approach.system.items}
                  label={content.approach.system.label}
                />
              )}

              {content.approach.images && 
               content.approach.images.filter((img) => img?.src).length > 0 && (
                <CaseStudyImageContainer className="case-study-approach__images">
                  {content.approach.images
                    .filter((image) => image?.src)
                    .map((image, index) => (
                      <CaseStudyImage
                        key={index}
                        image={image}
                        aspectRatio="4/3"
                        className="case-study-approach__image"
                      />
                  ))}
                </CaseStudyImageContainer>
              )}
            </div>
          </CaseStudySection>
        )}

        {content.featureImage?.src && (
          <CaseStudyImageContainer className="case-study-feature">
            <CaseStudyImage
              image={content.featureImage}
              aspectRatio="16/9"
              className="case-study-feature__image"
            />
          </CaseStudyImageContainer>
        )}

        {content.gallery && content.gallery.rows && (
          <CaseStudyGallery 
            rows={content.gallery.rows}
            accentColor={content.accentColor}
          />
        )}

        {content.results && (
          <CaseStudySection 
            title={copy.results} 
            variant="dark"
            id="results"
          >
            <div className="case-study-results">
              <p className="case-study-results__text">
                <BoldText text={content.results.text} />
              </p>
              <blockquote className="case-study-results__quote">
                {content.results.takeawayQuote}
              </blockquote>
            </div>
          </CaseStudySection>
        )}

        <CaseStudyNext 
          currentHref={pathname}
          accentColor={content.accentColor}
          locale={locale}
        />
      </main>

      <Footer locale={locale} />
    </>
  )
}

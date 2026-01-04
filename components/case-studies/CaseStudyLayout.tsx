// =============================================
// CASE STUDY LAYOUT COMPONENT
// Wrapper with header, footer, and animations
// =============================================

'use client'

import StructuredData from '@/components/StructuredData'
import NextCaseStudy from '@/components/NextCaseStudy'
import { useCaseStudyAnimations } from '@/hooks/useCaseStudy'
import type { CaseStudyContent } from '@/types/case-study'

interface CaseStudyLayoutProps {
  content: CaseStudyContent
  children: React.ReactNode
}

export default function CaseStudyLayout({ content, children }: CaseStudyLayoutProps) {
  useCaseStudyAnimations()

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://raulmermans.com'
  const caseStudyUrl = `${baseUrl}/case-studies/${content.id}`

  return (
    <>
      <StructuredData
        type="Article"
        data={{
          headline: content.structuredData.headline,
          description: content.structuredData.description,
          image: `${baseUrl}${content.hero.image.src}`,
          datePublished: content.structuredData.datePublished,
          dateModified: content.structuredData.dateModified,
          url: caseStudyUrl,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': caseStudyUrl,
          },
        }}
      />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="grain" aria-hidden="true"></div>

      {/* Header */}
      <header className="header case-study-header" id="header">
        <a href="/" className="header__logo">
          Raúl Mermans
        </a>
        <nav className="header__nav">
          <a href="/#work">Work</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
        </nav>
      </header>

      <main id="main-content">{children}</main>

      {/* Next Project */}
      <NextCaseStudy currentHref={`/case-studies/${content.id}`} />

      {/* Footer */}
      <footer className="footer case-study-footer">
        <div className="footer__inner">
          <a href="/" className="footer__logo">
            Raúl Mermans
          </a>
          <nav className="footer__links">
            <a href="/#work">Work</a>
            <a href="/#about">About</a>
            <a href="/#contact">Contact</a>
            <a href="https://instagram.com/raulmermans" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://linkedin.com/in/raulmermans" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </nav>
        </div>
      </footer>
    </>
  )
}


// =============================================
// CASE STUDY RESULTS COMPONENT
// =============================================

import type { ResultsSection } from '@/types/case-study'

interface CaseStudyResultsProps {
  results: ResultsSection
}

export default function CaseStudyResults({ results }: CaseStudyResultsProps) {
  return (
    <section className="section section--dark">
      <div className="section__inner">
        <p className="section__label reveal">The Takeaway</p>

        <div className="results">
          <p className="results__text reveal reveal-delay-1">{results.text}</p>

          <div className="results__takeaway reveal reveal-delay-2" data-gold={results.variant === 'gold'}>
            <p className="results__takeaway-text">{results.takeaway}</p>
          </div>
        </div>
      </div>
    </section>
  )
}


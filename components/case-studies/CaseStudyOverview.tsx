// =============================================
// CASE STUDY OVERVIEW COMPONENT
// =============================================

import type { OverviewSection } from '@/types/case-study'

interface CaseStudyOverviewProps {
  overview: OverviewSection
}

export default function CaseStudyOverview({ overview }: CaseStudyOverviewProps) {
  return (
    <section className="section section--light">
      <div className="section__inner">
        <div className="overview">
          <div className="overview__meta reveal">
            {overview.meta.map((item, index) => (
              <div
                key={index}
                className={`overview__meta-item ${item.fullWidth ? 'overview__meta-item--full' : ''}`}
              >
                <span className="overview__meta-label">{item.label}</span>
                <span className="overview__meta-value">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="overview__content reveal reveal-delay-1">
            <p className="overview__text">{overview.text}</p>
            <p className="overview__intent" data-gold={overview.variant === 'gold'}>
              {overview.intent}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


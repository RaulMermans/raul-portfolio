// =============================================
// CASE STUDY CHALLENGE COMPONENT
// =============================================

import type { ChallengeSection } from '@/types/case-study'

interface CaseStudyChallengeProps {
  challenge: ChallengeSection
}

export default function CaseStudyChallenge({ challenge }: CaseStudyChallengeProps) {
  return (
    <section className="section section--dark">
      <div className="section__inner">
        <p className="section__label reveal">The Challenge</p>
        <h2 className="challenge__quote reveal reveal-delay-1">
          {challenge.quote.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              {index < challenge.quote.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h2>
        <div className="challenge__divider reveal reveal-delay-2"></div>
        <p className="challenge__text reveal reveal-delay-3">{challenge.text}</p>
        <div className="challenge__criteria reveal reveal-delay-4">
          <p className="challenge__criteria-label">Success Criteria</p>
          {challenge.criteria.map((criterion, index) => (
            <p
              key={index}
              className="challenge__criteria-item"
              data-gold={challenge.variant === 'gold'}
            >
              {criterion}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}


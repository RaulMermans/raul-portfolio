'use client'

import CaseStudyLayout from '@/components/case-studies/CaseStudyLayout'
import CaseStudyHero from '@/components/case-studies/CaseStudyHero'
import CaseStudyOverview from '@/components/case-studies/CaseStudyOverview'
import CaseStudyChallenge from '@/components/case-studies/CaseStudyChallenge'
import CaseStudyApproach from '@/components/case-studies/CaseStudyApproach'
import CaseStudyGallery from '@/components/case-studies/CaseStudyGallery'
import CaseStudyResults from '@/components/case-studies/CaseStudyResults'
import CaseStudyFullImage from '@/components/case-studies/CaseStudyFullImage'
import CaseStudyFeature from '@/components/case-studies/CaseStudyFeature'
import { getCaseStudyContent } from '@/data/case-studies-content'

export default function AISportsCampaignPage() {
  const content = getCaseStudyContent('ai-sports')

  if (!content) {
    return <div>Case study not found</div>
  }

  return (
    <CaseStudyLayout content={content}>
      <CaseStudyHero hero={content.hero} />
      <CaseStudyOverview overview={content.overview} />
      <CaseStudyChallenge challenge={content.challenge} />
      {content.fullImages?.[0] && <CaseStudyFullImage image={content.fullImages[0]} />}
      <CaseStudyApproach approach={content.approach} />
      {content.feature && <CaseStudyFeature image={content.feature} />}
      {content.gallery && <CaseStudyGallery gallery={content.gallery} />}
      {content.fullImages?.[1] && <CaseStudyFullImage image={content.fullImages[1]} />}
      <CaseStudyResults results={content.results} />
    </CaseStudyLayout>
  )
}

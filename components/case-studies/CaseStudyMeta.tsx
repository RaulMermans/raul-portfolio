'use client'

import type { CaseStudyMeta as CaseStudyMetaType } from '@/types/case-study'

interface CaseStudyMetaProps {
  meta: CaseStudyMetaType[]
  accentColor?: string
}

export default function CaseStudyMeta({ meta, accentColor }: CaseStudyMetaProps) {
  if (!meta || meta.length === 0) return null

  return (
    <section className="case-study-meta-new">
      <div className="case-study-meta-new__container">
        <div className="case-study-meta-new__grid">
          {meta.map((item, index) => (
            <div key={index} className="case-study-meta-new__item">
              <div className="case-study-meta-new__label">{item.label}</div>
              <div 
                className="case-study-meta-new__value"
                style={{ 
                  color: item.label === 'Type' || item.label === 'Role' ? accentColor : undefined 
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


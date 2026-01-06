'use client'

import { ReactNode } from 'react'

interface CaseStudySectionProps {
  children: ReactNode
  title?: string
  variant?: 'light' | 'dark'
  id?: string
  className?: string
}

export default function CaseStudySection({ 
  children, 
  title, 
  variant = 'light',
  id,
  className = ''
}: CaseStudySectionProps) {
  return (
    <section 
      id={id}
      className={`case-study-section-new case-study-section-new--${variant} ${className}`}
    >
      <div className="case-study-section-new__container">
        {title && (
          <h2 className="case-study-section-new__title reveal">{title}</h2>
        )}
        <div className="case-study-section-new__content">
          {children}
        </div>
      </div>
    </section>
  )
}


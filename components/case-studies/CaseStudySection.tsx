'use client'

import { ReactNode, useMemo } from 'react'

interface CaseStudySectionProps {
  children: ReactNode
  title?: string
  variant?: 'light' | 'dark'
  id?: string
  className?: string
}

/**
 * Check if children has any actual content (not just null/undefined/empty strings)
 */
function hasContent(children: ReactNode): boolean {
  if (children == null) return false
  if (typeof children === 'string') return children.trim().length > 0
  if (typeof children === 'number') return true
  if (typeof children === 'boolean') return false
  
  if (Array.isArray(children)) {
    return children.some(child => hasContent(child))
  }
  
  // For React elements, check if they're not null
  if (typeof children === 'object' && 'type' in children) {
    return true
  }
  
  return false
}

export default function CaseStudySection({ 
  children, 
  title, 
  variant = 'light',
  id,
  className = ''
}: CaseStudySectionProps) {
  const hasActualContent = useMemo(() => {
    // If there's a title, we should render even if children are empty
    if (title) return true
    return hasContent(children)
  }, [children, title])

  // Don't render section if no content
  if (!hasActualContent) {
    return null
  }

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


'use client'

import { ReactNode, useMemo, useRef, useEffect, useState } from 'react'

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
  const contentRef = useRef<HTMLDivElement>(null)
  const [hasVisibleContent, setHasVisibleContent] = useState(true)
  
  // Initial check - if there's a title, we should render
  const hasInitialContent = useMemo(() => {
    if (title) return true
    return hasContent(children)
  }, [children, title])

  // Ref-based check after render to verify actual DOM content
  useEffect(() => {
    if (!contentRef.current) return
    
    const checkContent = () => {
      const element = contentRef.current
      if (!element) return
      
      // Check if there's actual text content (trimmed)
      const hasText = element.textContent?.trim().length > 0
      
      // Check if there are visible child elements
      const hasVisibleNodes = Array.from(element.children).some((child) => {
        const style = window.getComputedStyle(child)
        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          parseFloat(style.opacity) > 0
        )
      })
      
      // If there's a title, always show (title is rendered separately)
      if (title) {
        setHasVisibleContent(hasText || hasVisibleNodes || true)
        return
      }
      
      // No title - only show if there's actual content
      setHasVisibleContent(hasText || hasVisibleNodes)
    }
    
    // Check immediately and after a short delay (for async content)
    checkContent()
    const timeout = setTimeout(checkContent, 100)
    
    return () => clearTimeout(timeout)
  }, [children, title])

  // Don't render section if no initial content
  if (!hasInitialContent) {
    return null
  }

  // Don't render if ref check determined there's no visible content
  if (!hasVisibleContent) {
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
        <div ref={contentRef} className="case-study-section-new__content">
          {children}
        </div>
      </div>
    </section>
  )
}


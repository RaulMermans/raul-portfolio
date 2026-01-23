'use client'

import { ReactNode, useRef, useEffect, useState } from 'react'

interface CaseStudyImageContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Container that only renders if it has visible children.
 * Uses a ref to check after render if any children are actually displayed.
 * This prevents empty sections from creating gaps.
 */
export default function CaseStudyImageContainer({
  children,
  className = ''
}: CaseStudyImageContainerProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    // Wait for next tick to ensure children are rendered
    const checkForContent = () => {
      const element = containerRef.current
      if (!element) return

      // Check if element has any children
      const childElements = element.children
      if (childElements.length === 0) {
        setShouldRender(false)
        return
      }

      // Check if any child is actually visible (not display: none, visibility: hidden, or opacity: 0)
      const hasVisibleChild = Array.from(childElements).some((child) => {
        const style = window.getComputedStyle(child)
        const isVisible = (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          parseFloat(style.opacity) > 0
        )
        return isVisible
      })

      if (!hasVisibleChild) {
        setShouldRender(false)
      }
    }

    // Check immediately and after a delay (for async image loading/errors)
    checkForContent()
    const timeout = setTimeout(checkForContent, 300)

    return () => clearTimeout(timeout)
  }, [children])

  // Don't render if we determined there's no visible content
  if (!shouldRender) {
    return null
  }

  return (
    <section ref={containerRef} className={className}>
      {children}
    </section>
  )
}

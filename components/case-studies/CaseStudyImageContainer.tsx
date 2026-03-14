'use client'

import { ReactNode, useRef, useEffect, useState, useMemo } from 'react'

interface CaseStudyImageContainerProps {
  children: ReactNode
  className?: string
}

/**
 * Check if children prop has any non-null content
 */
function hasChildren(children: ReactNode): boolean {
  if (children == null) return false
  if (Array.isArray(children)) {
    return children.some(child => child != null)
  }
  return true
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
  // Start pessimistic - only render if we confirm content exists
  const [shouldRender, setShouldRender] = useState(() => hasChildren(children))

  // Pre-check: if no children prop, don't render at all
  const hasInitialChildren = useMemo(() => hasChildren(children), [children])

  useEffect(() => {
    if (!hasInitialChildren) {
      setShouldRender(false)
      return
    }

    // Wait for next tick to ensure children are rendered
    const checkForContent = () => {
      const element = containerRef.current
      if (!element) {
        // Element not mounted yet, but we have children prop, so render optimistically
        setShouldRender(true)
        return
      }

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

      setShouldRender(hasVisibleChild)
    }

    // Check immediately (synchronously if possible) and after a delay (for async image loading/errors)
    // Use requestAnimationFrame for immediate check after render
    requestAnimationFrame(() => {
      checkForContent()
      // Also check after a short delay for images that might load/error
      setTimeout(checkForContent, 150)
    })
  }, [children, hasInitialChildren])

  // Don't render if no initial children
  if (!hasInitialChildren) {
    return null
  }

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

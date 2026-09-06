import { ReactNode } from 'react'

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
 * Container that omits sections with no authored children.
 */
export default function CaseStudyImageContainer({
  children,
  className = ''
}: CaseStudyImageContainerProps) {
  if (!hasChildren(children)) return null

  return (
    <section className={className}>
      {children}
    </section>
  )
}

'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const prevPathnameRef = useRef(pathname)
  const isInitialMount = useRef(true)

  useEffect(() => {
    // Skip transition on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      prevPathnameRef.current = pathname
      return
    }

    // Only transition if pathname actually changed
    if (pathname !== prevPathnameRef.current) {
      // Start exit animation
      setIsTransitioning(true)
      
      // Add body class to prevent scrolling during transition
      if (typeof document !== 'undefined') {
        document.body.classList.add('page-transitioning')
      }
      
      const exitTimer = setTimeout(() => {
        // Update content
        setDisplayChildren(children)
        prevPathnameRef.current = pathname
        
        // Start enter animation
        setIsTransitioning(false)
        
        // Remove body class
        if (typeof document !== 'undefined') {
          document.body.classList.remove('page-transitioning')
        }
        
        // Scroll to top smoothly (only if not already at top)
        if (typeof window !== 'undefined' && window.scrollY > 0) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 250)

      return () => clearTimeout(exitTimer)
    }
  }, [pathname, children])

  return (
    <div className={`page-transition ${isTransitioning ? 'page-transition--exiting' : 'page-transition--entering'}`}>
      {displayChildren}
    </div>
  )
}


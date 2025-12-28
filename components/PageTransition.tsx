'use client'

import { useEffect, useState, useRef, useTransition } from 'react'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [isExiting, setIsExiting] = useState(false)
  const prevPathnameRef = useRef(pathname)
  const isInitialMount = useRef(true)

  useEffect(() => {
    // Skip transition on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      prevPathnameRef.current = pathname
      setDisplayChildren(children)
      return
    }

    // Only transition if pathname actually changed
    if (pathname !== prevPathnameRef.current) {
      // Start exit animation
      setIsExiting(true)
      
      // Add body class to prevent scrolling during transition
      if (typeof document !== 'undefined') {
        document.body.classList.add('page-transitioning')
      }
      
      // Wait for exit animation, then update content
      const exitTimer = setTimeout(() => {
        startTransition(() => {
          setDisplayChildren(children)
          prevPathnameRef.current = pathname
          setIsExiting(false)
          
          // Remove body class after a brief delay
          setTimeout(() => {
            if (typeof document !== 'undefined') {
              document.body.classList.remove('page-transitioning')
            }
            
            // Scroll to top smoothly
            if (typeof window !== 'undefined' && window.scrollY > 0) {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }, 50)
        })
      }, 200)

      return () => clearTimeout(exitTimer)
    } else {
      // Pathname didn't change but children might have (e.g., state updates)
      setDisplayChildren(children)
    }
  }, [pathname, children, startTransition])

  return (
    <div className={`page-transition ${isExiting ? 'page-transition--exiting' : isPending ? 'page-transition--pending' : 'page-transition--entering'}`}>
      {displayChildren}
    </div>
  )
}


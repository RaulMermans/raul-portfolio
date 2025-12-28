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
  const [isEntering, setIsEntering] = useState(false)
  const prevPathnameRef = useRef(pathname)
  const isInitialMount = useRef(true)
  const transitionTimeoutRef = useRef<NodeJS.Timeout>()

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
      // Prevent scrolling during transition
      if (typeof document !== 'undefined') {
        document.body.classList.add('page-transitioning')
        document.documentElement.classList.add('page-transitioning')
        document.documentElement.style.overflow = 'hidden'
      }

      // Start exit animation
      setIsExiting(true)
      setIsEntering(false)
      
      // Clear any existing timeout
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
      
      // Wait for exit animation to complete
      transitionTimeoutRef.current = setTimeout(() => {
        startTransition(() => {
          // Update content
          setDisplayChildren(children)
          prevPathnameRef.current = pathname
          
          // Switch to entering state
          setIsExiting(false)
          setIsEntering(true)
          
          // Allow scrolling again after enter animation
          setTimeout(() => {
            if (typeof document !== 'undefined') {
              document.body.classList.remove('page-transitioning')
              document.documentElement.classList.remove('page-transitioning')
              document.documentElement.style.overflow = ''
            }
            setIsEntering(false)
            
            // Scroll to top smoothly (but not instantly)
            if (typeof window !== 'undefined' && window.scrollY > 0) {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }, 400) // Match enter animation duration
        })
      }, 300) // Match exit animation duration

      return () => {
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current)
        }
      }
    } else {
      // Pathname didn't change but children might have (e.g., state updates)
      setDisplayChildren(children)
    }
  }, [pathname, children, startTransition])

  // Determine transition state
  const transitionClass = isExiting 
    ? 'page-transition--exiting' 
    : isEntering 
    ? 'page-transition--entering' 
    : isPending 
    ? 'page-transition--pending' 
    : 'page-transition--idle'

  return (
    <div className={`page-transition ${transitionClass}`}>
      {displayChildren}
    </div>
  )
}

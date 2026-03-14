'use client'

import { useEffect, useState, useRef, useTransition } from 'react'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

// Route hierarchy for direction detection
const routeDepth = (path: string): number => {
  if (path === '/') return 0
  return path.split('/').filter(Boolean).length
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [isExiting, setIsExiting] = useState(false)
  const [isEntering, setIsEntering] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const prevPathnameRef = useRef(pathname)
  const isInitialMount = useRef(true)
  const transitionTimeoutRef = useRef<NodeJS.Timeout>()
  const scrollPositionRef = useRef(0)

  useEffect(() => {
    // Skip transition on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false
      prevPathnameRef.current = pathname
      setDisplayChildren(children)
      // Ensure we're not stuck in a transition state
      setIsExiting(false)
      setIsEntering(false)
      if (typeof document !== 'undefined') {
        document.body.classList.remove('page-transitioning')
        document.documentElement.classList.remove('page-transitioning')
        document.documentElement.style.overflow = ''
        document.body.style.top = ''
      }
      return
    }

    // Only transition if pathname actually changed
    if (pathname !== prevPathnameRef.current) {
      // Save scroll position
      scrollPositionRef.current = window.scrollY

      // Determine direction based on route depth
      const prevDepth = routeDepth(prevPathnameRef.current)
      const currentDepth = routeDepth(pathname)
      const newDirection = currentDepth > prevDepth ? 'forward' : 'backward'
      setDirection(newDirection)

      // Prevent scrolling during transition
      if (typeof document !== 'undefined') {
        document.body.classList.add('page-transitioning')
        document.documentElement.classList.add('page-transitioning')
        document.documentElement.style.overflow = 'hidden'
        // Save scroll position for body
        document.body.style.top = `-${scrollPositionRef.current}px`
      }

      // Start exit animation
      setIsExiting(true)
      setIsEntering(false)
      
      // Clear any existing timeout
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
      
      // Safety timeout to prevent getting stuck (max 2 seconds)
      const safetyTimeout = setTimeout(() => {
        // Safety timeout triggered, forcing completion
        setIsExiting(false)
        setIsEntering(false)
        if (typeof document !== 'undefined') {
          document.body.classList.remove('page-transitioning')
          document.documentElement.classList.remove('page-transitioning')
          document.documentElement.style.overflow = ''
          document.body.style.top = ''
        }
      }, 2000)
      
      // Wait for exit animation to complete
      transitionTimeoutRef.current = setTimeout(() => {
        startTransition(() => {
          // Update content
          setDisplayChildren(children)
          prevPathnameRef.current = pathname
          
          // Switch to entering state
          setIsExiting(false)
          setIsEntering(true)
          
          // Clear safety timeout
          clearTimeout(safetyTimeout)
          
          // Allow scrolling again after enter animation
          setTimeout(() => {
            if (typeof document !== 'undefined') {
              document.body.classList.remove('page-transitioning')
              document.documentElement.classList.remove('page-transitioning')
              document.documentElement.style.overflow = ''
              document.body.style.top = ''
              
              // Scroll to top on route change
              window.scrollTo({ top: 0, behavior: 'instant' })
            }
            setIsEntering(false)
          }, 500) // Match enter animation duration
        })
      }, 400) // Match exit animation duration

      return () => {
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current)
        }
        clearTimeout(safetyTimeout)
      }
    } else {
      // Pathname didn't change but children might have (e.g., state updates)
      setDisplayChildren(children)
      // Ensure we're not stuck in transition states
      setIsExiting(false)
      setIsEntering(false)
    }
  }, [pathname, children, startTransition])
  
  // Cleanup on unmount to prevent stuck states
  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('page-transitioning')
        document.documentElement.classList.remove('page-transitioning')
        document.documentElement.style.overflow = ''
        document.body.style.top = ''
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current)
      }
    }
  }, [])

  // Determine transition state with direction
  const transitionClass = isExiting 
    ? `page-transition--exiting page-transition--${direction}` 
    : isEntering 
    ? `page-transition--entering page-transition--${direction}` 
    : isPending 
    ? `page-transition--pending page-transition--${direction}` 
    : 'page-transition--idle'

  return (
    <>
      <div className={`page-transition ${transitionClass}`}>
        {displayChildren}
      </div>
      {/* Transition overlay */}
      <div className={`page-transition-overlay ${isExiting || isPending ? 'page-transition-overlay--active' : ''}`} aria-hidden="true"></div>
    </>
  )
}

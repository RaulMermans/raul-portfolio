'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const [prevPathname, setPrevPathname] = useState(pathname)

  useEffect(() => {
    if (pathname !== prevPathname) {
      // Start exit animation
      setIsTransitioning(true)
      
      // Add body class to prevent scrolling during transition
      document.body.classList.add('page-transitioning')
      
      const exitTimer = setTimeout(() => {
        // Update content
        setDisplayChildren(children)
        setPrevPathname(pathname)
        
        // Start enter animation
        setIsTransitioning(false)
        
        // Remove body class
        document.body.classList.remove('page-transitioning')
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 300)

      return () => clearTimeout(exitTimer)
    } else {
      // Initial load - just set children
      setDisplayChildren(children)
    }
  }, [pathname, children, prevPathname])

  return (
    <div className={`page-transition ${isTransitioning ? 'page-transition--exiting' : 'page-transition--entering'}`}>
      {displayChildren}
    </div>
  )
}


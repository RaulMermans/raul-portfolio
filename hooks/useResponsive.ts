'use client'

import { useState, useEffect } from 'react'
import { breakpoints, isMobile, isTablet, isDesktop, getViewportWidth, getViewportHeight } from '@/lib/responsive'

export interface ResponsiveState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  width: number
  height: number
  breakpoint: 'mobile' | 'tablet' | 'desktop'
}

/**
 * Hook for responsive design
 * Provides real-time viewport information
 */
export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(() => ({
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    width: getViewportWidth(),
    height: getViewportHeight(),
    breakpoint: isDesktop() ? 'desktop' : isTablet() ? 'tablet' : 'mobile',
  }))

  useEffect(() => {
    const updateState = () => {
      const width = getViewportWidth()
      const mobile = width < breakpoints.mobile
      const tablet = width >= breakpoints.mobile && width < breakpoints.tablet
      const desktop = width >= breakpoints.tablet

      setState({
        isMobile: mobile,
        isTablet: tablet,
        isDesktop: desktop,
        width,
        height: getViewportHeight(),
        breakpoint: desktop ? 'desktop' : tablet ? 'tablet' : 'mobile',
      })
    }

    updateState()

    let timeoutId: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateState, 150) // Debounce
    }

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('orientationchange', updateState, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', updateState)
      clearTimeout(timeoutId)
    }
  }, [])

  return state
}


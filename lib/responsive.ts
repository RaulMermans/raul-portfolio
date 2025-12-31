/**
 * Responsive utilities
 * Provides breakpoint detection and responsive helpers
 */

export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  wide: 1536,
} as const

export type Breakpoint = keyof typeof breakpoints

/**
 * Checks if current viewport matches breakpoint
 */
export function isBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= breakpoints[breakpoint]
}

/**
 * Checks if current viewport is mobile
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < breakpoints.mobile
}

/**
 * Checks if current viewport is tablet
 */
export function isTablet(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= breakpoints.mobile && window.innerWidth < breakpoints.tablet
}

/**
 * Checks if current viewport is desktop
 */
export function isDesktop(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth >= breakpoints.tablet
}

/**
 * Gets current viewport width
 */
export function getViewportWidth(): number {
  if (typeof window === 'undefined') return 0
  return window.innerWidth
}

/**
 * Gets current viewport height
 */
export function getViewportHeight(): number {
  if (typeof window === 'undefined') return 0
  return window.innerHeight
}

/**
 * Checks if device supports hover (desktop)
 */
export function supportsHover(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: hover)').matches
}

/**
 * Checks if device is in landscape mode
 */
export function isLandscape(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth > window.innerHeight
}

/**
 * Clamps a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Debounce function for resize/scroll events
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function for scroll/resize events
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}


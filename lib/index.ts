/**
 * Central export file for all utilities
 * Makes imports cleaner and easier to manage
 */

// Error handling
export * from './errors'

// Validation
export * from './validation'

// Responsive utilities (excluding debounce/throttle which are in performance)
export {
  breakpoints,
  type Breakpoint,
  isBreakpoint,
  isMobile,
  isTablet,
  isDesktop,
  getViewportWidth,
  getViewportHeight,
  supportsHover,
  isLandscape,
  clamp,
} from './responsive'

// Accessibility
export * from './accessibility'

// Safe navigation
export * from './safeNavigation'

// Performance (includes debounce and throttle)
export * from './performance'
export * from './performance-monitor'

// Utils (excluding isValidEmail which is in validation)
export {
  cn,
  formatDate,
} from './utils'


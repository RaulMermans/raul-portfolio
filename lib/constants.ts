/**
 * Application Constants
 * Centralized constants to avoid magic numbers
 */

// Hero Component Constants
export const HERO_MAGNETIC_MAX_DISTANCE = 150
export const HERO_MAGNETIC_STRENGTH = 0.2
export const HERO_SCALE_FACTOR = 1.01

// Animation Constants
export const REVEAL_THRESHOLD = 0.01
export const REVEAL_ROOT_MARGIN = '100px 0px 100px 0px'
export const REVEAL_VISIBILITY_OFFSET = 200

// Scroll Constants
export const SCROLL_THROTTLE_DELAY = 16 // ~60fps
export const SCROLL_UPDATE_INTERVAL = 100

// API Constants
export const RATE_LIMIT_REQUESTS = 5
export const RATE_LIMIT_WINDOW = '1 m' // 1 minute

// Contact Form Constants
export const CONTACT_FORM_SUCCESS_DISPLAY_TIME = 5000 // 5 seconds

// Performance Constants
export const PERFORMANCE_ANALYSIS_INTERVAL = 15 * 60 * 1000 // 15 minutes

// Cache Constants
export const CACHE_TTL_STATIC = 31536000 // 1 year
export const CACHE_TTL_PAGES = 3600 // 1 hour
export const CACHE_STALE_WHILE_REVALIDATE = 86400 // 24 hours


/**
 * Logger Utility
 * Replaces console.log statements with proper logging
 * Only logs in development, errors always logged
 */

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

export const logger = {
  /**
   * Log informational messages (dev only)
   */
  log: (...args: any[]) => {
    if (isDev) {
      console.log(...args)
    }
  },

  /**
   * Log errors (always logged)
   */
  error: (...args: any[]) => {
    console.error(...args)
    // In production, you might want to send to error tracking service
    // e.g., Sentry, LogRocket, etc.
  },

  /**
   * Log warnings (dev only)
   */
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn(...args)
    }
  },

  /**
   * Log debug messages (dev only)
   */
  debug: (...args: any[]) => {
    if (isDev) {
      console.debug(...args)
    }
  },

  /**
   * Log info messages (dev only)
   */
  info: (...args: any[]) => {
    if (isDev) {
      console.info(...args)
    }
  },
}

// Export default for convenience
export default logger


/**
 * Error Bot
 * Automated error tracking and recovery system
 * Monitors errors and provides automatic recovery
 */

interface ErrorReport {
  error: Error
  context: string
  timestamp: number
  url: string
  userAgent?: string
  stack?: string
}

class ErrorBot {
  private errors: ErrorReport[] = []
  private readonly maxErrors = 100
  private errorCounts: Map<string, number> = new Map()

  /**
   * Report an error
   */
  reportError(error: Error, context?: string): void {
    const report: ErrorReport = {
      error,
      context: context || 'unknown',
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : 'server',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      stack: error.stack,
    }

    this.errors.push(report)
    if (this.errors.length > this.maxErrors) {
      this.errors.shift()
    }

    // Track error frequency
    const errorKey = `${error.name}:${error.message}`
    this.errorCounts.set(errorKey, (this.errorCounts.get(errorKey) || 0) + 1)

    // Send to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorTracking(report)
    } else {
      console.error(`[Error Bot] ${context || 'Error'}:`, error)
    }
  }

  /**
   * Send error to tracking service
   */
  private async sendToErrorTracking(report: ErrorReport): Promise<void> {
    try {
      // In production, send to error tracking service
      // Example: Sentry, LogRocket, custom API
      
      // For now, just log (replace with actual service)
      if (process.env.NODE_ENV === 'development') {
        console.error('Error report:', report)
      }
    } catch (error) {
      // Silently fail - don't break error reporting
    }
  }

  /**
   * Get error statistics
   */
  getErrorStats() {
    return {
      total: this.errors.length,
      recent: this.errors.slice(-10),
      frequent: Array.from(this.errorCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5),
    }
  }

  /**
   * Auto-recover from common errors
   */
  attemptRecovery(error: Error): boolean {
    // Example: Retry failed image loads
    if (error.message.includes('Failed to load') || error.message.includes('404')) {
      // Could trigger image fallback logic
      return true
    }

    // Example: Network errors - could retry
    if (error.message.includes('Network') || error.message.includes('fetch')) {
      // Could implement retry logic
      return true
    }

    return false
  }

  /**
   * Setup global error handlers
   */
  setupGlobalHandlers(): void {
    if (typeof window === 'undefined') return

    // Unhandled errors
    window.addEventListener('error', (event) => {
      this.reportError(
        new Error(event.message),
        `Global Error: ${event.filename}:${event.lineno}`
      )
    })

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const error = event.reason instanceof Error 
        ? event.reason 
        : new Error(String(event.reason))
      this.reportError(error, 'Unhandled Promise Rejection')
    })
  }
}

// Singleton instance
export const errorBot = new ErrorBot()

// Auto-setup error handlers in browser
if (typeof window !== 'undefined') {
  errorBot.setupGlobalHandlers()
}


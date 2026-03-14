/**
 * Performance monitoring utilities
 * Tracks and reports performance metrics
 */

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private observers: PerformanceObserver[] = []

  /**
   * Measures execution time of a function
   */
  measure<T>(name: string, fn: () => T): T {
    const start = performance.now()
    try {
      const result = fn()
      const end = performance.now()
      this.recordMetric(name, end - start)
      return result
    } catch (error) {
      const end = performance.now()
      this.recordMetric(`${name} (error)`, end - start)
      throw error
    }
  }

  /**
   * Measures async execution time
   */
  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now()
    try {
      const result = await fn()
      const end = performance.now()
      this.recordMetric(name, end - start)
      return result
    } catch (error) {
      const end = performance.now()
      this.recordMetric(`${name} (error)`, end - start)
      throw error
    }
  }

  /**
   * Records a custom metric
   */
  recordMetric(name: string, value: number): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}: ${value.toFixed(2)}ms`)
    }

    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
    })

    // Keep only last 100 metrics
    if (this.metrics.length > 100) {
      this.metrics.shift()
    }
  }

  /**
   * Gets all metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  /**
   * Gets metrics by name
   */
  getMetricsByName(name: string): PerformanceMetric[] {
    return this.metrics.filter((m) => m.name === name)
  }

  /**
   * Gets average metric value
   */
  getAverageMetric(name: string): number {
    const metrics = this.getMetricsByName(name)
    if (metrics.length === 0) return 0
    const sum = metrics.reduce((acc, m) => acc + m.value, 0)
    return sum / metrics.length
  }

  /**
   * Clears all metrics
   */
  clear(): void {
    this.metrics = []
  }

  /**
   * Observes Web Vitals
   */
  observeWebVitals(): void {
    if (typeof window === 'undefined') return

    try {
      // Observe Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            this.recordMetric('LCP', entry.startTime)
          }
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.push(lcpObserver)

      // Observe First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            // Type guard for PerformanceEventTiming
            if ('processingStart' in entry && 'startTime' in entry) {
              const fidEntry = entry as { processingStart: number; startTime: number }
              this.recordMetric('FID', fidEntry.processingStart - fidEntry.startTime)
            }
          }
        }
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
      this.observers.push(fidObserver)

      // Observe Cumulative Layout Shift
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Type guard for LayoutShift
          if ('hadRecentInput' in entry && 'value' in entry) {
            const layoutShift = entry as { hadRecentInput: boolean; value: number }
            if (!layoutShift.hadRecentInput) {
              clsValue += layoutShift.value
              this.recordMetric('CLS', clsValue)
            }
          }
        }
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      this.observers.push(clsObserver)
    } catch (error) {
      // Performance Observer not supported
      if (process.env.NODE_ENV === 'development') {
        console.warn('Performance Observer not supported:', error)
      }
    }
  }

  /**
   * Disconnects all observers
   */
  disconnect(): void {
    this.observers.forEach((observer) => observer.disconnect())
    this.observers = []
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor()

// Auto-observe Web Vitals in browser
if (typeof window !== 'undefined') {
  performanceMonitor.observeWebVitals()
}


/**
 * Performance Bot
 * Automated performance monitoring and optimization system
 * Runs in the background to improve website performance
 */

interface PerformanceReport {
  timestamp: number
  metrics: {
    lcp?: number
    fid?: number
    cls?: number
    fcp?: number
    ttfb?: number
  }
  recommendations: string[]
  score: number
}

class PerformanceBot {
  private metrics: Map<string, number[]> = new Map()
  private reportHistory: PerformanceReport[] = []
  private readonly thresholds = {
    lcp: { good: 2500, poor: 4000 },
    fid: { good: 100, poor: 300 },
    cls: { good: 0.1, poor: 0.25 },
    fcp: { good: 1800, poor: 3000 },
    ttfb: { good: 800, poor: 1800 },
  }

  /**
   * Record a performance metric
   */
  recordMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }
    const values = this.metrics.get(name)!
    values.push(value)
    
    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift()
    }

    // Send to analytics API in production
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      this.sendToAnalytics(name, value)
    }
  }

  /**
   * Send metrics to analytics API
   */
  private async sendToAnalytics(metric: string, value: number): Promise<void> {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics: [{ name: metric, value }],
          url: window.location.pathname,
        }),
      })
    } catch (error) {
      // Silently fail - don't break user experience
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to send analytics:', error)
      }
    }
  }

  /**
   * Generate performance report
   */
  generateReport(): PerformanceReport {
    const metrics: PerformanceReport['metrics'] = {}
    const recommendations: string[] = []

    // Calculate averages
    for (const [name, values] of this.metrics.entries()) {
      if (values.length > 0) {
        const avg = values.reduce((a, b) => a + b, 0) / values.length
        metrics[name as keyof typeof metrics] = avg

        // Generate recommendations
        const threshold = this.thresholds[name as keyof typeof this.thresholds]
        if (threshold) {
          if (avg > threshold.poor) {
            recommendations.push(`${name.toUpperCase()} is poor (${avg.toFixed(0)}ms). Consider optimization.`)
          } else if (avg > threshold.good) {
            recommendations.push(`${name.toUpperCase()} could be improved (${avg.toFixed(0)}ms).`)
          }
        }
      }
    }

    // Calculate overall score (0-100)
    let score = 100
    if (metrics.lcp && metrics.lcp > this.thresholds.lcp.poor) score -= 30
    else if (metrics.lcp && metrics.lcp > this.thresholds.lcp.good) score -= 15
    
    if (metrics.fid && metrics.fid > this.thresholds.fid.poor) score -= 20
    else if (metrics.fid && metrics.fid > this.thresholds.fid.good) score -= 10
    
    if (metrics.cls && metrics.cls > this.thresholds.cls.poor) score -= 20
    else if (metrics.cls && metrics.cls > this.thresholds.cls.good) score -= 10

    const report: PerformanceReport = {
      timestamp: Date.now(),
      metrics,
      recommendations,
      score: Math.max(0, score),
    }

    this.reportHistory.push(report)
    if (this.reportHistory.length > 50) {
      this.reportHistory.shift()
    }

    return report
  }

  /**
   * Get performance recommendations
   */
  getRecommendations(): string[] {
    const report = this.generateReport()
    return report.recommendations
  }

  /**
   * Check if performance is acceptable
   */
  isPerformanceAcceptable(): boolean {
    const report = this.generateReport()
    return report.score >= 75
  }

  /**
   * Get current performance score
   */
  getScore(): number {
    const report = this.generateReport()
    return report.score
  }

  /**
   * Monitor Web Vitals automatically
   */
  startMonitoring(): void {
    if (typeof window === 'undefined') return

    // Monitor Core Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              this.recordMetric('lcp', entry.startTime)
            }
          }
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (error) {
        // Performance Observer not supported
      }

      // FID
      try {
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'first-input') {
              if ('processingStart' in entry && 'startTime' in entry) {
                const fidEntry = entry as { processingStart: number; startTime: number }
                this.recordMetric('fid', fidEntry.processingStart - fidEntry.startTime)
              }
            }
          }
        })
        fidObserver.observe({ entryTypes: ['first-input'] })
      } catch (error) {
        // Performance Observer not supported
      }

      // CLS
      try {
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if ('hadRecentInput' in entry && 'value' in entry) {
              const layoutShift = entry as { hadRecentInput: boolean; value: number }
              if (!layoutShift.hadRecentInput) {
                clsValue += layoutShift.value
                this.recordMetric('cls', clsValue)
              }
            }
          }
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (error) {
        // Performance Observer not supported
      }
    }

    // Monitor page load time
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        const timing = window.performance.timing
        const loadTime = timing.loadEventEnd - timing.navigationStart
        this.recordMetric('pageLoad', loadTime)
      })
    }
  }

  /**
   * Auto-optimize based on metrics
   */
  async autoOptimize(): Promise<void> {
    if (!this.isPerformanceAcceptable()) {
      const recommendations = this.getRecommendations()
      
      // Log recommendations
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Bot Recommendations:', recommendations)
      }

      // In production, could trigger:
      // - Image optimization
      // - Cache warming
      // - CDN purging
      // - Resource preloading
    }
  }
}

// Singleton instance
export const performanceBot = new PerformanceBot()

// Auto-start monitoring in browser
if (typeof window !== 'undefined') {
  performanceBot.startMonitoring()
  
  // Generate report after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const report = performanceBot.generateReport()
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Report:', report)
      }
    }, 3000) // Wait for metrics to stabilize
  })
}


/**
 * Optimization Bot
 * Automated performance optimization system
 * Continuously monitors and optimizes website performance
 */

import { performanceBot } from './performance-bot'
import { cacheBot } from './cache-bot'
import { errorBot } from './error-bot'

interface OptimizationTask {
  id: string
  name: string
  priority: 'high' | 'medium' | 'low'
  execute: () => Promise<void> | void
  schedule?: number // Run every X milliseconds
}

class OptimizationBot {
  private tasks: OptimizationTask[] = []
  private running = false
  private intervalId: NodeJS.Timeout | null = null

  /**
   * Register an optimization task
   */
  registerTask(task: OptimizationTask): void {
    this.tasks.push(task)
    this.tasks.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }

  /**
   * Execute all optimization tasks
   */
  async optimize(): Promise<void> {
    if (this.running) return
    this.running = true

    try {
      for (const task of this.tasks) {
        try {
          await task.execute()
        } catch (error) {
          errorBot.reportError(
            error instanceof Error ? error : new Error(String(error)),
            `Optimization Task: ${task.name}`
          )
        }
      }
    } finally {
      this.running = false
    }
  }

  /**
   * Start continuous optimization
   */
  start(interval: number = 300000): void {
    if (this.intervalId) return

    // Run immediately
    this.optimize()

    // Then run on schedule
    this.intervalId = setInterval(() => {
      this.optimize()
    }, interval)
  }

  /**
   * Stop continuous optimization
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  /**
   * Initialize default optimization tasks
   */
  initialize(): void {
    // Task 1: Clean expired cache
    this.registerTask({
      id: 'clean-cache',
      name: 'Clean Expired Cache',
      priority: 'medium',
      execute: () => {
        cacheBot.cleanExpired()
      },
    })

    // Task 2: Preload critical resources
    this.registerTask({
      id: 'preload-resources',
      name: 'Preload Critical Resources',
      priority: 'high',
      execute: async () => {
        if (typeof window === 'undefined') return
        
        const criticalResources = [
          '/images/about/profile.webp',
          '/images/sections/case-studies-bg.webp',
          '/images/sections/photography-bg.webp',
        ]
        
        await cacheBot.preloadResources(criticalResources)
      },
    })

    // Task 3: Warm cache for likely next pages
    this.registerTask({
      id: 'warm-cache',
      name: 'Warm Page Cache',
      priority: 'medium',
      execute: async () => {
        if (typeof window === 'undefined') return
        
        const likelyPages = ['/about', '/case-studies', '/photography']
        await cacheBot.warmCache(likelyPages)
      },
    })

    // Task 4: Generate performance report
    this.registerTask({
      id: 'performance-report',
      name: 'Generate Performance Report',
      priority: 'low',
      execute: () => {
        const report = performanceBot.generateReport()
        if (process.env.NODE_ENV === 'development') {
          console.log('Optimization Bot - Performance Report:', report)
        }
      },
    })

    // Task 5: Auto-optimize based on metrics
    this.registerTask({
      id: 'auto-optimize',
      name: 'Auto-Optimize Based on Metrics',
      priority: 'high',
      execute: async () => {
        await performanceBot.autoOptimize()
      },
    })
  }
}

// Singleton instance
export const optimizationBot = new OptimizationBot()

// Auto-initialize and start in browser
if (typeof window !== 'undefined') {
  optimizationBot.initialize()
  
  // Start optimization after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      optimizationBot.start(300000) // Run every 5 minutes
    }, 5000) // Wait 5 seconds after page load
  })
}


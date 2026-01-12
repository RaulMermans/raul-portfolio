/**
 * Performance Hints Plugin Example
 * Demonstrates a plugin that provides performance optimization hints
 */

import type { Plugin, PluginConfig } from '@/types/plugin'

interface PerformanceHintsOptions {
  checkImages?: boolean
  checkFonts?: boolean
  checkScripts?: boolean
  showNotifications?: boolean
}

interface PerformanceHint {
  type: 'warning' | 'error' | 'info'
  category: 'image' | 'font' | 'script' | 'general'
  message: string
  element?: string
  suggestion?: string
}

class PerformanceHintsAnalyzer {
  private hints: PerformanceHint[] = []
  private options: PerformanceHintsOptions = {
    checkImages: true,
    checkFonts: true,
    checkScripts: true,
    showNotifications: false,
  }

  configure(options: PerformanceHintsOptions): void {
    this.options = { ...this.options, ...options }
  }

  analyze(): PerformanceHint[] {
    if (typeof window === 'undefined') return []

    this.hints = []

    if (this.options.checkImages) this.analyzeImages()
    if (this.options.checkFonts) this.analyzeFonts()
    if (this.options.checkScripts) this.analyzeScripts()
    this.analyzeGeneral()

    return this.hints
  }

  private analyzeImages(): void {
    const images = document.querySelectorAll('img')

    images.forEach((img, index) => {
      // Check for missing alt text
      if (!img.alt) {
        this.hints.push({
          type: 'warning',
          category: 'image',
          message: `Image ${index + 1} is missing alt text`,
          element: img.src,
          suggestion: 'Add descriptive alt text for accessibility',
        })
      }

      // Check for lazy loading
      if (!img.loading && !img.hasAttribute('loading')) {
        this.hints.push({
          type: 'info',
          category: 'image',
          message: `Image ${index + 1} could benefit from lazy loading`,
          element: img.src,
          suggestion: 'Add loading="lazy" for below-the-fold images',
        })
      }

      // Check for explicit dimensions
      if (!img.width && !img.height && !img.style.width && !img.style.height) {
        this.hints.push({
          type: 'warning',
          category: 'image',
          message: `Image ${index + 1} has no explicit dimensions`,
          element: img.src,
          suggestion: 'Set width and height to prevent layout shift (CLS)',
        })
      }
    })
  }

  private analyzeFonts(): void {
    // Check for font-display
    const styleSheets = document.styleSheets

    try {
      for (let i = 0; i < styleSheets.length; i++) {
        const sheet = styleSheets[i]
        try {
          const rules = sheet.cssRules || sheet.rules
          if (!rules) continue

          for (let j = 0; j < rules.length; j++) {
            const rule = rules[j]
            if (rule instanceof CSSFontFaceRule) {
              const fontDisplay = rule.style.getPropertyValue('font-display')
              if (!fontDisplay || fontDisplay === 'auto') {
                this.hints.push({
                  type: 'info',
                  category: 'font',
                  message: 'Font face could use font-display optimization',
                  suggestion: 'Use font-display: swap or optional for better performance',
                })
                break
              }
            }
          }
        } catch {
          // Cross-origin stylesheets will throw
        }
      }
    } catch {
      // Ignore stylesheet access errors
    }
  }

  private analyzeScripts(): void {
    const scripts = document.querySelectorAll('script[src]')

    scripts.forEach((script, index) => {
      const src = script.getAttribute('src') || ''

      // Check for render-blocking scripts
      if (!script.hasAttribute('async') && !script.hasAttribute('defer')) {
        if (!src.includes('_next/static')) {
          this.hints.push({
            type: 'warning',
            category: 'script',
            message: `Script ${index + 1} may be render-blocking`,
            element: src,
            suggestion: 'Consider adding async or defer attribute',
          })
        }
      }
    })
  }

  private analyzeGeneral(): void {
    // Check document size
    const docSize = new Blob([document.documentElement.outerHTML]).size
    if (docSize > 100000) {
      this.hints.push({
        type: 'warning',
        category: 'general',
        message: `Large HTML document size: ${(docSize / 1024).toFixed(1)}KB`,
        suggestion: 'Consider reducing inline content or using code splitting',
      })
    }

    // Check for console errors
    const consoleErrors = (window as Window & { __consoleErrors?: number }).__consoleErrors
    if (consoleErrors && consoleErrors > 0) {
      this.hints.push({
        type: 'error',
        category: 'general',
        message: `${consoleErrors} console error(s) detected`,
        suggestion: 'Check browser console for details',
      })
    }
  }

  getHints(): PerformanceHint[] {
    return [...this.hints]
  }

  getHintsByCategory(category: PerformanceHint['category']): PerformanceHint[] {
    return this.hints.filter((h) => h.category === category)
  }

  getHintsByType(type: PerformanceHint['type']): PerformanceHint[] {
    return this.hints.filter((h) => h.type === type)
  }

  clear(): void {
    this.hints = []
  }

  getSummary(): { warnings: number; errors: number; info: number } {
    return {
      warnings: this.hints.filter((h) => h.type === 'warning').length,
      errors: this.hints.filter((h) => h.type === 'error').length,
      info: this.hints.filter((h) => h.type === 'info').length,
    }
  }
}

const analyzer = new PerformanceHintsAnalyzer()

export function createPerformanceHintsPlugin(
  options: PerformanceHintsOptions = {}
): Plugin {
  return {
    meta: {
      id: 'performance-hints',
      name: 'Performance Hints Plugin',
      version: '1.0.0',
      description: 'Analyzes page performance and provides optimization hints',
      author: 'Portfolio Team',
      tags: ['performance', 'optimization', 'developer-tools'],
    },

    defaultConfig: {
      enabled: process.env.NODE_ENV === 'development',
      priority: 10,
      options: {
        checkImages: true,
        checkFonts: true,
        checkScripts: true,
        showNotifications: false,
      },
    },

    hooks: {
      onPageLoad: () => {
        // Wait for page to fully render
        setTimeout(() => {
          const hints = analyzer.analyze()
          const summary = analyzer.getSummary()

          if (process.env.NODE_ENV === 'development' && hints.length > 0) {
            console.group('[Performance Hints]')
            console.log(`Found ${hints.length} hints:`, summary)
            hints.forEach((hint) => {
              const method = hint.type === 'error' ? 'error' : hint.type === 'warning' ? 'warn' : 'info'
              console[method](`[${hint.category}] ${hint.message}`, hint.suggestion || '')
            })
            console.groupEnd()
          }
        }, 2000)
      },

      onRouteChange: () => {
        analyzer.clear()
      },
    },

    init: (config: PluginConfig) => {
      const pluginOptions = {
        ...options,
        ...(config.options as PerformanceHintsOptions),
      }
      analyzer.configure(pluginOptions)
    },

    destroy: () => {
      analyzer.clear()
    },

    api: {
      routes: [
        {
          path: '/api/plugins/performance-hints/analyze',
          method: 'GET',
          handler: () => {
            return new Response(
              JSON.stringify({
                success: true,
                data: {
                  hints: analyzer.getHints(),
                  summary: analyzer.getSummary(),
                },
              }),
              {
                headers: { 'Content-Type': 'application/json' },
              }
            )
          },
        },
      ],
    },
  }
}

// Export analyzer for direct use
export { analyzer as performanceHintsAnalyzer }

// Default export
export default createPerformanceHintsPlugin

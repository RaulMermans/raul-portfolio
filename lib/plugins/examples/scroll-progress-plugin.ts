/**
 * Scroll Progress Plugin Example
 * Demonstrates a UI-extending plugin that adds a scroll progress indicator
 */

import type { Plugin, PluginConfig } from '@/types/plugin'

interface ScrollProgressOptions {
  color?: string
  height?: number
  position?: 'top' | 'bottom'
  zIndex?: number
}

class ScrollProgressController {
  private element: HTMLDivElement | null = null
  private options: ScrollProgressOptions = {
    color: '#3b82f6',
    height: 3,
    position: 'top',
    zIndex: 9999,
  }
  private boundHandler: (() => void) | null = null

  configure(options: ScrollProgressOptions): void {
    this.options = { ...this.options, ...options }
  }

  mount(): void {
    if (typeof window === 'undefined' || this.element) return

    // Create progress bar element
    this.element = document.createElement('div')
    this.element.id = 'scroll-progress-bar'
    this.element.style.cssText = `
      position: fixed;
      ${this.options.position}: 0;
      left: 0;
      width: 0%;
      height: ${this.options.height}px;
      background-color: ${this.options.color};
      z-index: ${this.options.zIndex};
      transition: width 0.1s ease-out;
      pointer-events: none;
    `

    document.body.appendChild(this.element)

    // Add scroll listener
    this.boundHandler = this.handleScroll.bind(this)
    window.addEventListener('scroll', this.boundHandler, { passive: true })

    // Initial update
    this.handleScroll()
  }

  unmount(): void {
    if (this.element) {
      this.element.remove()
      this.element = null
    }

    if (this.boundHandler) {
      window.removeEventListener('scroll', this.boundHandler)
      this.boundHandler = null
    }
  }

  private handleScroll(): void {
    if (!this.element) return

    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

    this.element.style.width = `${Math.min(100, Math.max(0, progress))}%`
  }

  getProgress(): number {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
  }
}

const controller = new ScrollProgressController()

export function createScrollProgressPlugin(
  options: ScrollProgressOptions = {}
): Plugin {
  return {
    meta: {
      id: 'scroll-progress',
      name: 'Scroll Progress Plugin',
      version: '1.0.0',
      description: 'Adds a visual scroll progress indicator',
      author: 'Portfolio Team',
      tags: ['ui', 'scroll', 'visual'],
    },

    defaultConfig: {
      enabled: true,
      priority: 50,
      options: {
        color: '#3b82f6',
        height: 3,
        position: 'top',
      },
    },

    hooks: {
      onEnable: () => {
        controller.mount()
      },

      onDisable: () => {
        controller.unmount()
      },

      onRouteChange: () => {
        // Reset progress on navigation
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0)
        }
      },
    },

    init: (config: PluginConfig) => {
      const pluginOptions = {
        ...options,
        ...(config.options as ScrollProgressOptions),
      }
      controller.configure(pluginOptions)
    },

    destroy: () => {
      controller.unmount()
    },
  }
}

// Export controller for direct use
export { controller as scrollProgressController }

// Default export
export default createScrollProgressPlugin

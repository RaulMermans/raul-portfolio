/**
 * Analytics Plugin Example
 * Demonstrates how to create a plugin that tracks page views and events
 */

import type { Plugin, PluginConfig } from '@/types/plugin'

interface AnalyticsPluginOptions {
  trackingId?: string
  trackPageViews?: boolean
  trackClicks?: boolean
  debug?: boolean
}

interface AnalyticsEvent {
  type: 'pageview' | 'click' | 'custom'
  path?: string
  element?: string
  data?: Record<string, unknown>
  timestamp: number
}

class AnalyticsTracker {
  private events: AnalyticsEvent[] = []
  private options: AnalyticsPluginOptions = {}

  configure(options: AnalyticsPluginOptions): void {
    this.options = options
  }

  trackPageView(path: string): void {
    if (!this.options.trackPageViews) return

    const event: AnalyticsEvent = {
      type: 'pageview',
      path,
      timestamp: Date.now(),
    }

    this.events.push(event)
    this.log('Page view:', path)
  }

  trackClick(element: string, data?: Record<string, unknown>): void {
    if (!this.options.trackClicks) return

    const event: AnalyticsEvent = {
      type: 'click',
      element,
      data,
      timestamp: Date.now(),
    }

    this.events.push(event)
    this.log('Click:', element, data)
  }

  trackEvent(name: string, data?: Record<string, unknown>): void {
    const event: AnalyticsEvent = {
      type: 'custom',
      element: name,
      data,
      timestamp: Date.now(),
    }

    this.events.push(event)
    this.log('Event:', name, data)
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events]
  }

  getPageViews(): AnalyticsEvent[] {
    return this.events.filter((e) => e.type === 'pageview')
  }

  clear(): void {
    this.events = []
  }

  private log(...args: unknown[]): void {
    if (this.options.debug && process.env.NODE_ENV === 'development') {
      console.log('[Analytics Plugin]', ...args)
    }
  }
}

const tracker = new AnalyticsTracker()

export function createAnalyticsPlugin(
  options: AnalyticsPluginOptions = {}
): Plugin {
  return {
    meta: {
      id: 'analytics',
      name: 'Analytics Plugin',
      version: '1.0.0',
      description: 'Tracks page views and user interactions',
      author: 'Portfolio Team',
      tags: ['analytics', 'tracking'],
    },

    defaultConfig: {
      enabled: true,
      priority: 100,
      options: {
        trackPageViews: true,
        trackClicks: false,
        debug: false,
      },
    },

    hooks: {
      onRegister: () => {
        if (process.env.NODE_ENV === 'development') {
          console.log('[Analytics] Plugin registered')
        }
      },

      onEnable: () => {
        if (typeof window !== 'undefined' && options.trackClicks) {
          document.addEventListener('click', handleClick)
        }
      },

      onDisable: () => {
        if (typeof window !== 'undefined') {
          document.removeEventListener('click', handleClick)
        }
      },

      onRouteChange: (path: string) => {
        tracker.trackPageView(path)
      },

      onPageLoad: () => {
        if (typeof window !== 'undefined') {
          tracker.trackPageView(window.location.pathname)
        }
      },
    },

    init: (config: PluginConfig) => {
      const pluginOptions = {
        ...options,
        ...(config.options as AnalyticsPluginOptions),
      }
      tracker.configure(pluginOptions)
    },

    destroy: () => {
      tracker.clear()
    },

    api: {
      routes: [
        {
          path: '/api/plugins/analytics/events',
          method: 'GET',
          handler: () => {
            return new Response(
              JSON.stringify({
                success: true,
                data: tracker.getEvents(),
              }),
              {
                headers: { 'Content-Type': 'application/json' },
              }
            )
          },
        },
        {
          path: '/api/plugins/analytics/pageviews',
          method: 'GET',
          handler: () => {
            return new Response(
              JSON.stringify({
                success: true,
                data: tracker.getPageViews(),
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

function handleClick(event: MouseEvent): void {
  const target = event.target as HTMLElement
  const element = target.tagName.toLowerCase()
  const id = target.id || undefined
  const className = target.className || undefined

  tracker.trackClick(element, { id, className })
}

// Export tracker for direct use
export { tracker as analyticsTracker }

// Default export for easy registration
export default createAnalyticsPlugin

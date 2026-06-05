/**
 * Analytics & Insights Bot
 * Tracks user behavior and provides insights
 * Runs in background to analyze user patterns
 */

interface UserEvent {
  type: 'pageview' | 'click' | 'scroll' | 'time' | 'exit'
  timestamp: number
  url: string
  data?: Record<string, any>
}

interface UserSession {
  sessionId: string
  startTime: number
  endTime?: number
  events: UserEvent[]
  pages: string[]
  duration: number
}

interface AnalyticsReport {
  timestamp: number
  sessions: number
  pageviews: number
  averageSessionDuration: number
  popularPages: { url: string; views: number }[]
  dropOffPoints: { url: string; exits: number }[]
  engagement: {
    averageScrollDepth: number
    averageTimeOnPage: number
  }
}

class AnalyticsBot {
  private sessions: Map<string, UserSession> = new Map()
  private events: UserEvent[] = []
  private readonly maxEvents = 1000
  private readonly maxSessions = 100
  private sessionId: string | null = null

  /**
   * Track pageview
   */
  trackPageview(url?: string): void {
    if (typeof window === 'undefined') return

    const pageUrl = url || window.location.href
    this.ensureSession()

    const event: UserEvent = {
      type: 'pageview',
      timestamp: Date.now(),
      url: pageUrl,
    }

    this.addEvent(event)
  }

  /**
   * Track click
   */
  trackClick(element: HTMLElement | string, data?: Record<string, any>): void {
    if (typeof window === 'undefined') return

    this.ensureSession()

    const elementInfo =
      typeof element === 'string'
        ? { tag: element }
        : {
            tag: element.tagName.toLowerCase(),
            id: element.id,
            class: element.className,
            text: element.textContent?.substring(0, 50),
          }

    const event: UserEvent = {
      type: 'click',
      timestamp: Date.now(),
      url: window.location.href,
      data: { ...elementInfo, ...data },
    }

    this.addEvent(event)
  }

  /**
   * Track scroll depth
   */
  trackScroll(): void {
    if (typeof window === 'undefined') return

    this.ensureSession()

    const scrollDepth = Math.round(
      ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
    )

    const event: UserEvent = {
      type: 'scroll',
      timestamp: Date.now(),
      url: window.location.href,
      data: { depth: scrollDepth },
    }

    this.addEvent(event)
  }

  /**
   * Track time on page
   */
  trackTimeOnPage(): void {
    if (typeof window === 'undefined') return

    this.ensureSession()

    const timeOnPage = Date.now() - (this.sessions.get(this.sessionId!)?.startTime || Date.now())

    const event: UserEvent = {
      type: 'time',
      timestamp: Date.now(),
      url: window.location.href,
      data: { duration: timeOnPage },
    }

    this.addEvent(event)
  }

  /**
   * Track exit intent
   */
  trackExit(): void {
    if (typeof window === 'undefined' || !this.sessionId) return

    const session = this.sessions.get(this.sessionId)
    if (session) {
      session.endTime = Date.now()
      session.duration = session.endTime - session.startTime

      const event: UserEvent = {
        type: 'exit',
        timestamp: Date.now(),
        url: window.location.href,
        data: { sessionDuration: session.duration },
      }

      this.addEvent(event)
    }
  }

  /**
   * Generate analytics report
   */
  generateReport(): AnalyticsReport {
    const sessions = Array.from(this.sessions.values())
    const pageviews = this.events.filter((e) => e.type === 'pageview').length

    // Calculate average session duration
    const completedSessions = sessions.filter((s) => s.endTime)
    const averageSessionDuration =
      completedSessions.length > 0
        ? completedSessions.reduce((sum, s) => sum + s.duration, 0) / completedSessions.length
        : 0

    // Popular pages
    const pageViews = new Map<string, number>()
    this.events
      .filter((e) => e.type === 'pageview')
      .forEach((e) => {
        pageViews.set(e.url, (pageViews.get(e.url) || 0) + 1)
      })
    const popularPages = Array.from(pageViews.entries())
      .map(([url, views]) => ({ url, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)

    // Drop-off points
    const exits = new Map<string, number>()
    this.events
      .filter((e) => e.type === 'exit')
      .forEach((e) => {
        exits.set(e.url, (exits.get(e.url) || 0) + 1)
      })
    const dropOffPoints = Array.from(exits.entries())
      .map(([url, exits]) => ({ url, exits }))
      .sort((a, b) => b.exits - a.exits)
      .slice(0, 10)

    // Engagement metrics
    const scrollEvents = this.events.filter((e) => e.type === 'scroll')
    const averageScrollDepth =
      scrollEvents.length > 0
        ? scrollEvents.reduce((sum, e) => sum + (e.data?.depth || 0), 0) / scrollEvents.length
        : 0

    const timeEvents = this.events.filter((e) => e.type === 'time')
    const averageTimeOnPage =
      timeEvents.length > 0
        ? timeEvents.reduce((sum, e) => sum + (e.data?.duration || 0), 0) / timeEvents.length
        : 0

    return {
      timestamp: Date.now(),
      sessions: sessions.length,
      pageviews,
      averageSessionDuration,
      popularPages,
      dropOffPoints,
      engagement: {
        averageScrollDepth,
        averageTimeOnPage,
      },
    }
  }

  /**
   * Ensure session exists
   */
  private ensureSession(): void {
    if (!this.sessionId || !this.sessions.has(this.sessionId)) {
      this.sessionId = this.generateSessionId()
      this.sessions.set(this.sessionId, {
        sessionId: this.sessionId,
        startTime: Date.now(),
        events: [],
        pages: [],
        duration: 0,
      })

      // Clean old sessions
      if (this.sessions.size > this.maxSessions) {
        const oldestSession = Array.from(this.sessions.values()).sort(
          (a, b) => a.startTime - b.startTime
        )[0]
        this.sessions.delete(oldestSession.sessionId)
      }
    }
  }

  /**
   * Generate session ID
   */
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(7)}`
  }

  /**
   * Add event
   */
  private addEvent(event: UserEvent): void {
    this.events.push(event)

    // Clean old events
    if (this.events.length > this.maxEvents) {
      this.events.shift()
    }

    // Add to session
    if (this.sessionId) {
      const session = this.sessions.get(this.sessionId)
      if (session) {
        session.events.push(event)
        if (event.type === 'pageview' && !session.pages.includes(event.url)) {
          session.pages.push(event.url)
        }
      }
    }
  }

  /**
   * Start monitoring (runs in background)
   */
  startMonitoring(): void {
    if (typeof window === 'undefined') return

    // Track initial pageview
    this.trackPageview()

    // Track scroll depth
    let lastScrollDepth = 0
    window.addEventListener(
      'scroll',
      () => {
        const scrollDepth = Math.round(
          ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
        )
        // Only track at 25%, 50%, 75%, 100%
        if (scrollDepth >= 25 && lastScrollDepth < 25) {
          this.trackScroll()
          lastScrollDepth = 25
        } else if (scrollDepth >= 50 && lastScrollDepth < 50) {
          this.trackScroll()
          lastScrollDepth = 50
        } else if (scrollDepth >= 75 && lastScrollDepth < 75) {
          this.trackScroll()
          lastScrollDepth = 75
        } else if (scrollDepth >= 100 && lastScrollDepth < 100) {
          this.trackScroll()
          lastScrollDepth = 100
        }
      },
      { passive: true }
    )

    // Track clicks (sample - not all clicks)
    document.addEventListener(
      'click',
      (e) => {
        const target = e.target as HTMLElement
        // Only track important clicks (links, buttons)
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a, button')) {
          this.trackClick(target)
        }
      },
      { passive: true }
    )

    // Track time on page (every 30 seconds)
    setInterval(() => {
      this.trackTimeOnPage()
    }, 30000)

    // Track exit
    window.addEventListener('beforeunload', () => {
      this.trackExit()
    })
  }
}

// Singleton instance
export const analyticsBot = new AnalyticsBot()

// Auto-start monitoring in browser (non-blocking)
if (typeof window !== 'undefined') {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    analyticsBot.startMonitoring()
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      analyticsBot.startMonitoring()
    })
  }
}

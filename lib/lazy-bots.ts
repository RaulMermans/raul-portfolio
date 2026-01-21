/**
 * Lazy Bot Loader
 * Loads non-critical bots after initial page load
 */

if (typeof window !== 'undefined') {
  // Client-side only - lazy load non-critical bots
  // Use requestIdleCallback for better performance
  const loadBots = () => {
    // Load bots when browser is idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        import('@/lib/departments').catch(() => {})
        import('@/lib/performance-bot').catch(() => {})
        import('@/lib/cache-bot').catch(() => {})
        import('@/lib/optimization-bot').catch(() => {})
        import('@/lib/seo-bot').catch(() => {})
        import('@/lib/image-optimization-bot').catch(() => {})
        import('@/lib/accessibility-bot').catch(() => {})
        import('@/lib/analytics-bot').catch(() => {})
        import('@/lib/cleanup-bot').catch(() => {})
        import('@/lib/animation-expert').catch(() => {})
        import('@/lib/mobile-optimizer').catch(() => {})
        import('@/lib/detective-bot').catch(() => {})
      }, { timeout: 2000 })
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        import('@/lib/departments').catch(() => {})
        import('@/lib/performance-bot').catch(() => {})
        import('@/lib/cache-bot').catch(() => {})
        import('@/lib/optimization-bot').catch(() => {})
        import('@/lib/seo-bot').catch(() => {})
        import('@/lib/image-optimization-bot').catch(() => {})
        import('@/lib/accessibility-bot').catch(() => {})
        import('@/lib/analytics-bot').catch(() => {})
        import('@/lib/cleanup-bot').catch(() => {})
        import('@/lib/animation-expert').catch(() => {})
        import('@/lib/mobile-optimizer').catch(() => {})
        import('@/lib/detective-bot').catch(() => {})
      }, 1000)
    }
  }

  // Load after DOM is ready
  if (document.readyState === 'complete') {
    loadBots()
  } else {
    window.addEventListener('load', loadBots)
  }
}


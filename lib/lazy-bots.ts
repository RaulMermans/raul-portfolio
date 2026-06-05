/**
 * Lazy Bot Loader
 * Loads development-only diagnostics after initial page load.
 */

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  const loadBots = () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        import('@/lib/performance-bot').catch(() => {})
      }, { timeout: 2000 })
    } else {
      setTimeout(() => {
        import('@/lib/performance-bot').catch(() => {})
      }, 1000)
    }
  }

  if (document.readyState === 'complete') {
    loadBots()
  } else {
    window.addEventListener('load', loadBots)
  }
}

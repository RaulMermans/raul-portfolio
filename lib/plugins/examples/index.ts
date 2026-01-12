/**
 * Example Plugins
 * These demonstrate how to build plugins for the portfolio
 */

export {
  createAnalyticsPlugin,
  analyticsTracker,
  default as analyticsPlugin,
} from './analytics-plugin'

export {
  createScrollProgressPlugin,
  scrollProgressController,
  default as scrollProgressPlugin,
} from './scroll-progress-plugin'

export {
  createPerformanceHintsPlugin,
  performanceHintsAnalyzer,
  default as performanceHintsPlugin,
} from './performance-hints-plugin'

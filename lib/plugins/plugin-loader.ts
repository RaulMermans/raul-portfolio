/**
 * Plugin Loader
 * Handles plugin configuration and automatic loading
 */

import type { Plugin, PluginConfig } from '@/types/plugin'
import { pluginManager } from './plugin-manager'
import {
  createAnalyticsPlugin,
  createScrollProgressPlugin,
  createPerformanceHintsPlugin,
} from './examples'

/**
 * Plugin configuration
 * Enable/disable plugins and customize their options
 */
export const pluginConfig: Record<string, PluginConfig> = {
  // Analytics plugin - tracks page views
  analytics: {
    enabled: true,
    priority: 100,
    options: {
      trackPageViews: true,
      trackClicks: false,
      debug: process.env.NODE_ENV === 'development',
    },
  },

  // Scroll progress indicator
  'scroll-progress': {
    enabled: false, // Disabled by default, enable as needed
    priority: 50,
    options: {
      color: '#3b82f6',
      height: 3,
      position: 'top',
    },
  },

  // Performance hints (dev only)
  'performance-hints': {
    enabled: process.env.NODE_ENV === 'development',
    priority: 10,
    options: {
      checkImages: true,
      checkFonts: true,
      checkScripts: true,
    },
  },
}

/**
 * Built-in plugin factories
 */
const builtInPlugins: Record<string, () => Plugin> = {
  analytics: createAnalyticsPlugin,
  'scroll-progress': createScrollProgressPlugin,
  'performance-hints': createPerformanceHintsPlugin,
}

/**
 * Load all configured plugins
 */
export async function loadPlugins(
  customPlugins?: Array<{ plugin: Plugin; config?: PluginConfig }>
): Promise<void> {
  // Load built-in plugins based on config
  for (const [id, factory] of Object.entries(builtInPlugins)) {
    const config = pluginConfig[id]

    // Skip disabled plugins
    if (config && config.enabled === false) {
      continue
    }

    try {
      const plugin = factory()
      await pluginManager.register(plugin, config)
    } catch (error) {
      console.error(`Failed to load plugin "${id}":`, error)
    }
  }

  // Load custom plugins
  if (customPlugins) {
    for (const { plugin, config } of customPlugins) {
      try {
        await pluginManager.register(plugin, config)
      } catch (error) {
        console.error(`Failed to load custom plugin "${plugin.meta.id}":`, error)
      }
    }
  }

  if (process.env.NODE_ENV === 'development') {
    const report = pluginManager.generateReport()
    console.log(`[Plugins] Loaded ${report.enabledPlugins}/${report.totalPlugins} plugins`)
  }
}

/**
 * Register a single plugin dynamically
 */
export async function registerPlugin(
  plugin: Plugin,
  config?: PluginConfig
): Promise<void> {
  await pluginManager.register(plugin, config)
}

/**
 * Create and register a plugin from a factory
 */
export async function registerPluginFactory(
  factory: () => Plugin,
  config?: PluginConfig
): Promise<void> {
  const plugin = factory()
  await pluginManager.register(plugin, config)
}

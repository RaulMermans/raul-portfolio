/**
 * Plugin System
 * Central export for the portfolio plugin architecture
 */

// Core
export { pluginManager } from './plugin-manager'

// Types (re-export for convenience)
export type {
  Plugin,
  PluginConfig,
  PluginMeta,
  PluginHooks,
  PluginStatus,
  PluginEvent,
  PluginEventHandler,
  PluginComponents,
  PluginApi,
  PluginFactory,
} from '@/types/plugin'

// Example plugins
export * from './examples'

// Plugin loader
export { loadPlugins, pluginConfig } from './plugin-loader'

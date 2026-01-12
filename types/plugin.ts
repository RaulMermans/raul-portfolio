/**
 * Plugin System Types
 * Defines interfaces for the portfolio plugin architecture
 */

import type { ReactNode } from 'react'

/**
 * Plugin lifecycle hooks
 */
export interface PluginHooks {
  /** Called when plugin is first registered */
  onRegister?: () => void | Promise<void>
  /** Called when plugin is enabled */
  onEnable?: () => void | Promise<void>
  /** Called when plugin is disabled */
  onDisable?: () => void | Promise<void>
  /** Called on page navigation (client-side) */
  onRouteChange?: (path: string) => void | Promise<void>
  /** Called when page loads (client-side) */
  onPageLoad?: () => void | Promise<void>
  /** Called before page unload */
  onBeforeUnload?: () => void | Promise<void>
}

/**
 * Plugin configuration options
 */
export interface PluginConfig {
  /** Enable/disable the plugin */
  enabled?: boolean
  /** Plugin-specific options */
  options?: Record<string, unknown>
  /** Priority for execution order (higher = earlier) */
  priority?: number
}

/**
 * Plugin metadata
 */
export interface PluginMeta {
  /** Unique plugin identifier */
  id: string
  /** Human-readable name */
  name: string
  /** Plugin version (semver) */
  version: string
  /** Brief description */
  description?: string
  /** Plugin author */
  author?: string
  /** Plugin homepage/docs URL */
  homepage?: string
  /** Required dependencies (other plugin IDs) */
  dependencies?: string[]
  /** Plugin tags for categorization */
  tags?: string[]
}

/**
 * API route handler context
 */
export interface PluginApiContext {
  request: Request
  params: Record<string, string>
}

/**
 * Plugin API extensions
 */
export interface PluginApi {
  /** Register API route handlers */
  routes?: {
    path: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    handler: (ctx: PluginApiContext) => Response | Promise<Response>
  }[]
}

/**
 * Plugin component slots for UI extension
 */
export interface PluginComponents {
  /** Component to render in <head> */
  Head?: () => ReactNode
  /** Component to render before main content */
  BeforeContent?: () => ReactNode
  /** Component to render after main content */
  AfterContent?: () => ReactNode
  /** Component to render in footer area */
  Footer?: () => ReactNode
  /** Wrapper component for pages */
  PageWrapper?: (props: { children: ReactNode }) => ReactNode
}

/**
 * Plugin status information
 */
export interface PluginStatus {
  id: string
  name: string
  version: string
  enabled: boolean
  loaded: boolean
  error?: string
  loadedAt?: number
}

/**
 * Complete plugin definition
 */
export interface Plugin {
  /** Plugin metadata */
  meta: PluginMeta
  /** Default configuration */
  defaultConfig?: PluginConfig
  /** Lifecycle hooks */
  hooks?: PluginHooks
  /** API extensions */
  api?: PluginApi
  /** UI components */
  components?: PluginComponents
  /** Plugin initialization */
  init?: (config: PluginConfig) => void | Promise<void>
  /** Plugin cleanup */
  destroy?: () => void | Promise<void>
}

/**
 * Plugin factory function type
 */
export type PluginFactory = (config?: PluginConfig) => Plugin

/**
 * Plugin manager events
 */
export type PluginEvent =
  | 'plugin:registered'
  | 'plugin:enabled'
  | 'plugin:disabled'
  | 'plugin:error'
  | 'route:change'
  | 'page:load'

/**
 * Plugin event handler
 */
export type PluginEventHandler = (data: {
  event: PluginEvent
  pluginId?: string
  payload?: unknown
}) => void

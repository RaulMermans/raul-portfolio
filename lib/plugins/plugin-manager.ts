/**
 * Plugin Manager
 * Central registry and lifecycle manager for all plugins
 */

import type {
  Plugin,
  PluginConfig,
  PluginStatus,
  PluginEvent,
  PluginEventHandler,
  PluginMeta,
} from '@/types/plugin'

interface RegisteredPlugin {
  plugin: Plugin
  config: PluginConfig
  status: PluginStatus
}

class PluginManager {
  private plugins: Map<string, RegisteredPlugin> = new Map()
  private eventHandlers: Map<PluginEvent, Set<PluginEventHandler>> = new Map()
  private initialized = false

  /**
   * Register a plugin
   */
  async register(plugin: Plugin, config?: PluginConfig): Promise<void> {
    const { meta } = plugin

    if (this.plugins.has(meta.id)) {
      console.warn(`Plugin "${meta.id}" is already registered. Skipping.`)
      return
    }

    // Check dependencies
    if (meta.dependencies?.length) {
      for (const dep of meta.dependencies) {
        if (!this.plugins.has(dep)) {
          throw new Error(
            `Plugin "${meta.id}" depends on "${dep}" which is not registered`
          )
        }
      }
    }

    const mergedConfig: PluginConfig = {
      enabled: true,
      priority: 0,
      ...plugin.defaultConfig,
      ...config,
    }

    const status: PluginStatus = {
      id: meta.id,
      name: meta.name,
      version: meta.version,
      enabled: mergedConfig.enabled ?? true,
      loaded: false,
    }

    this.plugins.set(meta.id, {
      plugin,
      config: mergedConfig,
      status,
    })

    // Call onRegister hook
    try {
      await plugin.hooks?.onRegister?.()
      this.emit('plugin:registered', meta.id)
    } catch (error) {
      status.error = error instanceof Error ? error.message : 'Registration failed'
      this.emit('plugin:error', meta.id, { error })
    }

    // Initialize if enabled
    if (mergedConfig.enabled) {
      await this.enable(meta.id)
    }
  }

  /**
   * Enable a plugin
   */
  async enable(pluginId: string): Promise<void> {
    const registered = this.plugins.get(pluginId)
    if (!registered) {
      throw new Error(`Plugin "${pluginId}" is not registered`)
    }

    const { plugin, config, status } = registered

    if (status.enabled && status.loaded) {
      return
    }

    try {
      // Initialize plugin
      await plugin.init?.(config)

      // Call onEnable hook
      await plugin.hooks?.onEnable?.()

      status.enabled = true
      status.loaded = true
      status.loadedAt = Date.now()
      status.error = undefined

      this.emit('plugin:enabled', pluginId)

      if (process.env.NODE_ENV === 'development') {
        console.log(`Plugin "${plugin.meta.name}" enabled`)
      }
    } catch (error) {
      status.error = error instanceof Error ? error.message : 'Enable failed'
      status.loaded = false
      this.emit('plugin:error', pluginId, { error })
      throw error
    }
  }

  /**
   * Disable a plugin
   */
  async disable(pluginId: string): Promise<void> {
    const registered = this.plugins.get(pluginId)
    if (!registered) {
      throw new Error(`Plugin "${pluginId}" is not registered`)
    }

    const { plugin, status } = registered

    if (!status.enabled) {
      return
    }

    try {
      // Call onDisable hook
      await plugin.hooks?.onDisable?.()

      // Cleanup
      await plugin.destroy?.()

      status.enabled = false
      status.loaded = false

      this.emit('plugin:disabled', pluginId)

      if (process.env.NODE_ENV === 'development') {
        console.log(`Plugin "${plugin.meta.name}" disabled`)
      }
    } catch (error) {
      status.error = error instanceof Error ? error.message : 'Disable failed'
      this.emit('plugin:error', pluginId, { error })
      throw error
    }
  }

  /**
   * Unregister a plugin completely
   */
  async unregister(pluginId: string): Promise<void> {
    const registered = this.plugins.get(pluginId)
    if (!registered) {
      return
    }

    // Check if other plugins depend on this one
    for (const [id, reg] of this.plugins) {
      if (reg.plugin.meta.dependencies?.includes(pluginId)) {
        throw new Error(
          `Cannot unregister "${pluginId}": plugin "${id}" depends on it`
        )
      }
    }

    await this.disable(pluginId)
    this.plugins.delete(pluginId)
  }

  /**
   * Get plugin by ID
   */
  get(pluginId: string): Plugin | undefined {
    return this.plugins.get(pluginId)?.plugin
  }

  /**
   * Get plugin config
   */
  getConfig(pluginId: string): PluginConfig | undefined {
    return this.plugins.get(pluginId)?.config
  }

  /**
   * Update plugin config
   */
  updateConfig(pluginId: string, config: Partial<PluginConfig>): void {
    const registered = this.plugins.get(pluginId)
    if (!registered) {
      throw new Error(`Plugin "${pluginId}" is not registered`)
    }

    registered.config = { ...registered.config, ...config }
  }

  /**
   * Get plugin status
   */
  getStatus(pluginId: string): PluginStatus | undefined {
    return this.plugins.get(pluginId)?.status
  }

  /**
   * Get all plugin statuses
   */
  getAllStatus(): PluginStatus[] {
    return Array.from(this.plugins.values())
      .map(({ status }) => status)
      .sort((a, b) => a.name.localeCompare(b.name))
  }

  /**
   * Get all enabled plugins (sorted by priority)
   */
  getEnabled(): Plugin[] {
    return Array.from(this.plugins.values())
      .filter(({ status }) => status.enabled && status.loaded)
      .sort((a, b) => (b.config.priority ?? 0) - (a.config.priority ?? 0))
      .map(({ plugin }) => plugin)
  }

  /**
   * Get plugin metadata
   */
  getMeta(pluginId: string): PluginMeta | undefined {
    return this.plugins.get(pluginId)?.plugin.meta
  }

  /**
   * Get all registered plugin IDs
   */
  getPluginIds(): string[] {
    return Array.from(this.plugins.keys())
  }

  /**
   * Check if plugin is registered
   */
  has(pluginId: string): boolean {
    return this.plugins.has(pluginId)
  }

  /**
   * Check if plugin is enabled
   */
  isEnabled(pluginId: string): boolean {
    return this.plugins.get(pluginId)?.status.enabled ?? false
  }

  /**
   * Trigger route change hooks
   */
  async onRouteChange(path: string): Promise<void> {
    this.emit('route:change', undefined, { path })

    for (const plugin of this.getEnabled()) {
      try {
        await plugin.hooks?.onRouteChange?.(path)
      } catch (error) {
        console.error(`Plugin "${plugin.meta.id}" route change error:`, error)
      }
    }
  }

  /**
   * Trigger page load hooks
   */
  async onPageLoad(): Promise<void> {
    this.emit('page:load')

    for (const plugin of this.getEnabled()) {
      try {
        await plugin.hooks?.onPageLoad?.()
      } catch (error) {
        console.error(`Plugin "${plugin.meta.id}" page load error:`, error)
      }
    }
  }

  /**
   * Trigger before unload hooks
   */
  async onBeforeUnload(): Promise<void> {
    for (const plugin of this.getEnabled()) {
      try {
        await plugin.hooks?.onBeforeUnload?.()
      } catch (error) {
        console.error(`Plugin "${plugin.meta.id}" before unload error:`, error)
      }
    }
  }

  /**
   * Subscribe to plugin events
   */
  on(event: PluginEvent, handler: PluginEventHandler): () => void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set())
    }
    this.eventHandlers.get(event)!.add(handler)

    // Return unsubscribe function
    return () => {
      this.eventHandlers.get(event)?.delete(handler)
    }
  }

  /**
   * Emit plugin event
   */
  private emit(event: PluginEvent, pluginId?: string, payload?: unknown): void {
    const handlers = this.eventHandlers.get(event)
    if (handlers) {
      for (const handler of handlers) {
        try {
          handler({ event, pluginId, payload })
        } catch (error) {
          console.error(`Event handler error for "${event}":`, error)
        }
      }
    }
  }

  /**
   * Initialize plugin system (call once on app start)
   */
  async initialize(): Promise<void> {
    if (this.initialized) return
    this.initialized = true

    // Set up browser event listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => this.onPageLoad())
      window.addEventListener('beforeunload', () => this.onBeforeUnload())

      // Listen for Next.js route changes
      if ('navigation' in window) {
        (window as Window & { navigation?: { addEventListener: (event: string, handler: () => void) => void } })
          .navigation?.addEventListener('navigate', () => {
            this.onRouteChange(window.location.pathname)
          })
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Plugin system initialized')
    }
  }

  /**
   * Get API routes from all enabled plugins
   */
  getApiRoutes() {
    const routes: Array<{
      pluginId: string
      path: string
      method: string
      handler: (ctx: { request: Request; params: Record<string, string> }) => Response | Promise<Response>
    }> = []

    for (const plugin of this.getEnabled()) {
      if (plugin.api?.routes) {
        for (const route of plugin.api.routes) {
          routes.push({
            pluginId: plugin.meta.id,
            ...route,
          })
        }
      }
    }

    return routes
  }

  /**
   * Generate status report
   */
  generateReport(): {
    totalPlugins: number
    enabledPlugins: number
    disabledPlugins: number
    errorPlugins: number
    plugins: PluginStatus[]
  } {
    const statuses = this.getAllStatus()

    return {
      totalPlugins: statuses.length,
      enabledPlugins: statuses.filter((s) => s.enabled).length,
      disabledPlugins: statuses.filter((s) => !s.enabled).length,
      errorPlugins: statuses.filter((s) => s.error).length,
      plugins: statuses,
    }
  }
}

// Singleton instance
export const pluginManager = new PluginManager()

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  pluginManager.initialize()
}

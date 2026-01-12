'use client'

/**
 * Plugin Provider
 * Client-side component that initializes and manages plugins
 */

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { pluginManager, loadPlugins } from '@/lib/plugins'

interface PluginProviderProps {
  children: React.ReactNode
}

export default function PluginProvider({ children }: PluginProviderProps) {
  const pathname = usePathname()
  const initialized = useRef(false)
  const previousPath = useRef<string | null>(null)

  // Initialize plugins once on mount
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    loadPlugins().catch((error) => {
      console.error('[PluginProvider] Failed to load plugins:', error)
    })
  }, [])

  // Handle route changes
  useEffect(() => {
    if (previousPath.current !== null && previousPath.current !== pathname) {
      pluginManager.onRouteChange(pathname)
    }
    previousPath.current = pathname
  }, [pathname])

  return <>{children}</>
}

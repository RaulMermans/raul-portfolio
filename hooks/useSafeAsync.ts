'use client'

import { useState, useCallback } from 'react'
import { useErrorHandler } from './useErrorHandler'

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

/**
 * Hook for safe async operations
 * Prevents unhandled promise rejections from breaking the app
 */
export function useSafeAsync<T>() {
  const { handleError, clearError } = useErrorHandler()
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (asyncFn: () => Promise<T>, context?: string) => {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      clearError()

      try {
        const data = await asyncFn()
        setState({ data, loading: false, error: null })
        return { success: true as const, data }
      } catch (error) {
        const appError = handleError(error, context)
        const errorObj = error instanceof Error ? error : new Error(String(error))
        setState({ data: null, loading: false, error: errorObj })
        return { success: false as const, error: appError }
      }
    },
    [handleError, clearError]
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
    clearError()
  }, [clearError])

  return {
    ...state,
    execute,
    reset,
  }
}


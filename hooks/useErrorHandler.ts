'use client'

import { useState, useCallback } from 'react'
import { logError, getUserFriendlyError, handleApiError, type AppError } from '@/lib/errors'

/**
 * Hook for error handling
 * Provides consistent error state management
 */
export function useErrorHandler() {
  const [error, setError] = useState<AppError | null>(null)
  const [isError, setIsError] = useState(false)

  const handleError = useCallback((err: unknown, context?: string) => {
    logError(err, context)
    const appError = handleApiError(err)
    setError(appError)
    setIsError(true)
    return appError
  }, [])

  const clearError = useCallback(() => {
    setError(null)
    setIsError(false)
  }, [])

  const getUserMessage = useCallback((err: unknown): string => {
    return getUserFriendlyError(err)
  }, [])

  return {
    error,
    isError,
    handleError,
    clearError,
    getUserMessage,
  }
}


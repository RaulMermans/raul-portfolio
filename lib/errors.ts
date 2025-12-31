/**
 * Error handling utilities
 * Provides consistent error handling, logging, and user-friendly error messages
 */

export interface AppError {
  message: string
  code?: string
  statusCode?: number
  details?: unknown
}

export class CustomError extends Error {
  code?: string
  statusCode?: number
  details?: unknown

  constructor(message: string, code?: string, statusCode?: number, details?: unknown) {
    super(message)
    this.name = 'CustomError'
    this.code = code
    this.statusCode = statusCode
    this.details = details
    Error.captureStackTrace(this, this.constructor)
  }
}

/**
 * Logs errors with context
 */
export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error${context ? ` - ${context}` : ''}]`, error)
  }
  
  // In production, you can send to error tracking service
  // Example: Sentry.captureException(error, { tags: { context } })
}

/**
 * Creates a user-friendly error message
 */
export function getUserFriendlyError(error: unknown): string {
  if (error instanceof CustomError) {
    return error.message
  }
  
  if (error instanceof Error) {
    // Don't expose technical errors to users
    if (process.env.NODE_ENV === 'development') {
      return error.message
    }
    return 'Something went wrong. Please try again later.'
  }
  
  if (typeof error === 'string') {
    return error
  }
  
  return 'An unexpected error occurred. Please refresh the page.'
}

/**
 * Handles API errors consistently
 */
export function handleApiError(error: unknown): AppError {
  logError(error, 'API')
  
  if (error instanceof CustomError) {
    return {
      message: error.message,
      code: error.code,
      statusCode: error.statusCode,
      details: error.details,
    }
  }
  
  if (error instanceof Error) {
    return {
      message: getUserFriendlyError(error),
      code: 'UNKNOWN_ERROR',
      statusCode: 500,
    }
  }
  
  return {
    message: getUserFriendlyError(error),
    code: 'UNKNOWN_ERROR',
    statusCode: 500,
  }
}

/**
 * Validates and normalizes error responses
 */
export function normalizeErrorResponse(error: unknown): {
  success: false
  error: AppError
} {
  const appError = handleApiError(error)
  return {
    success: false,
    error: appError,
  }
}


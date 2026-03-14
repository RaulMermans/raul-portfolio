/**
 * Validation utilities
 * Provides type-safe validation for forms, data, and user inputs
 */

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Validates contact form data
 */
export function validateContactForm(data: {
  name?: string
  email?: string
  message?: string
}): ValidationResult {
  const errors: string[] = []

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please enter a valid email address')
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Sanitizes string input
 */
export function sanitizeString(input: string, maxLength?: number): string {
  let sanitized = input.trim()
  
  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }
  
  return sanitized
}

/**
 * Validates URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Type guard for checking if value is not null/undefined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

/**
 * Type guard for checking if value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * Type guard for checking if value is a number
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * Type guard for checking if value is an object
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Safe number parsing
 */
export function safeParseInt(value: string | number | null | undefined, defaultValue = 0): number {
  if (typeof value === 'number') return value
  if (!value) return defaultValue
  const parsed = parseInt(String(value), 10)
  return isNaN(parsed) ? defaultValue : parsed
}

/**
 * Safe float parsing
 */
export function safeParseFloat(value: string | number | null | undefined, defaultValue = 0): number {
  if (typeof value === 'number') return value
  if (!value) return defaultValue
  const parsed = parseFloat(String(value))
  return isNaN(parsed) ? defaultValue : parsed
}


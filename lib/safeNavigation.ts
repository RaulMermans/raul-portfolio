/**
 * Safe navigation utilities
 * Prevents errors from undefined/null values
 */

/**
 * Safely gets a nested property value
 */
export function safeGet<T>(
  obj: unknown,
  path: string,
  defaultValue?: T
): T | undefined {
  if (!obj || typeof obj !== 'object') return defaultValue

  const keys = path.split('.')
  let current: unknown = obj

  for (const key of keys) {
    if (current === null || current === undefined) return defaultValue
    if (typeof current !== 'object') return defaultValue
    current = (current as Record<string, unknown>)[key]
  }

  return (current as T) ?? defaultValue
}

/**
 * Safely accesses array element
 */
export function safeArrayAccess<T>(array: T[] | null | undefined, index: number): T | undefined {
  if (!array || !Array.isArray(array)) return undefined
  if (index < 0 || index >= array.length) return undefined
  return array[index]
}

/**
 * Safely calls a function
 */
export function safeCall<T extends (...args: unknown[]) => unknown>(
  fn: T | null | undefined,
  ...args: Parameters<T>
): ReturnType<T> | undefined {
  if (typeof fn !== 'function') return undefined
  try {
    return fn(...args) as ReturnType<T>
  } catch {
    return undefined
  }
}

/**
 * Safely parses JSON
 */
export function safeParseJSON<T>(json: string, defaultValue?: T): T | undefined {
  try {
    return JSON.parse(json) as T
  } catch {
    return defaultValue
  }
}

/**
 * Safely stringifies JSON
 */
export function safeStringifyJSON(obj: unknown, defaultValue = '{}'): string {
  try {
    return JSON.stringify(obj)
  } catch {
    return defaultValue
  }
}

/**
 * Type-safe object property access
 */
export function hasProperty<K extends string>(
  obj: unknown,
  prop: K
): obj is Record<K, unknown> {
  return typeof obj === 'object' && obj !== null && prop in obj
}

/**
 * Type-safe array check
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value)
}


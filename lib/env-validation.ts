/**
 * Environment Variable Validation
 * Validates required environment variables on startup
 */

interface EnvConfig {
  required: string[]
  optional: string[]
  defaults?: Record<string, string>
}

const envConfig: EnvConfig = {
  required: ['NEXT_PUBLIC_SITE_URL'],
  optional: [
    'NEXT_PUBLIC_GA_MEASUREMENT_ID',
    'RESEND_API_KEY',
    'CONTACT_EMAIL',
    'FROM_EMAIL',
  ],
  defaults: {
    CONTACT_EMAIL: 'raulmermans@gmail.com',
    FROM_EMAIL: 'onboarding@resend.dev',
  },
}

/**
 * Validate environment variables
 * Throws error if required variables are missing
 */
export function validateEnv(): { valid: boolean; missing: string[]; warnings: string[] } {
  const missing: string[] = []
  const warnings: string[] = []

  // Check required variables
  for (const key of envConfig.required) {
    if (!process.env[key]) {
      missing.push(key)
    }
  }

  // Check optional but recommended variables
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.RESEND_API_KEY) {
      warnings.push('RESEND_API_KEY not set - contact form will not work in production')
    }
    if (!process.env.CONTACT_EMAIL) {
      warnings.push('CONTACT_EMAIL not set - using default')
    }
  }

  if (missing.length > 0) {
    const errorMessage = `
❌ Missing required environment variables:
${missing.map(key => `   - ${key}`).join('\n')}

Please check your .env.local file and ensure all required variables are set.
See .env.example for reference.
    `.trim()
    
    if (typeof window === 'undefined') {
      // Server-side: throw error
      throw new Error(errorMessage)
    } else {
      // Client-side: log error
      console.error(errorMessage)
    }
  }

  return {
    valid: missing.length === 0,
    missing,
    warnings,
  }
}

/**
 * Get environment variable with fallback
 */
export function getEnv(key: string, fallback?: string): string {
  const value = process.env[key]
  if (value) return value
  if (fallback) return fallback
  if (envConfig.defaults && envConfig.defaults[key]) {
    return envConfig.defaults[key]
  }
  return ''
}

/**
 * Validate on module load (server-side only)
 */
if (typeof window === 'undefined') {
  try {
    validateEnv()
  } catch (error) {
    // Don't crash in development, just warn
    if (process.env.NODE_ENV === 'development') {
      console.warn('Environment validation warning:', error)
    } else {
      throw error
    }
  }
}


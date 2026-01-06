/**
 * Simple In-Memory Rate Limiter
 * For production, consider using @upstash/ratelimit with Redis
 */

import { RATE_LIMIT_REQUESTS, RATE_LIMIT_WINDOW } from './constants'

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store (resets on server restart)
// For production with multiple instances, use Redis-based solution
const rateLimitStore = new Map<string, RateLimitEntry>()

// Parse window string (e.g., "1 m" = 1 minute)
function parseWindow(window: string): number {
  const parts = window.trim().split(' ')
  const value = parseInt(parts[0], 10)
  const unit = parts[1]?.toLowerCase() || 'm'
  
  switch (unit) {
    case 's':
    case 'sec':
    case 'second':
    case 'seconds':
      return value * 1000
    case 'm':
    case 'min':
    case 'minute':
    case 'minutes':
      return value * 60 * 1000
    case 'h':
    case 'hr':
    case 'hour':
    case 'hours':
      return value * 60 * 60 * 1000
    default:
      return 60 * 1000 // Default to 1 minute
  }
}

/**
 * Check if request should be rate limited
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param maxRequests - Maximum requests allowed
 * @param window - Time window (e.g., "1 m" for 1 minute)
 * @returns Object with success status and remaining requests
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = RATE_LIMIT_REQUESTS,
  window: string = RATE_LIMIT_WINDOW
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const windowMs = parseWindow(window)
  
  // Clean up expired entries periodically (every 100 checks)
  if (Math.random() < 0.01) {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key)
      }
    }
  }
  
  const entry = rateLimitStore.get(identifier)
  
  // No entry or expired - create new
  if (!entry || now > entry.resetTime) {
    const resetTime = now + windowMs
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime,
    })
    return {
      success: true,
      remaining: maxRequests - 1,
      resetTime,
    }
  }
  
  // Entry exists and not expired
  if (entry.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
    }
  }
  
  // Increment count
  entry.count++
  rateLimitStore.set(identifier, entry)
  
  return {
    success: true,
    remaining: maxRequests - entry.count,
    resetTime: entry.resetTime,
  }
}

/**
 * Get client identifier from request
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  
  const ip = forwarded?.split(',')[0]?.trim() || 
             realIp || 
             cfConnectingIp || 
             'unknown'
  
  return ip
}


import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // ===========================================
  // Security Headers (applied to ALL routes)
  // ===========================================
  
  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  
  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY')
  
  // XSS protection (legacy, but still useful for older browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Control referrer information
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Prevent browser from DNS prefetching (privacy)
  response.headers.set('X-DNS-Prefetch-Control', 'off')
  
  // Disable client-side caching for HTML pages (not static assets)
  if (!request.nextUrl.pathname.startsWith('/_next/')) {
    response.headers.set('X-Download-Options', 'noopen')
    response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')
  }
  
  // Content Security Policy
  // Restrictive but allows Next.js functionality
  const cspDirectives = [
    "default-src 'self'",
    // Allow inline scripts for Next.js hydration, and Google Analytics
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    // Allow inline styles for Next.js and Tailwind
    "style-src 'self' 'unsafe-inline'",
    // Images from self and data URIs (for base64 images)
    "img-src 'self' data: https://www.google-analytics.com",
    // Fonts from self
    "font-src 'self'",
    // Connect to self, Google Analytics, and Resend
    "connect-src 'self' https://www.google-analytics.com https://api.resend.com",
    // Disallow object/embed
    "object-src 'none'",
    // Frame ancestors - prevent framing
    "frame-ancestors 'none'",
    // Base URI restriction
    "base-uri 'self'",
    // Form action restriction
    "form-action 'self'",
    // Upgrade insecure requests in production
    ...(process.env.NODE_ENV === 'production' ? ['upgrade-insecure-requests'] : []),
  ]
  response.headers.set('Content-Security-Policy', cspDirectives.join('; '))
  
  // Permissions Policy (formerly Feature-Policy)
  // Disable unnecessary browser features
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )
  
  return response
}

export const config = {
  matcher: [
    /*
     * Apply security headers to all routes including API
     * Exclude only static files that don't need headers
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.webp$|.*\\.png$|.*\\.jpg$|.*\\.ico$).*)',
  ],
}


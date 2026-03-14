---
name: api-route-builder
description: Guide for building secure API routes in the portfolio. This skill should be used when creating new API endpoints, modifying existing routes, or handling form submissions. Provides rate limiting, input validation, error handling, and security patterns required for all public endpoints.
---

# API Route Builder

This skill provides guidance for building secure, consistent API routes in the portfolio.

## Security Checklist

Every public API route MUST implement:

- [ ] Rate limiting
- [ ] Input validation
- [ ] Error sanitization (no internal details exposed)
- [ ] Proper HTTP status codes
- [ ] Consistent response format
- [ ] Logging for debugging

## Complete Route Template

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limiter'
import { escapeHtml } from '@/lib/utils'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    // 1. Rate Limiting
    const clientId = getClientIdentifier(request)
    const rateLimit = checkRateLimit(clientId)
    
    if (!rateLimit.success) {
      const retryAfter = Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
          },
        }
      )
    }

    // 2. Parse and Validate Input
    const body = await request.json()
    const { field1, field2, optionalField } = body

    // Required fields
    if (!field1 || !field2) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Field-specific validation
    if (typeof field1 !== 'string' || field1.length > 500) {
      return NextResponse.json(
        { error: 'Invalid field1' },
        { status: 400 }
      )
    }

    // 3. Sanitize Input (if displaying back to users)
    const sanitizedField1 = escapeHtml(field1)

    // 4. Business Logic
    const result = await processData({ field1: sanitizedField1, field2 })

    // 5. Success Response
    return NextResponse.json(
      {
        success: true,
        message: 'Operation completed successfully',
        data: result,
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
        },
      }
    )

  } catch (error) {
    // 6. Error Handling
    logger.error('API error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
}
```

## Rate Limiting

### Basic Usage

```typescript
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limiter'

export async function POST(request: NextRequest) {
  const clientId = getClientIdentifier(request)
  const rateLimit = checkRateLimit(clientId)
  
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }
  
  // Continue with request...
}
```

### Custom Limits

```typescript
// Default: 5 requests per minute
const rateLimit = checkRateLimit(clientId)

// Custom: 10 requests per 5 minutes
const rateLimit = checkRateLimit(clientId, 10, '5 m')

// Custom: 100 requests per hour
const rateLimit = checkRateLimit(clientId, 100, '1 h')
```

### Rate Limit Headers

Always include rate limit headers in responses:

```typescript
return NextResponse.json(
  { data },
  {
    status: 200,
    headers: {
      'X-RateLimit-Limit': '5',
      'X-RateLimit-Remaining': rateLimit.remaining.toString(),
      'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString(),
    },
  }
)
```

## Input Validation

### Required Fields

```typescript
const { name, email, message } = body

if (!name || !email || !message) {
  return NextResponse.json(
    { error: 'Missing required fields' },
    { status: 400 }
  )
}
```

### Type Validation

```typescript
// String with max length
if (typeof name !== 'string' || name.length > 100) {
  return NextResponse.json(
    { error: 'Name must be a string under 100 characters' },
    { status: 400 }
  )
}

// Number in range
if (typeof amount !== 'number' || amount < 0 || amount > 10000) {
  return NextResponse.json(
    { error: 'Amount must be between 0 and 10000' },
    { status: 400 }
  )
}

// Array with max items
if (!Array.isArray(items) || items.length > 50) {
  return NextResponse.json(
    { error: 'Items must be an array with max 50 items' },
    { status: 400 }
  )
}
```

### Email Validation

```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if (!emailRegex.test(email)) {
  return NextResponse.json(
    { error: 'Invalid email format' },
    { status: 400 }
  )
}
```

### URL Validation

```typescript
function isValidUrl(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

if (url && !isValidUrl(url)) {
  return NextResponse.json(
    { error: 'Invalid URL format' },
    { status: 400 }
  )
}
```

### Enum Validation

```typescript
const VALID_TYPES = ['photography', 'brand-identity', 'ai-creatives', 'other']

if (projectType && !VALID_TYPES.includes(projectType)) {
  return NextResponse.json(
    { error: 'Invalid project type' },
    { status: 400 }
  )
}
```

## Input Sanitization

### HTML Escaping

Always escape user input before:
- Storing in database
- Including in emails
- Returning in responses

```typescript
import { escapeHtml } from '@/lib/utils'

const safeName = escapeHtml(name)
const safeMessage = escapeHtml(message)

// For multiline text, preserve line breaks
const safeMessageWithBreaks = escapeHtml(message).replace(/\n/g, '<br>')
```

### The escapeHtml Function

```typescript
// From lib/utils.ts
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
```

## Error Handling

### Error Response Format

```typescript
// Client errors (4xx)
return NextResponse.json(
  { error: 'Human-readable error message' },
  { status: 400 }
)

// Server errors (5xx)
return NextResponse.json(
  { error: 'Internal server error. Please try again later.' },
  { status: 500 }
)
```

### HTTP Status Codes

| Code | When to Use |
|------|-------------|
| 200 | Success |
| 201 | Resource created |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (no auth) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Resource not found |
| 429 | Too many requests (rate limited) |
| 500 | Server error |

### Never Expose Internal Errors

```typescript
// BAD - Exposes internal details
catch (error) {
  return NextResponse.json(
    { error: error.message, stack: error.stack },
    { status: 500 }
  )
}

// GOOD - Generic message + logged internally
catch (error) {
  logger.error('Contact form error:', error)
  return NextResponse.json(
    { error: 'Internal server error. Please try again later.' },
    { status: 500 }
  )
}
```

## Logging

### Using the Logger

```typescript
import { logger } from '@/lib/logger'

// Info level
logger.log('Processing contact form submission')

// Error level (with context)
logger.error('Failed to send email:', error)

// Debug level (development only)
logger.debug('Request body:', body)
```

### What to Log

- Request received (minimal info)
- Validation failures (for debugging)
- External API errors (for debugging)
- Success completions (optional)

### What NOT to Log

- Full request bodies with sensitive data
- Passwords, API keys, tokens
- Personal information (PII) in production

## Response Patterns

### Success Response

```typescript
return NextResponse.json(
  {
    success: true,
    message: 'Operation completed successfully',
    data: { id: '123', ...result },
  },
  { status: 200 }
)
```

### Success with Metadata

```typescript
return NextResponse.json(
  {
    success: true,
    data: items,
    meta: {
      total: 100,
      page: 1,
      perPage: 10,
    },
  },
  { status: 200 }
)
```

### Error Response

```typescript
return NextResponse.json(
  {
    error: 'Validation failed',
    details: {
      email: 'Invalid email format',
      name: 'Name is required',
    },
  },
  { status: 400 }
)
```

## GET Request Pattern

```typescript
export async function GET(request: NextRequest) {
  try {
    // Rate limiting for public endpoints
    const clientId = getClientIdentifier(request)
    const rateLimit = checkRateLimit(clientId, 30, '1 m') // Higher limit for GET
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const limit = parseInt(searchParams.get('limit') || '10', 10)

    // Validate
    if (limit > 100) {
      return NextResponse.json(
        { error: 'Limit cannot exceed 100' },
        { status: 400 }
      )
    }

    // Fetch data
    const data = await getData({ id, limit })

    return NextResponse.json({ data })

  } catch (error) {
    logger.error('GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## Health Check Pattern

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  )
}
```

## Contact Form Pattern

Complete pattern for the contact form endpoint:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { escapeHtml } from '@/lib/utils'
import { logger } from '@/lib/logger'
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limiter'

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 requests per minute
    const clientId = getClientIdentifier(request)
    const rateLimit = checkRateLimit(clientId)
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, message } = body

    // Validate required
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check email service
    if (!resend) {
      logger.log('Contact submission (email not configured):', { name, email })
      return NextResponse.json(
        { success: true, message: 'Message received' },
        { status: 200 }
      )
    }

    // Sanitize for email
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')

    // Send email
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `Contact from ${name}`,
      html: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    })

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    logger.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
```

## Cache Control

### No Cache (Dynamic Data)

```typescript
return NextResponse.json(
  { data },
  {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  }
)
```

### Short Cache (Semi-static)

```typescript
return NextResponse.json(
  { data },
  {
    headers: {
      'Cache-Control': 'public, max-age=60, stale-while-revalidate=300',
    },
  }
)
```

All API routes in this project should use `no-cache, no-store, must-revalidate` to ensure fresh data.

## CORS (If Needed)

```typescript
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function GET(request: NextRequest) {
  const response = NextResponse.json({ data })
  
  response.headers.set('Access-Control-Allow-Origin', '*')
  
  return response
}
```

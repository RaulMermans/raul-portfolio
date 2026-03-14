# API Error Handling Standards

This document defines the standards for API error handling across all API routes in the portfolio website.

## Error Response Format

### Standard Error Response

All API errors should follow this format:

```typescript
{
  success: false,
  error: {
    message: string,        // User-friendly error message
    code?: string,          // Error code for programmatic handling
    statusCode?: number,    // HTTP status code
    details?: unknown       // Additional error details (dev only)
  }
}
```

### Success Response Format

Success responses should follow this format:

```typescript
{
  success: true,
  data?: unknown,           // Response data
  message?: string          // Optional success message
}
```

## HTTP Status Codes

Use appropriate HTTP status codes:

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Invalid input, validation errors |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource conflict (e.g., duplicate email) |
| 422 | Unprocessable Entity | Validation failed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |
| 503 | Service Unavailable | Service temporarily unavailable |

## Error Codes

Use consistent error codes for programmatic handling:

### Validation Errors
- `VALIDATION_ERROR` - General validation failure
- `INVALID_EMAIL` - Invalid email format
- `INVALID_INPUT` - Invalid input format
- `MISSING_FIELD` - Required field missing

### Authentication Errors
- `UNAUTHORIZED` - Authentication required
- `INVALID_CREDENTIALS` - Invalid credentials
- `TOKEN_EXPIRED` - Authentication token expired

### Resource Errors
- `NOT_FOUND` - Resource not found
- `ALREADY_EXISTS` - Resource already exists
- `CONFLICT` - Resource conflict

### Server Errors
- `INTERNAL_ERROR` - Internal server error
- `SERVICE_UNAVAILABLE` - Service unavailable
- `DATABASE_ERROR` - Database operation failed

## Implementation Pattern

### Basic API Route Template

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { handleApiError, normalizeErrorResponse } from '@/lib/errors'
import { CustomError } from '@/lib/errors'

export async function GET(request: NextRequest) {
  try {
    // Validate request
    // Process request
    const data = await fetchData()
    
    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    const appError = handleApiError(error)
    const errorResponse = normalizeErrorResponse(error)
    
    return NextResponse.json(
      errorResponse,
      { status: appError.statusCode || 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate body
    const body = await request.json()
    
    // Validate required fields
    if (!body.email) {
      throw new CustomError(
        'Email is required',
        'MISSING_FIELD',
        400
      )
    }
    
    // Validate format
    if (!isValidEmail(body.email)) {
      throw new CustomError(
        'Invalid email format',
        'INVALID_EMAIL',
        400
      )
    }
    
    // Process request
    const result = await createResource(body)
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Resource created successfully',
    }, { status: 201 })
  } catch (error) {
    const appError = handleApiError(error)
    const errorResponse = normalizeErrorResponse(error)
    
    return NextResponse.json(
      errorResponse,
      { status: appError.statusCode || 500 }
    )
  }
}
```

## Validation

### Input Validation

Always validate input before processing:

```typescript
import { CustomError } from '@/lib/errors'
import { isValidEmail } from '@/lib/validation'

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Validate required fields
  const requiredFields = ['name', 'email', 'message']
  for (const field of requiredFields) {
    if (!body[field]) {
      throw new CustomError(
        `${field} is required`,
        'MISSING_FIELD',
        400
      )
    }
  }
  
  // Validate email format
  if (!isValidEmail(body.email)) {
    throw new CustomError(
      'Invalid email format',
      'INVALID_EMAIL',
      400
    )
  }
  
  // Validate length
  if (body.message.length > 5000) {
    throw new CustomError(
      'Message is too long (max 5000 characters)',
      'VALIDATION_ERROR',
      400
    )
  }
  
  // Continue processing...
}
```

### Rate Limiting

Implement rate limiting for public APIs:

```typescript
// lib/rate-limit.ts
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)
  
  if (!record || now > record.resetAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}
```

```typescript
// app/api/contact/route.ts
import { rateLimit } from '@/lib/rate-limit'
import { CustomError } from '@/lib/errors'

export async function POST(request: NextRequest) {
  // Get client identifier (IP address)
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  
  // Check rate limit
  if (!rateLimit(ip, 5, 60000)) { // 5 requests per minute
    throw new CustomError(
      'Too many requests. Please try again later.',
      'RATE_LIMIT_EXCEEDED',
      429
    )
  }
  
  // Continue processing...
}
```

## Error Logging

### Log Errors Appropriately

```typescript
import { logError, handleApiError } from '@/lib/errors'

export async function POST(request: NextRequest) {
  try {
    // Process request
  } catch (error) {
    // Log error with context
    logError(error, `API: POST /api/contact`)
    
    // Handle and return error
    const appError = handleApiError(error)
    // ...
  }
}
```

### Don't Log Sensitive Data

```typescript
// Bad
logError({ email: userEmail, password: userPassword }, 'API')

// Good
logError({ email: userEmail }, 'API') // Don't log passwords
```

## Examples

### Contact Form API

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { handleApiError, normalizeErrorResponse, CustomError } from '@/lib/errors'
import { isValidEmail } from '@/lib/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body
    
    // Validate required fields
    if (!name || !email || !message) {
      throw new CustomError(
        'Name, email, and message are required',
        'MISSING_FIELD',
        400
      )
    }
    
    // Validate email
    if (!isValidEmail(email)) {
      throw new CustomError(
        'Invalid email format',
        'INVALID_EMAIL',
        400
      )
    }
    
    // Validate length
    if (message.length > 5000) {
      throw new CustomError(
        'Message is too long (max 5000 characters)',
        'VALIDATION_ERROR',
        400
      )
    }
    
    // TODO: Send email (e.g., using Resend, SendGrid, etc.)
    // For now, just log
    console.log('Contact form submission:', { name, email })
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
    })
  } catch (error) {
    const appError = handleApiError(error)
    const errorResponse = normalizeErrorResponse(error)
    
    return NextResponse.json(
      errorResponse,
      { status: appError.statusCode || 500 }
    )
  }
}
```

### Health Check API

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check database connectivity (if applicable)
    // Check external services (if applicable)
    
    return NextResponse.json({
      success: true,
      status: 'ok',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      status: 'error',
      timestamp: new Date().toISOString(),
    }, { status: 503 })
  }
}
```

## Client-Side Error Handling

### Handle API Errors in Client Components

```typescript
'use client'

import { useState } from 'react'
import { handleApiError, getUserFriendlyError } from '@/lib/errors'

export function ContactForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const handleSubmit = async (data: FormData) => {
    setError(null)
    setLoading(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error?.message || 'Failed to send message')
      }
      
      // Success handling
      alert('Message sent successfully!')
    } catch (error) {
      const appError = handleApiError(error)
      setError(getUserFriendlyError(appError))
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
```

## Testing

### Test Error Cases

```typescript
// __tests__/api/contact.test.ts
import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

describe('POST /api/contact', () => {
  test('returns 400 for missing fields', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({}),
    })
    
    const response = await POST(request)
    const data = await response.json()
    
    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error.code).toBe('MISSING_FIELD')
  })
  
  test('returns 400 for invalid email', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test',
        email: 'invalid-email',
        message: 'Test message',
      }),
    })
    
    const response = await POST(request)
    const data = await response.json()
    
    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error.code).toBe('INVALID_EMAIL')
  })
  
  test('returns 200 for valid input', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
      }),
    })
    
    const response = await POST(request)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })
})
```

## Checklist

When creating a new API route, ensure:

- [ ] Error responses follow standard format
- [ ] Appropriate HTTP status codes are used
- [ ] Error codes are consistent and descriptive
- [ ] Input validation is implemented
- [ ] Rate limiting is considered (for public APIs)
- [ ] Errors are logged with context
- [ ] Sensitive data is not logged
- [ ] User-friendly error messages are provided
- [ ] Error handling is tested

## Additional Resources

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [REST API Error Handling Best Practices](https://blog.restcase.com/rest-api-error-codes-101/)


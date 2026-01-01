# Error Handling Architecture

This document outlines the comprehensive error handling architecture for the portfolio website, including error boundaries, error tracking, and recovery strategies.

## Architecture Overview

The error handling system consists of multiple layers:

```
┌─────────────────────────────────────┐
│   Global Error Handler              │
│   (global-error.tsx)                │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Route Error Handler               │
│   (error.tsx)                       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Error Boundary                    │
│   (ErrorBoundary.tsx)               │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Error Utilities                   │
│   (lib/errors.ts)                   │
└─────────────────────────────────────┘
```

## Error Layers

### 1. Global Error Handler

**File**: `app/global-error.tsx`

Catches errors that occur in the root layout. This is the last line of defense.

**When it triggers**:
- Errors in root layout
- Errors during initial page load
- Critical rendering errors

**Responsibilities**:
- Display user-friendly error UI
- Log critical errors
- Provide recovery options

### 2. Route Error Handler

**File**: `app/error.tsx`

Catches errors in route segments. Each route can have its own error handler.

**When it triggers**:
- Errors in page components
- Errors in route layouts
- API route errors

**Responsibilities**:
- Display route-specific error UI
- Log route errors
- Provide navigation options

### 3. Error Boundary Component

**File**: `components/ErrorBoundary.tsx`

Catches React component errors. Can wrap specific components.

**Usage**:
```typescript
import ErrorBoundary from '@/components/ErrorBoundary'

function MyPage() {
  return (
    <ErrorBoundary>
      <RiskyComponent />
    </ErrorBoundary>
  )
}
```

**When to use**:
- Wrap third-party components
- Isolate risky operations
- Protect critical UI sections

### 4. Error Utilities

**File**: `lib/errors.ts`

Provides consistent error handling utilities.

**Key Functions**:
```typescript
import {
  CustomError,
  logError,
  getUserFriendlyError,
  handleApiError,
  normalizeErrorResponse
} from '@/lib/errors'
```

## Error Types

### 1. Custom Errors

Use `CustomError` for application-specific errors:

```typescript
import { CustomError } from '@/lib/errors'

throw new CustomError(
  'Invalid email format',
  'INVALID_EMAIL',
  400,
  { email: 'invalid@' }
)
```

### 2. API Errors

Handle API errors consistently:

```typescript
import { handleApiError, normalizeErrorResponse } from '@/lib/errors'

try {
  const response = await fetch('/api/data')
  if (!response.ok) {
    throw new Error('API request failed')
  }
  return response.json()
} catch (error) {
  const appError = handleApiError(error)
  return normalizeErrorResponse(error)
}
```

### 3. Validation Errors

Use validation utilities:

```typescript
import { isValidEmail } from '@/lib/validation'
import { CustomError } from '@/lib/errors'

if (!isValidEmail(email)) {
  throw new CustomError(
    'Please enter a valid email address',
    'VALIDATION_ERROR',
    400
  )
}
```

## Error Handling Patterns

### Pattern 1: Try-Catch with User Feedback

```typescript
'use client'

import { useState } from 'react'
import { handleApiError, getUserFriendlyError } from '@/lib/errors'

export function ContactForm() {
  const [error, setError] = useState<string | null>(null)
  
  const handleSubmit = async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      
      // Success handling
    } catch (error) {
      const appError = handleApiError(error)
      setError(getUserFriendlyError(appError))
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* Form fields */}
    </form>
  )
}
```

### Pattern 2: Error Boundary for Risky Components

```typescript
'use client'

import ErrorBoundary from '@/components/ErrorBoundary'
import { ThirdPartyComponent } from 'some-library'

export function SafePage() {
  return (
    <div>
      <h1>Safe Content</h1>
      <ErrorBoundary
        fallback={<div>Failed to load component</div>}
      >
        <ThirdPartyComponent />
      </ErrorBoundary>
    </div>
  )
}
```

### Pattern 3: API Route Error Handling

```typescript
// app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { handleApiError, normalizeErrorResponse } from '@/lib/errors'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    // Process request
    const result = await processRequest(body)
    
    return NextResponse.json({ success: true, data: result })
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

### Pattern 4: Async Operation with Error Handling

```typescript
import { useSafeAsync } from '@/hooks/useSafeAsync'
import { handleApiError } from '@/lib/errors'

export function DataComponent() {
  const { execute, loading, error } = useSafeAsync()
  
  const fetchData = async () => {
    return await execute(async () => {
      const response = await fetch('/api/data')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      return response.json()
    })
  }
  
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <button onClick={fetchData}>Load Data</button>
    </div>
  )
}
```

## Error Logging

### Development Logging

Errors are automatically logged in development:

```typescript
import { logError } from '@/lib/errors'

try {
  // Your code
} catch (error) {
  logError(error, 'Component context')
  // Logs to console in development
}
```

### Production Logging

Set up production error tracking:

```typescript
// lib/errors.ts (modify as needed)

export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error${context ? ` - ${context}` : ''}]`, error)
  }
  
  // Production: Send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry
    // Sentry.captureException(error, {
    //   tags: { context },
    //   level: 'error',
    // })
    
    // Example: LogRocket
    // LogRocket.captureException(error)
    
    // Example: Custom API
    // fetch('/api/errors', {
    //   method: 'POST',
    //   body: JSON.stringify({ error, context }),
    // })
  }
}
```

## Recommended Error Tracking Services

### 1. Sentry

**Setup**:
```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

### 2. LogRocket

**Setup**:
```bash
npm install logrocket
```

```typescript
// lib/logrocket.ts
import LogRocket from 'logrocket'

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_LOGROCKET_ID) {
  LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_ID)
}

export default LogRocket
```

### 3. Vercel Error Tracking

If using Vercel, error tracking is built-in:
- Automatic error tracking
- No additional setup needed
- Access via Vercel dashboard

## User-Friendly Error Messages

### Principles

1. **Don't expose technical details** in production
2. **Provide actionable feedback**
3. **Offer recovery options**
4. **Use clear, concise language**

### Examples

```typescript
// Bad
throw new Error('SQLSTATE[23000]: Integrity constraint violation')

// Good
throw new CustomError(
  'This email is already registered',
  'EMAIL_EXISTS',
  409
)

// Bad
throw new Error('undefined is not an object')

// Good
throw new CustomError(
  'We couldn't load your data. Please try again.',
  'DATA_LOAD_ERROR',
  500
)
```

## Error Recovery Strategies

### 1. Retry Logic

```typescript
async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url)
      if (response.ok) return response.json()
      throw new Error(`HTTP ${response.status}`)
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
}
```

### 2. Fallback UI

```typescript
'use client'

import { useState, useEffect } from 'react'
import ErrorBoundary from '@/components/ErrorBoundary'

export function DataComponent() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
      .catch(setError)
  }, [])
  
  if (error) {
    return <FallbackComponent />
  }
  
  if (!data) {
    return <LoadingComponent />
  }
  
  return <DataDisplay data={data} />
}
```

### 3. Graceful Degradation

```typescript
'use client'

import { useState, useEffect } from 'react'

export function FeatureComponent() {
  const [enabled, setEnabled] = useState(false)
  
  useEffect(() => {
    // Check if feature is available
    if ('someFeature' in window) {
      setEnabled(true)
    }
  }, [])
  
  if (!enabled) {
    return <BasicVersion />
  }
  
  return <EnhancedVersion />
}
```

## Testing Error Handling

### Test Error Boundaries

```typescript
// __tests__/ErrorBoundary.test.tsx
import { render, screen } from '@testing-library/react'
import ErrorBoundary from '@/components/ErrorBoundary'

const ThrowError = () => {
  throw new Error('Test error')
}

test('ErrorBoundary catches errors', () => {
  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  )
  
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
})
```

### Test API Error Handling

```typescript
// __tests__/api/contact.test.ts
import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

test('handles invalid input', async () => {
  const request = new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify({}),
  })
  
  const response = await POST(request)
  const data = await response.json()
  
  expect(response.status).toBe(400)
  expect(data.error).toBeDefined()
})
```

## Best Practices

### 1. Always Handle Errors

Never let errors go unhandled:

```typescript
// Bad
async function loadData() {
  const data = await fetch('/api/data')
  return data.json()
}

// Good
async function loadData() {
  try {
    const response = await fetch('/api/data')
    if (!response.ok) throw new Error('Failed to fetch')
    return response.json()
  } catch (error) {
    handleApiError(error)
    return null
  }
}
```

### 2. Use Specific Error Types

```typescript
// Bad
throw new Error('Error')

// Good
throw new CustomError(
  'Email validation failed',
  'VALIDATION_ERROR',
  400
)
```

### 3. Log Context

Always provide context when logging errors:

```typescript
// Bad
logError(error)

// Good
logError(error, 'ContactForm submission')
```

### 4. Don't Swallow Errors

```typescript
// Bad
try {
  riskyOperation()
} catch (error) {
  // Silent failure
}

// Good
try {
  riskyOperation()
} catch (error) {
  logError(error, 'riskyOperation')
  // Handle or rethrow
}
```

## Error Handling Checklist

- [ ] All API routes have error handling
- [ ] All async operations are wrapped in try-catch
- [ ] Error boundaries wrap risky components
- [ ] User-friendly error messages are displayed
- [ ] Errors are logged appropriately
- [ ] Production error tracking is configured
- [ ] Error recovery strategies are implemented
- [ ] Error handling is tested

## Additional Resources

- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [Sentry Next.js Guide](https://docs.sentry.io/platforms/javascript/guides/nextjs/)


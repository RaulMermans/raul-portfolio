# Website Optimization & Stability Guide

This guide documents all the optimization utilities, components, and patterns implemented to prevent the website from breaking and ensure optimal performance and usability.

## Overview

The optimization system includes:
- **Error Handling**: Comprehensive error boundaries and error management
- **Image Safety**: Fallback components for broken images
- **Loading States**: Skeleton loaders and spinners
- **Responsive Utilities**: Breakpoint detection and responsive helpers
- **Validation**: Form and data validation utilities
- **Accessibility**: A11y helpers and screen reader support
- **Performance Monitoring**: Web Vitals tracking
- **Safe Navigation**: Type-safe property access

## Error Handling

### Error Utilities (`lib/errors.ts`)

Provides consistent error handling across the application:

```typescript
import { handleApiError, logError, getUserFriendlyError } from '@/lib/errors'

// Handle errors gracefully
try {
  // Your code
} catch (error) {
  const appError = handleApiError(error, 'Context')
  // Show user-friendly message
}
```

**Features:**
- Custom error classes
- User-friendly error messages
- Error logging (dev only)
- API error normalization

### Error Boundary Component

Already implemented in `components/ErrorBoundary.tsx`. Wraps components to catch React errors:

```typescript
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

## Image Safety

### SafeImage Component (`components/SafeImage.tsx`)

Prevents broken images from breaking the layout:

```typescript
import SafeImage from '@/components/SafeImage'

<SafeImage
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  fallbackSrc="/images/placeholders/image-placeholder.webp"
  showPlaceholder={true}
/>
```

**Features:**
- Automatic fallback on error
- Loading state
- Placeholder display
- Prevents layout shift

## Loading States

### LoadingSpinner Component (`components/LoadingSpinner.tsx`)

Consistent loading indicators:

```typescript
import LoadingSpinner from '@/components/LoadingSpinner'

<LoadingSpinner size="medium" ariaLabel="Loading content" />
```

**Sizes:** `small`, `medium`, `large`

### Skeleton Component (`components/Skeleton.tsx`)

Skeleton loaders for content placeholders:

```typescript
import Skeleton from '@/components/Skeleton'

<Skeleton width="100%" height="200px" variant="rectangular" />
<Skeleton width="40px" height="40px" variant="circular" />
<Skeleton width="80%" height="1em" variant="text" />
```

**Variants:** `text`, `circular`, `rectangular`

## Responsive Utilities

### Responsive Hook (`hooks/useResponsive.ts`)

Real-time viewport information:

```typescript
import { useResponsive } from '@/hooks'

function MyComponent() {
  const { isMobile, isTablet, isDesktop, width, height, breakpoint } = useResponsive()
  
  return (
    <div>
      {isMobile && <MobileView />}
      {isDesktop && <DesktopView />}
    </div>
  )
}
```

### Responsive Functions (`lib/responsive.ts`)

Utility functions for breakpoint detection:

```typescript
import { isMobile, isDesktop, isTablet, supportsHover, isLandscape } from '@/lib/responsive'

if (isMobile()) {
  // Mobile-specific code
}
```

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: ≥ 1024px

## Validation

### Validation Utilities (`lib/validation.ts`)

Form and data validation:

```typescript
import { validateContactForm, isValidEmail, sanitizeString } from '@/lib/validation'

// Validate contact form
const result = validateContactForm({ name, email, message })
if (!result.isValid) {
  console.error(result.errors)
}

// Validate email
if (isValidEmail(email)) {
  // Valid email
}

// Sanitize input
const clean = sanitizeString(userInput, 100) // Max 100 chars
```

**Type Guards:**
- `isDefined<T>()` - Checks for null/undefined
- `isString()` - Type guard for strings
- `isNumber()` - Type guard for numbers
- `isObject()` - Type guard for objects

## Accessibility

### Accessibility Utilities (`lib/accessibility.ts`)

A11y helpers:

```typescript
import {
  generateId,
  trapFocus,
  announceToScreenReader,
  prefersReducedMotion,
  getAccessibleName
} from '@/lib/accessibility'

// Generate unique ID
const id = generateId('modal')

// Trap focus in modal
const cleanup = trapFocus(modalElement)

// Announce to screen readers
announceToScreenReader('Form submitted successfully')

// Check user preferences
if (prefersReducedMotion()) {
  // Disable animations
}
```

## Performance Monitoring

### Performance Monitor (`lib/performance-monitor.ts`)

Track performance metrics:

```typescript
import { performanceMonitor } from '@/lib/performance-monitor'

// Measure function execution
const result = performanceMonitor.measure('myFunction', () => {
  // Your code
})

// Measure async operations
const data = await performanceMonitor.measureAsync('fetchData', async () => {
  return await fetch('/api/data')
})

// Get metrics
const metrics = performanceMonitor.getMetrics()
const avgTime = performanceMonitor.getAverageMetric('myFunction')
```

**Auto-tracks Web Vitals:**
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)

## Safe Navigation

### Safe Navigation Utilities (`lib/safeNavigation.ts`)

Type-safe property access:

```typescript
import {
  safeGet,
  safeArrayAccess,
  safeCall,
  safeParseJSON,
  hasProperty
} from '@/lib/safeNavigation'

// Safe nested property access
const value = safeGet(obj, 'user.profile.name', 'Default')

// Safe array access
const item = safeArrayAccess(array, 0)

// Safe function call
const result = safeCall(fn, arg1, arg2)

// Safe JSON parsing
const data = safeParseJSON(jsonString, {})

// Type-safe property check
if (hasProperty(obj, 'name')) {
  // obj.name is safe
}
```

## Hooks

### useErrorHandler Hook (`hooks/useErrorHandler.ts`)

Error state management:

```typescript
import { useErrorHandler } from '@/hooks'

function MyComponent() {
  const { error, isError, handleError, clearError, getUserMessage } = useErrorHandler()
  
  const handleSubmit = async () => {
    try {
      // Your code
    } catch (err) {
      handleError(err, 'Form submission')
    }
  }
  
  return (
    <>
      {isError && <div>{getUserMessage(error)}</div>}
      <button onClick={clearError}>Dismiss</button>
    </>
  )
}
```

### useSafeAsync Hook (`hooks/useSafeAsync.ts`)

Safe async operations:

```typescript
import { useSafeAsync } from '@/hooks'

function MyComponent() {
  const { data, loading, error, execute, reset } = useSafeAsync<DataType>()
  
  const fetchData = async () => {
    const result = await execute(async () => {
      const res = await fetch('/api/data')
      return res.json()
    }, 'Fetching data')
    
    if (result.success) {
      // Handle success
    } else {
      // Handle error
    }
  }
  
  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <div>Error: {error.message}</div>}
      {data && <div>{data}</div>}
    </>
  )
}
```

## Best Practices

### 1. Always Use SafeImage for Images

```typescript
// ❌ Bad
<Image src="/image.jpg" alt="..." />

// ✅ Good
<SafeImage src="/image.jpg" alt="..." fallbackSrc="/placeholder.jpg" />
```

### 2. Handle Errors Gracefully

```typescript
// ❌ Bad
const data = await fetch('/api/data').then(r => r.json())

// ✅ Good
const { data, error, loading } = useSafeAsync()
await execute(async () => {
  const res = await fetch('/api/data')
  if (!res.ok) throw new Error('Failed to fetch')
  return res.json()
}, 'Fetching data')
```

### 3. Use Loading States

```typescript
// ❌ Bad
{data && <Content data={data} />}

// ✅ Good
{loading && <Skeleton width="100%" height="200px" />}
{error && <ErrorState message={error.message} />}
{data && <Content data={data} />}
```

### 4. Validate User Input

```typescript
// ❌ Bad
const handleSubmit = () => {
  // No validation
  submitForm(data)
}

// ✅ Good
const handleSubmit = () => {
  const validation = validateContactForm(data)
  if (!validation.isValid) {
    setErrors(validation.errors)
    return
  }
  submitForm(data)
}
```

### 5. Use Responsive Hooks

```typescript
// ❌ Bad
const isMobile = window.innerWidth < 768

// ✅ Good
const { isMobile } = useResponsive()
```

## File Structure

```
lib/
├── errors.ts              # Error handling utilities
├── validation.ts          # Validation functions
├── responsive.ts          # Responsive utilities
├── accessibility.ts       # A11y helpers
├── safeNavigation.ts      # Safe property access
├── performance-monitor.ts # Performance tracking
├── performance.ts         # Performance utilities (existing)
├── utils.ts               # General utilities (existing)
└── index.ts               # Central exports

hooks/
├── useResponsive.ts       # Responsive hook
├── useErrorHandler.ts     # Error handling hook
├── useSafeAsync.ts        # Safe async hook
└── index.ts               # Central exports

components/
├── SafeImage.tsx          # Safe image component
├── LoadingSpinner.tsx     # Loading spinner
└── Skeleton.tsx            # Skeleton loader
```

## Integration Examples

### Example: Contact Form with Full Error Handling

```typescript
'use client'

import { useState } from 'react'
import { useErrorHandler } from '@/hooks'
import { useSafeAsync } from '@/hooks'
import { validateContactForm } from '@/lib/validation'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function ContactForm() {
  const { handleError, getUserMessage } = useErrorHandler()
  const { execute, loading } = useSafeAsync()
  const [errors, setErrors] = useState<string[]>([])
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors([])
    
    const formData = {
      name: e.currentTarget.name.value,
      email: e.currentTarget.email.value,
      message: e.currentTarget.message.value,
    }
    
    // Validate
    const validation = validateContactForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }
    
    // Submit
    const result = await execute(async () => {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Failed to submit')
      return res.json()
    }, 'Contact form submission')
    
    if (result.success) {
      // Success!
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div className="error-state">
          {errors.map((err, i) => (
            <p key={i}>{err}</p>
          ))}
        </div>
      )}
      
      {loading && <LoadingSpinner />}
      
      {/* Form fields */}
    </form>
  )
}
```

## Summary

All optimization utilities are designed to:
- **Prevent crashes** - Error boundaries and safe navigation
- **Improve UX** - Loading states and fallbacks
- **Ensure accessibility** - A11y helpers and screen reader support
- **Track performance** - Web Vitals monitoring
- **Validate data** - Type-safe validation
- **Handle edge cases** - Safe property access and null checks

Use these utilities throughout the codebase to maintain stability and prevent breakage.


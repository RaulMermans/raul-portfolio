# Performance Monitoring Guide

This guide covers the performance monitoring infrastructure, how to use it, and best practices for tracking website performance.

## Overview

The performance monitoring system tracks:
- **Web Vitals**: LCP, FID, CLS (Core Web Vitals)
- **Custom Metrics**: Function execution times, async operations
- **Performance Timing**: Page load times, API response times

## Setup

### Automatic Setup

Performance monitoring is automatically initialized in `lib/performance-monitor.ts`:

```typescript
import { performanceMonitor } from '@/lib/performance-monitor'

// Web Vitals are automatically observed in the browser
// Custom metrics can be added manually
```

### Manual Measurement

#### Measure Function Execution

```typescript
import { performanceMonitor } from '@/lib/performance-monitor'

// Sync function
const result = performanceMonitor.measure('processData', () => {
  // Your code
  return processedData
})

// Async function
const result = await performanceMonitor.measureAsync('fetchData', async () => {
  const data = await fetch('/api/data')
  return data.json()
})
```

#### Record Custom Metrics

```typescript
import { performanceMonitor } from '@/lib/performance-monitor'

// Record a custom metric
performanceMonitor.recordMetric('api-response-time', 234.5)
performanceMonitor.recordMetric('image-load-time', 156.2)
```

## Web Vitals

### Largest Contentful Paint (LCP)

Measures loading performance. Good LCP is < 2.5 seconds.

```typescript
// Automatically tracked
// Access via:
const metrics = performanceMonitor.getMetricsByName('LCP')
const averageLCP = performanceMonitor.getAverageMetric('LCP')
```

### First Input Delay (FID)

Measures interactivity. Good FID is < 100ms.

```typescript
// Automatically tracked
const fidMetrics = performanceMonitor.getMetricsByName('FID')
```

### Cumulative Layout Shift (CLS)

Measures visual stability. Good CLS is < 0.1.

```typescript
// Automatically tracked
const clsMetrics = performanceMonitor.getMetricsByName('CLS')
```

## API Route Monitoring

### Example: Monitor API Response Times

```typescript
// app/api/example/route.ts
import { performanceMonitor } from '@/lib/performance-monitor'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  return await performanceMonitor.measureAsync('api-example', async () => {
    // Your API logic
    const data = await fetchData()
    return NextResponse.json({ data })
  })
}
```

## Client-Side Monitoring

### Monitor Component Render Times

```typescript
'use client'

import { useEffect } from 'react'
import { performanceMonitor } from '@/lib/performance-monitor'

export function MyComponent() {
  useEffect(() => {
    const renderStart = performance.now()
    
    // Component logic
    
    return () => {
      const renderTime = performance.now() - renderStart
      performanceMonitor.recordMetric('component-render', renderTime)
    }
  }, [])
  
  return <div>Content</div>
}
```

### Monitor Image Load Times

```typescript
'use client'

import { performanceMonitor } from '@/lib/performance-monitor'

function ImageWithMonitoring({ src, alt }) {
  const handleLoad = (e) => {
    const loadTime = performance.now() - e.timeStamp
    performanceMonitor.recordMetric('image-load', loadTime)
  }
  
  return <img src={src} alt={alt} onLoad={handleLoad} />
}
```

## Accessing Metrics

### Get All Metrics

```typescript
const allMetrics = performanceMonitor.getMetrics()
console.log(allMetrics)
// [
//   { name: 'LCP', value: 2345.2, timestamp: 1234567890 },
//   { name: 'FID', value: 45.3, timestamp: 1234567891 },
//   ...
// ]
```

### Get Metrics by Name

```typescript
const lcpMetrics = performanceMonitor.getMetricsByName('LCP')
const apiMetrics = performanceMonitor.getMetricsByName('api-response-time')
```

### Get Average Metric

```typescript
const avgLCP = performanceMonitor.getAverageMetric('LCP')
const avgAPITime = performanceMonitor.getAverageMetric('api-response-time')
```

## Integration with Error Tracking

### Combine with Error Tracking

```typescript
import { performanceMonitor } from '@/lib/performance-monitor'
import { logError } from '@/lib/errors'

try {
  await performanceMonitor.measureAsync('critical-operation', async () => {
    // Your code
  })
} catch (error) {
  logError(error, 'Performance monitoring')
  // Error is automatically recorded in performance monitor
}
```

## Production Setup

### Send Metrics to Analytics Service

```typescript
// lib/performance-monitor.ts (modify as needed)
import { performanceMonitor } from '@/lib/performance-monitor'

// In production, send metrics to your analytics service
if (process.env.NODE_ENV === 'production') {
  // Example: Send to Google Analytics
  // gtag('event', 'web_vitals', {
  //   event_category: 'Web Vitals',
  //   value: metric.value,
  //   metric_name: metric.name,
  // })
  
  // Example: Send to custom API
  // fetch('/api/analytics/metrics', {
  //   method: 'POST',
  //   body: JSON.stringify(metric),
  // })
}
```

### Recommended Services

1. **Vercel Analytics** (if using Vercel)
   - Automatic Web Vitals tracking
   - No code changes needed

2. **Google Analytics 4**
   - Custom event tracking
   - Web Vitals report

3. **Sentry**
   - Performance monitoring
   - Error tracking integration

4. **New Relic / Datadog**
   - Advanced APM
   - Real user monitoring

## Best Practices

### 1. Measure Critical Operations

Only measure operations that matter:
- API calls
- Heavy computations
- Image loads
- Route transitions

### 2. Don't Over-Measure

Too many metrics can impact performance. Focus on:
- User-facing operations
- Critical paths
- Known performance bottlenecks

### 3. Use Descriptive Names

```typescript
// Good
performanceMonitor.measure('api-contact-form-submit', ...)
performanceMonitor.measure('homepage-hero-image-load', ...)

// Bad
performanceMonitor.measure('x', ...)
performanceMonitor.measure('thing', ...)
```

### 4. Monitor in Production

Always monitor production metrics:
- Real user data is more valuable than development metrics
- Use error tracking services (Sentry, LogRocket)
- Set up alerts for performance degradation

### 5. Regular Performance Audits

- Run Lighthouse audits regularly
- Monitor Core Web Vitals in production
- Track performance trends over time
- Set performance budgets

## Performance Budgets

Recommended performance budgets:

| Metric | Budget | Target |
|--------|--------|--------|
| LCP    | < 2.5s | < 1.8s |
| FID    | < 100ms | < 50ms |
| CLS    | < 0.1  | < 0.05 |
| FCP    | < 1.8s | < 1.2s |
| TTI    | < 3.8s | < 2.5s |

## Troubleshooting

### Metrics Not Recording

1. Check browser console for errors
2. Verify PerformanceObserver support
3. Check if metrics are cleared too quickly

### High Performance Impact

1. Reduce number of metrics recorded
2. Use sampling for high-frequency events
3. Consider using web workers for heavy calculations

### Missing Web Vitals

1. Verify page load completes
2. Check browser compatibility
3. Ensure PerformanceObserver is supported

## Additional Resources

- [Web Vitals](https://web.dev/vitals/)
- [Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)


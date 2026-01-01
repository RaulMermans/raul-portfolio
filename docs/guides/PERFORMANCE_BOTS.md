# Performance Bots & Automation

This document describes the automated performance and optimization systems (bots) built into the website.

## Overview

The website includes several automated "bots" that run in the background to:
- Monitor performance metrics
- Optimize caching
- Track errors
- Provide recommendations
- Auto-optimize based on data

## Available Bots

### 1. Performance Bot (`lib/performance-bot.ts`)

**Purpose**: Monitors and tracks website performance metrics

**Features**:
- Tracks Core Web Vitals (LCP, FID, CLS)
- Generates performance reports
- Provides optimization recommendations
- Calculates performance scores
- Sends metrics to analytics API

**Usage**:
```typescript
import { performanceBot } from '@/lib/performance-bot'

// Get current performance score
const score = performanceBot.getScore()

// Get recommendations
const recommendations = performanceBot.getRecommendations()

// Check if performance is acceptable
const isGood = performanceBot.isPerformanceAcceptable()
```

**Auto-start**: Automatically starts monitoring when page loads

### 2. Cache Bot (`lib/cache-bot.ts`)

**Purpose**: Manages intelligent caching for improved performance

**Features**:
- In-memory caching with TTL
- Automatic cache cleanup
- Resource preloading
- Cache warming for likely pages
- Cache statistics

**Usage**:
```typescript
import { cacheBot } from '@/lib/cache-bot'

// Cache data
cacheBot.set('key', data, 3600000) // 1 hour TTL

// Get cached data
const data = cacheBot.get('key')

// Preload resources
await cacheBot.preloadResources(['/images/about/profile.webp'])

// Warm cache
await cacheBot.warmCache(['/about', '/case-studies'])
```

**Auto-start**: Automatically cleans expired cache every 5 minutes

### 3. Error Bot (`lib/error-bot.ts`)

**Purpose**: Tracks errors and provides automatic recovery

**Features**:
- Global error handling
- Error frequency tracking
- Error statistics
- Automatic error recovery attempts
- Integration with error tracking services

**Usage**:
```typescript
import { errorBot } from '@/lib/error-bot'

// Report error
errorBot.reportError(error, 'Context')

// Get error stats
const stats = errorBot.getErrorStats()

// Attempt recovery
const recovered = errorBot.attemptRecovery(error)
```

**Auto-start**: Automatically sets up global error handlers

### 4. Optimization Bot (`lib/optimization-bot.ts`)

**Purpose**: Orchestrates all optimization tasks

**Features**:
- Runs optimization tasks on schedule
- Prioritizes tasks by importance
- Coordinates all bots
- Provides unified optimization interface

**Tasks**:
1. Clean expired cache (every 5 minutes)
2. Preload critical resources (on page load)
3. Warm cache for likely pages (periodically)
4. Generate performance reports (periodically)
5. Auto-optimize based on metrics (when needed)

**Usage**:
```typescript
import { optimizationBot } from '@/lib/optimization-bot'

// Register custom task
optimizationBot.registerTask({
  id: 'my-task',
  name: 'My Optimization Task',
  priority: 'high',
  execute: async () => {
    // Your optimization logic
  },
})

// Manually trigger optimization
await optimizationBot.optimize()

// Start continuous optimization
optimizationBot.start(300000) // Every 5 minutes

// Stop optimization
optimizationBot.stop()
```

**Auto-start**: Automatically starts after page load

## API Endpoints

### GET `/api/bot/status`

Returns status of all bots.

**Response**:
```json
{
  "success": true,
  "bots": {
    "performance": {
      "active": true,
      "score": 85,
      "metrics": {
        "lcp": 1800,
        "fid": 45,
        "cls": 0.05
      },
      "recommendations": []
    },
    "cache": {
      "active": true,
      "size": 10,
      "keys": 10
    },
    "error": {
      "active": true,
      "totalErrors": 0,
      "recentErrors": 0
    }
  }
}
```

### POST `/api/analytics`

Sends performance metrics to analytics.

**Request**:
```json
{
  "metrics": [
    { "name": "lcp", "value": 1800 },
    { "name": "fid", "value": 45 }
  ],
  "url": "/about",
  "userAgent": "..."
}
```

### POST `/api/optimize`

Triggers manual optimization (requires secret).

**Headers**:
```
x-optimize-secret: your-secret-key
```

## Usage

### Check Bot Status

```bash
npm run bot:status
```

Or visit: `http://localhost:3000/api/bot/status`

### View Performance Metrics

In development, bots log metrics to console. In production, metrics are sent to analytics API.

### Custom Optimization Tasks

Add your own optimization tasks:

```typescript
// In your component or page
import { optimizationBot } from '@/lib/optimization-bot'

useEffect(() => {
  optimizationBot.registerTask({
    id: 'my-custom-task',
    name: 'Custom Optimization',
    priority: 'medium',
    execute: async () => {
      // Your optimization logic
    },
  })
}, [])
```

## Configuration

### Environment Variables

Add to `.env.local`:

```env
# Optimization secret (for /api/optimize endpoint)
OPTIMIZE_SECRET=your-secret-key-here

# Analytics endpoint (optional)
ANALYTICS_ENDPOINT=/api/analytics
```

### Performance Thresholds

Edit `lib/performance-bot.ts` to adjust thresholds:

```typescript
private readonly thresholds = {
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  // ...
}
```

## Monitoring

### Development

Bots log to console in development mode:
- Performance reports
- Cache statistics
- Error reports
- Optimization recommendations

### Production

In production, bots:
- Send metrics to analytics API
- Send errors to error tracking service
- Run silently without console logs

## Best Practices

### 1. Don't Over-Optimize

Bots run automatically - you don't need to manually trigger them unless needed.

### 2. Monitor Bot Status

Regularly check bot status to ensure they're working:
```bash
npm run bot:status
```

### 3. Review Recommendations

Check performance bot recommendations and implement fixes:
```typescript
const recommendations = performanceBot.getRecommendations()
```

### 4. Custom Tasks

Add custom optimization tasks for your specific needs:
- Image optimization
- Font preloading
- API response caching
- Resource prioritization

## Troubleshooting

### Bots Not Running

1. Check if development server is running
2. Check browser console for errors
3. Verify bots are imported in `app/layout.tsx`

### Performance Not Improving

1. Check bot status: `npm run bot:status`
2. Review recommendations
3. Check if optimization tasks are running
4. Verify cache is working

### Errors Not Being Tracked

1. Check error bot is initialized
2. Verify global error handlers are set up
3. Check error tracking service integration

## Additional Resources

- [Performance Bot Source](./../../lib/performance-bot.ts)
- [Cache Bot Source](./../../lib/cache-bot.ts)
- [Error Bot Source](./../../lib/error-bot.ts)
- [Optimization Bot Source](./../../lib/optimization-bot.ts)


# Monitoring and Alerting Setup Guide

This guide covers setting up comprehensive monitoring and alerting for the portfolio website to track performance, errors, and uptime.

## Overview

Monitoring infrastructure should track:
- **Application Performance**: Response times, error rates, throughput
- **Web Vitals**: LCP, FID, CLS (Core Web Vitals)
- **Error Tracking**: Exceptions, API errors, client-side errors
- **Uptime**: Service availability, health checks
- **User Analytics**: Page views, user behavior (optional)

## Monitoring Stack Recommendations

### Option 1: Vercel Analytics (Recommended for Vercel)

If deploying on Vercel, use built-in analytics:

**Setup**:
```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Features**:
- Automatic Web Vitals tracking
- Page view analytics
- No additional configuration needed
- Free tier available

### Option 2: Sentry (Recommended for Error Tracking)

**Setup**:
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  // Session Replay (optional)
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
```

```typescript
// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
})
```

**Features**:
- Error tracking with stack traces
- Performance monitoring
- Session replay
- Release tracking
- Alerting

### Option 3: Google Analytics 4 + Error Tracking

**Setup**:
```bash
npm install @next/third-parties
```

```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  )
}
```

**Custom Error Tracking**:
```typescript
// lib/analytics.ts
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}

export function trackError(error: Error, context?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: false,
      context,
    })
  }
}
```

### Option 4: Self-Hosted (Uptime Monitoring)

Use services like:
- **UptimeRobot** (free tier available)
- **Pingdom**
- **StatusCake**

Setup health check endpoint:
```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check database (if applicable)
    // Check external services (if applicable)
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    )
  }
}
```

## Integration with Existing Code

### Update Error Logging

Update `lib/errors.ts` to send errors to monitoring service:

```typescript
// lib/errors.ts
export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[Error${context ? ` - ${context}` : ''}]`, error)
    return
  }
  
  // Production: Send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Sentry
    if (typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.captureException(error, {
        tags: { context },
        level: 'error',
      })
    }
    
    // Or custom API endpoint
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     error: error instanceof Error ? error.message : String(error),
    //     stack: error instanceof Error ? error.stack : undefined,
    //     context,
    //     timestamp: new Date().toISOString(),
    //     userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    //   }),
    // }).catch(() => {
    //   // Silently fail if error reporting fails
    // })
  }
}
```

### Update Performance Monitoring

Update `lib/performance-monitor.ts` to send metrics:

```typescript
// lib/performance-monitor.ts
export function recordMetric(name: string, value: number): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}: ${value.toFixed(2)}ms`)
  }
  
  // Production: Send to analytics
  if (process.env.NODE_ENV === 'production') {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
        event_category: 'Performance',
      })
    }
    
    // Or custom API endpoint
    // fetch('/api/metrics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, value, timestamp: Date.now() }),
    // }).catch(() => {
    //   // Silently fail
    // })
  }
  
  // Store locally
  this.metrics.push({
    name,
    value,
    timestamp: Date.now(),
  })
  
  if (this.metrics.length > 100) {
    this.metrics.shift()
  }
}
```

## Alerting Setup

### Sentry Alerts

1. Go to Sentry dashboard
2. Navigate to Alerts
3. Create alert rules:
   - Error rate threshold
   - Performance degradation
   - New error types
4. Configure notifications (email, Slack, PagerDuty)

### Uptime Monitoring Alerts

1. Setup health check endpoint: `/api/health`
2. Configure uptime service to check endpoint every 1-5 minutes
3. Set alert thresholds:
   - Alert if down for > 2 minutes
   - Alert if response time > 5 seconds
4. Configure notification channels

### Custom Alerting (Optional)

Create custom alerting API:

```typescript
// app/api/alerts/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, message, severity, context } = body
    
    // Only allow internal calls or with API key
    const apiKey = request.headers.get('x-api-key')
    if (apiKey !== process.env.ALERT_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Send to notification service
    // - Email (SendGrid, Resend)
    // - Slack webhook
    // - Discord webhook
    // - PagerDuty
    
    // Example: Send to Slack
    if (process.env.SLACK_WEBHOOK_URL) {
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `Alert: ${type}`,
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*${type}*\n${message}\n\n*Severity:* ${severity}\n*Context:* ${JSON.stringify(context)}`,
              },
            },
          ],
        }),
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Alert API error:', error)
    return NextResponse.json(
      { error: 'Failed to send alert' },
      { status: 500 }
    )
  }
}
```

## Environment Variables

Add to `.env.local`:

```env
# Sentry
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_DSN=your_sentry_dsn

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Vercel Analytics (automatic if using Vercel)

# Alerting (optional)
ALERT_API_KEY=your_alert_api_key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

## Monitoring Dashboard Setup

### Key Metrics to Monitor

1. **Error Rate**
   - Target: < 0.1% of requests
   - Alert if: > 1% for 5 minutes

2. **Response Time (p95)**
   - Target: < 500ms
   - Alert if: > 2000ms for 5 minutes

3. **Uptime**
   - Target: > 99.9%
   - Alert if: Down for > 2 minutes

4. **Web Vitals**
   - LCP: < 2.5s
   - FID: < 100ms
   - CLS: < 0.1

5. **API Health**
   - Health check endpoint should return 200
   - Alert if: 503 or timeout

### Create Monitoring Dashboard

Use tools like:
- **Grafana** (self-hosted)
- **Datadog** (paid)
- **New Relic** (paid)
- **Vercel Analytics Dashboard** (if using Vercel)

## Best Practices

### 1. Don't Monitor Everything

Focus on:
- Critical user paths
- Error rates
- Performance degradation
- Uptime

### 2. Set Appropriate Alert Thresholds

- Too sensitive: Alert fatigue
- Too lenient: Miss critical issues
- Start conservative, adjust based on actual data

### 3. Include Context in Alerts

Always include:
- Error message
- Stack trace
- User context (if available)
- Timestamp
- Environment (production/staging)

### 4. Test Alerting

Regularly test that alerts work:
- Trigger test alerts
- Verify notifications are received
- Ensure alerting doesn't fail silently

### 5. Review and Improve

- Review error logs weekly
- Identify patterns
- Fix recurring issues
- Update alert thresholds based on trends

## Monitoring Checklist

- [ ] Error tracking service configured (Sentry, etc.)
- [ ] Performance monitoring enabled (Vercel Analytics, etc.)
- [ ] Health check endpoint implemented (`/api/health`)
- [ ] Uptime monitoring configured
- [ ] Alerts configured with appropriate thresholds
- [ ] Notification channels set up (email, Slack, etc.)
- [ ] Environment variables configured
- [ ] Monitoring dashboard set up
- [ ] Alerting tested
- [ ] Documentation updated

## Additional Resources

- [Vercel Analytics](https://vercel.com/docs/analytics)
- [Sentry Next.js Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Google Analytics 4](https://analytics.google.com/)
- [Web Vitals](https://web.dev/vitals/)


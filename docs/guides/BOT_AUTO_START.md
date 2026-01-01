# Bot Auto-Start Guide

## ✅ All Bots Are Automatically Active

All bots start automatically when the page loads. **No manual activation needed.**

## How Auto-Start Works

Each bot has auto-start code at the bottom of its file that:

1. **Checks if running in browser** (`typeof window !== 'undefined'`)
2. **Waits for page to be ready** (DOMContentLoaded or page already loaded)
3. **Starts monitoring automatically**

### Example Auto-Start Code

```typescript
// Auto-start monitoring in browser (non-blocking)
if (typeof window !== 'undefined') {
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    bot.startMonitoring()
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      bot.startMonitoring()
    })
  }
}
```

## Bot Status

All bots are **always active** when:
- ✅ Page loads in browser
- ✅ User navigates between pages
- ✅ Site is running (dev or production)

Bots are **NOT active** when:
- ❌ Server-side rendering (SSR)
- ❌ Static generation (build time)
- ❌ API routes

## Verify Bots Are Running

### Method 1: Check Browser Console

Open browser DevTools → Console. In development, you'll see:
- Performance reports
- Bot initialization messages
- Recommendations (if any)

### Method 2: Check Bot Status API

Visit: `http://localhost:3000/api/bot/status`

Or run:
```bash
npm run bot:status
```

### Method 3: Check Network Tab

Look for requests to `/api/analytics` (analytics bot sends data)

## Manual Control (Optional)

If you need to manually control bots, you can:

### Disable a Bot

Comment out the import in `app/layout.tsx`:
```typescript
// import '@/lib/seo-bot' // Disabled
```

### Manually Trigger a Scan

```typescript
import { seoBot } from '@/lib/seo-bot'

// Manually trigger SEO scan
const report = seoBot.scanPage()
console.log('SEO Report:', report)
```

### Stop Monitoring

Bots don't have a stop method (they're designed to run continuously), but you can:
- Remove the import from `app/layout.tsx`
- Or create a feature flag to disable them

## Bot Activity Timeline

```
Page Load
    ↓
DOM Ready
    ↓
Bots Initialize (automatic)
    ↓
Page Fully Loaded
    ↓
Bots Start Monitoring (automatic)
    ↓
Background Monitoring (continuous)
```

## What Each Bot Does Automatically

### Performance Bot
- ✅ Starts monitoring Core Web Vitals immediately
- ✅ Tracks LCP, FID, CLS automatically
- ✅ Generates reports after page load

### SEO Bot
- ✅ Scans page after load (non-blocking)
- ✅ Checks meta tags, structured data
- ✅ Validates SEO elements

### Image Optimization Bot
- ✅ Scans images after they load
- ✅ Suggests optimizations
- ✅ Preloads critical images

### Accessibility Bot
- ✅ Scans page for A11y issues
- ✅ Checks WCAG compliance
- ✅ Validates ARIA labels

### Analytics Bot
- ✅ Tracks pageviews automatically
- ✅ Monitors scroll depth
- ✅ Tracks clicks on links/buttons
- ✅ Sends data to `/api/analytics`

### Security Bot
- ✅ Scans for security issues
- ✅ Checks HTTPS, CSP
- ✅ Validates form security

### Cache Bot
- ✅ Cleans expired cache every 5 minutes
- ✅ Manages in-memory cache
- ✅ Preloads resources

### Error Bot
- ✅ Sets up global error handlers
- ✅ Tracks errors automatically
- ✅ Reports to error tracking

### Optimization Bot
- ✅ Runs optimization tasks every 5 minutes
- ✅ Coordinates all bots
- ✅ Auto-optimizes based on metrics

## Troubleshooting

### Bots Not Running?

1. **Check imports in `app/layout.tsx`**
   - All bot imports should be present

2. **Check browser console**
   - Look for errors
   - Check if bots are initializing

3. **Verify page is fully loaded**
   - Bots wait for `DOMContentLoaded` or `load` event

4. **Check bot status**
   ```bash
   npm run bot:status
   ```

### Bots Running Too Much?

Bots are optimized to:
- Run in background (non-blocking)
- Use `requestIdleCallback` (only when browser is idle)
- Limit data storage (max items per bot)
- Use passive event listeners

If you notice performance issues, check:
- Browser DevTools → Performance tab
- Network tab for excessive API calls
- Memory usage

## Summary

✅ **All bots are automatically active**  
✅ **No manual activation needed**  
✅ **Start automatically on page load**  
✅ **Run continuously in background**  
✅ **Non-blocking and optimized**

Just visit your website and the bots are working! 🚀


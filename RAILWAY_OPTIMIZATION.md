# Railway Infrastructure Optimization Guide

## Current Setup Analysis

Your Railway configuration is good, but here are optimizations to improve performance, cost, and reliability.

---

## 1. Environment Variables Optimization

### Required Variables (Set in Railway Dashboard)

```bash
# Production URL
NEXT_PUBLIC_SITE_URL=https://www.raulmermans.com

# Node Environment (Railway sets this automatically, but verify)
NODE_ENV=production

# Optional: Analytics & Monitoring
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id  # If using analytics
SENTRY_DSN=your-sentry-dsn  # If using error tracking

# Optional: API Keys (if needed)
OPTIMIZE_SECRET=your-secret-key  # For /api/optimize endpoint
```

### Recommended: Add to Railway Variables

1. **Go to Railway Dashboard → Your Service → Variables Tab**
2. **Add these variables:**

```bash
# Performance
NODE_OPTIONS=--max-old-space-size=2048  # Memory limit (adjust based on plan)

# Next.js Optimization
NEXT_TELEMETRY_DISABLED=1  # Disable telemetry (privacy + performance)

# Build Optimization
SKIP_ENV_VALIDATION=false  # Keep false for safety
```

---

## 2. Build Configuration Optimization

### Update `railway.json`

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm ci && npm run build",
    "watchPatterns": [
      "**/*.ts",
      "**/*.tsx",
      "**/*.js",
      "**/*.jsx"
    ]
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10,
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100
  }
}
```

**Changes:**
- `npm ci` instead of `npm install` (faster, more reliable)
- Added `watchPatterns` for better change detection
- Added healthcheck for better monitoring

### Update `package.json` Scripts

Add optimized scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "postinstall": "next telemetry disable || true",
    "image:check": "node scripts/upload-image.js check",
    "image:help": "node scripts/upload-image.js help",
    "bot:status": "node scripts/bot-status.js"
  }
}
```

**New script:**
- `postinstall`: Disables Next.js telemetry automatically

---

## 3. Next.js Configuration Optimization

### Update `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Cache images for 60 seconds
  },
  
  // Compression
  compress: true,
  
  // Font optimization
  optimizeFonts: true,
  
  // Output optimization
  poweredByHeader: false, // Remove X-Powered-By header (security)
  
  // Webpack optimization
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    }
    
    // Optimize bundle size
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module) {
                return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier())
              },
              name(module) {
                const hash = require('crypto').createHash('sha1')
                hash.update(module.identifier())
                return hash.digest('hex').substring(0, 8)
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
            },
            shared: {
              name(module, chunks) {
                return require('crypto')
                  .createHash('sha1')
                  .update(chunks.reduce((acc, chunk) => acc + chunk.name, ''))
                  .digest('hex')
                  .substring(0, 8)
              },
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }
    
    return config
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

**Key optimizations:**
- Advanced webpack code splitting
- Security headers
- Image caching
- Bundle size optimization

---

## 4. Railway Service Settings

### In Railway Dashboard → Settings:

1. **Resource Allocation:**
   - **Memory**: 512MB - 1GB (for Next.js)
   - **CPU**: 0.5 - 1 vCPU
   - **Start with minimum, scale up if needed**

2. **Auto-Deploy:**
   - ✅ Enable "Auto Deploy" for main branch
   - ✅ Enable "Deploy on Push"

3. **Health Checks:**
   - **Path**: `/api/health`
   - **Timeout**: 100ms
   - **Interval**: 30s

4. **Restart Policy:**
   - ✅ Enable "Restart on Failure"
   - **Max Retries**: 10

---

## 5. Database Optimization (PostgreSQL)

If you're using the Postgres service:

### Recommended Settings:

```sql
-- Connection pooling (if using many connections)
-- Set in Railway Postgres variables:
MAX_CONNECTIONS=100
SHARED_BUFFERS=256MB
EFFECTIVE_CACHE_SIZE=1GB
```

### Connection String Optimization:

```bash
# In Railway Variables, use connection pooling:
DATABASE_URL=postgresql://user:pass@host:port/db?sslmode=require&pool_timeout=20
```

---

## 6. Cost Optimization

### Free Tier Optimization:

1. **Use Railway's Free Tier Wisely:**
   - 500 hours/month free
   - Monitor usage in Railway dashboard
   - Stop services when not needed (dev/staging)

2. **Optimize Build Time:**
   - Use `npm ci` (faster installs)
   - Enable build caching
   - Minimize dependencies

3. **Resource Usage:**
   - Start with minimum resources
   - Scale up only if needed
   - Monitor metrics in Railway dashboard

### Paid Tier Tips:

1. **Use Reserved Instances** (if available) for cost savings
2. **Monitor usage** to avoid over-provisioning
3. **Use Railway's usage alerts**

---

## 7. Performance Monitoring

### Add to Railway Variables:

```bash
# Enable performance monitoring
NEXT_PUBLIC_ENABLE_MONITORING=true
RAILWAY_ENVIRONMENT=production
```

### Monitor in Railway Dashboard:

1. **Metrics Tab:**
   - CPU usage
   - Memory usage
   - Network I/O
   - Request latency

2. **Logs Tab:**
   - Build logs
   - Runtime logs
   - Error logs

3. **Set Up Alerts:**
   - High CPU usage (>80%)
   - High memory usage (>90%)
   - Failed deployments
   - Service downtime

---

## 8. Security Optimization

### Add Security Headers (via next.config.js - see above)

### Environment Variables Security:

1. **Never commit secrets** to git
2. **Use Railway Variables** for all secrets
3. **Rotate secrets** regularly
4. **Use different secrets** for dev/staging/prod

### Recommended Security Variables:

```bash
# API Security
OPTIMIZE_SECRET=generate-strong-random-secret-here

# CORS (if needed)
ALLOWED_ORIGINS=https://www.raulmermans.com,https://raulmermans.com
```

---

## 9. Caching Strategy

### Railway CDN (if available):

1. **Enable CDN** for static assets
2. **Set cache headers** (via next.config.js)
3. **Cache static pages** (Next.js does this automatically)

### Next.js Caching:

- Static pages are cached automatically
- API routes can use `revalidate` for ISR
- Images are cached via Next.js Image component

---

## 10. Deployment Optimization

### Pre-Deploy Checklist:

- [ ] All environment variables set
- [ ] Build passes locally (`npm run build`)
- [ ] TypeScript compiles (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Health check endpoint works (`/api/health`)

### Deployment Best Practices:

1. **Use feature branches** for testing
2. **Test locally** before pushing
3. **Monitor first deployment** after changes
4. **Keep deployment history** (Railway does this automatically)

---

## 11. Recommended Railway Modules/Add-ons

### Consider Adding:

1. **Logging Service** (if needed):
   - Better log aggregation
   - Search and filtering
   - Alerts

2. **Monitoring Service** (optional):
   - Uptime monitoring
   - Performance metrics
   - Error tracking

3. **Backup Service** (for Postgres):
   - Automated backups
   - Point-in-time recovery

---

## 12. Quick Wins Checklist

### Immediate Actions:

- [ ] Add `NEXT_TELEMETRY_DISABLED=1` to Railway variables
- [ ] Update `railway.json` with `npm ci`
- [ ] Add health check path: `/api/health`
- [ ] Set `NEXT_PUBLIC_SITE_URL` in Railway variables
- [ ] Enable auto-deploy in Railway settings
- [ ] Monitor first deployment after changes

### Performance Improvements:

- [ ] Update `next.config.js` with optimizations
- [ ] Add security headers
- [ ] Optimize webpack bundle splitting
- [ ] Enable image caching

### Cost Savings:

- [ ] Start with minimum resources
- [ ] Monitor usage in Railway dashboard
- [ ] Use build caching
- [ ] Optimize dependencies

---

## Summary

**Priority 1 (Do Now):**
1. Add environment variables in Railway
2. Update `railway.json` with `npm ci`
3. Add health check

**Priority 2 (This Week):**
1. Update `next.config.js` with optimizations
2. Add security headers
3. Monitor metrics

**Priority 3 (Ongoing):**
1. Monitor performance
2. Optimize based on metrics
3. Review costs regularly

Your Railway setup is already good! These optimizations will make it even better. 🚀


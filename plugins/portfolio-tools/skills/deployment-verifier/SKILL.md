---
name: deployment-verifier
description: Guide for verifying deployments of the portfolio. This skill should be used before deploying changes, after deployment to verify success, or when debugging deployment issues. Provides pre-deploy checklists, verification commands, and troubleshooting guidance for the IONOS + Cloudflare stack.
---

# Deployment Verifier

This skill provides guidance for verifying deployments are successful and properly configured.

## Deployment Stack

- **Origin Server**: IONOS Hosting Plus (static files via SFTP from GitHub Actions)
- **Deploy**: GitHub Actions auto-deploys on push to `main`
- **CDN/Proxy**: Cloudflare (DNS with orange cloud)
- **Domain**: raulmermans.com (www + apex)

## Pre-Deploy Checklist

Before pushing to deploy:

### Code Quality

```bash
# Run all checks
npm run lint          # ESLint
npm run type-check    # TypeScript
npm run build         # Production build
```

All must pass without errors.

### Environment Variables

Verify these are set in GitHub (Settings → Secrets and variables → Actions):

**Required (secrets):**
- [ ] `NEXT_PUBLIC_SITE_URL` - https://www.raulmermans.com
- [ ] `RESEND_API_KEY` - For contact form
- [ ] `CONTACT_EMAIL` - Email recipient
- [ ] `FROM_EMAIL` - Sender email

**Optional (variables):**
- [ ] `NEXT_PUBLIC_SITE_URL` - https://www.raulmermans.com (or set in workflow)
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics

**SFTP Secrets (required for deploy):**
- [ ] `SFTP_SERVER` - IONOS SFTP host
- [ ] `SFTP_USERNAME` - IONOS SFTP username
- [ ] `SFTP_PASSWORD` - IONOS SFTP password
- [ ] `SFTP_PORT` - Usually 22

### File Checks

- [ ] No `.env` files in commit
- [ ] No hardcoded secrets
- [ ] Images optimized (WebP, appropriate sizes)
- [ ] No console.log statements (use logger)

## Post-Deploy Verification

### 1. Cloudflare Proxy Active

```bash
curl -I https://www.raulmermans.com
```

**Expected headers:**
```
server: cloudflare
cf-ray: [some-id]
cache-control: public, max-age=0, must-revalidate
```

If no `cf-ray` header, Cloudflare proxy is not active.

### 2. HTML Pages - Fresh on Deploy

```bash
curl -I https://www.raulmermans.com
```

**Expected:**
```
cache-control: public, max-age=0, must-revalidate
```

This ensures new deploys are immediately visible.

### 3. Static Assets - Cached Correctly

```bash
# Get a real chunk path from the page
CHUNK_PATH=$(curl -s https://www.raulmermans.com | grep -o '/_next/static/[^"]*\.js' | head -n 1)

# First request (cache MISS)
curl -I "https://www.raulmermans.com${CHUNK_PATH}"
```

**Expected:**
```
cache-control: public, max-age=31536000, immutable
cf-cache-status: MISS  (first request)
```

```bash
# Second request (cache HIT)
curl -I "https://www.raulmermans.com${CHUNK_PATH}"
```

**Expected:**
```
cf-cache-status: HIT
```

### 4. Contact Form Works (if using serverless/API)

With static export, API routes are not deployed. If the contact form uses a serverless function or external service:
1. Navigate to https://www.raulmermans.com
2. Fill out contact form
3. Submit
4. Verify email received

### 5. Contact Form (Static Export Note)

### 6. Image Loading

```bash
curl -I https://www.raulmermans.com/images/case-studies/ai-sports/hero/hero.webp
```

**Expected:**
```
cache-control: public, max-age=3600, stale-while-revalidate=86400
content-type: image/webp
```

## Quick Verification Script

Run all checks at once:

```bash
#!/bin/bash
DOMAIN="https://www.raulmermans.com"

echo "=== Deployment Verification ==="

# 1. Cloudflare check
echo -e "\n1. Cloudflare Proxy:"
curl -sI $DOMAIN | grep -E "server:|cf-ray:"

# 2. HTML caching
echo -e "\n2. HTML Cache-Control:"
curl -sI $DOMAIN | grep "cache-control"

# 3. API not cached
echo -e "\n3. API Cache Status:"
curl -sI $DOMAIN/api/health | grep -E "cache-control:|cf-cache-status:"

# 4. Health endpoint
echo -e "\n4. Health Check:"
curl -s $DOMAIN/api/health

# 5. Static asset caching
echo -e "\n5. Static Asset Caching:"
CHUNK=$(curl -s $DOMAIN | grep -o '/_next/static/[^"]*\.js' | head -n 1)
if [ -n "$CHUNK" ]; then
  curl -sI "$DOMAIN$CHUNK" | grep -E "cache-control:|cf-cache-status:"
fi

echo -e "\n=== Verification Complete ==="
```

## Troubleshooting

### Changes Not Appearing

1. **Clear browser cache** - Hard refresh (Cmd+Shift+R)
2. **Check GitHub Actions logs** - Verify build and SFTP deploy succeeded
3. **Purge Cloudflare cache** - Dashboard > Caching > Purge Everything
4. **Verify build output** - Check for build errors

### Build Fails

```bash
# Check locally first
npm run build

# Common issues:
# - TypeScript errors
# - Missing environment variables
# - Import errors
# - ESLint errors (in strict mode)
```

### API Returning Cached Data

If API routes are being cached:

1. Check `next.config.js` headers for `/api/:path*`
2. Should be: `no-cache, no-store, must-revalidate`
3. Purge Cloudflare cache after fixing

### Contact Form Broken

1. **Check GitHub Secrets** - RESEND_API_KEY, CONTACT_EMAIL, FROM_EMAIL (if using form backend)
2. **Check GitHub Actions logs** - Look for build/deploy errors
3. **Test locally** - `npm run dev` and test form
4. **Check rate limiting** - Wait 1 minute if rate limited

### Images Not Loading

1. **Verify file exists** in `public/images/`
2. **Check path** - Should start with `/images/`
3. **Check file extension** - Should be `.webp`
4. **Check Cloudflare** - Images might be cached with old path

### SSL Certificate Issues

Cloudflare handles SSL. If issues:

1. Check Cloudflare SSL/TLS settings - Should be "Full (strict)"
2. Verify IONOS/origin has valid certificate
3. Check domain DNS is proxied (orange cloud)

## GitHub Actions Checks

### Workflow Logs

GitHub > Repository > Actions > "Deploy to IONOS" workflow

Look for:
- Build success/failure
- SFTP upload success
- No secrets exposed in logs

### Secrets

GitHub > Settings > Secrets and variables > Actions

Verify: SFTP_SERVER, SFTP_USERNAME, SFTP_PASSWORD, SFTP_PORT, NEXT_PUBLIC_SITE_URL

## Cloudflare Dashboard Checks

### DNS Settings

Cloudflare > DNS

Verify:
- `www` CNAME → IONOS host (proxied - orange cloud)
- `@` (apex) CNAME or A → IONOS IP (proxied - orange cloud)

### Caching

Cloudflare > Caching > Configuration

Recommended:
- Caching Level: Standard
- Browser Cache TTL: Respect Existing Headers
- Always Online: On

### Page Rules (if used)

Verify no conflicting page rules that might override headers.

## Health Check Endpoint

The `/api/health` endpoint returns:

```json
{
  "status": "healthy",
  "timestamp": "2025-01-21T12:00:00.000Z",
  "version": "1.0.0"
}
```

Use for:
- Uptime monitoring
- Deployment verification
- Load balancer health checks

## Rollback Procedure

If deployment causes issues:

### Git Rollback

```bash
# Revert last commit
git revert HEAD
git push

# Or reset to specific commit
git reset --hard <commit-hash>
git push --force  # Careful!
```

## Monitoring Setup

### Recommended Monitoring

1. **Uptime monitoring** - Ping `/api/health` every 5 minutes
2. **Error tracking** - Sentry or similar
3. **Analytics** - Google Analytics configured
4. **Real User Monitoring** - Web Vitals tracking

### Alerting

Set up alerts for:
- Site down (health check fails)
- High error rate
- Slow response times
- SSL certificate expiring

## Complete Deployment Checklist

### Before Deploy
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] `npm run build` passes
- [ ] No secrets in code
- [ ] Images optimized
- [ ] Tested locally

### After Deploy
- [ ] Site loads (https://www.raulmermans.com)
- [ ] Cloudflare proxy active (cf-ray header)
- [ ] API not cached (cf-cache-status: DYNAMIC)
- [ ] Static assets cached (cf-cache-status: HIT on second request)
- [ ] Contact form works
- [ ] Images load correctly
- [ ] No console errors
- [ ] Mobile responsive
- [ ] All pages accessible

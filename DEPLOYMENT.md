# 🚀 Deployment Guide

## Quick Start

1. **Set Environment Variables** (Railway Dashboard):
   - `NEXT_PUBLIC_SITE_URL` - Your site URL
   - `RESEND_API_KEY` - Resend API key (for contact form)
   - `CONTACT_EMAIL` - Email to receive contact form submissions
   - `FROM_EMAIL` - Sender email (use `onboarding@resend.dev` for testing)

2. **Deploy:**
   - Push to GitHub → Railway auto-deploys
   - Or manually trigger deployment in Railway dashboard

3. **Verify:**
   - Check Railway deployment logs
   - Visit your site
   - Test contact form (if configured)

## Cloudflare CDN Setup

### Prerequisites
- Railway deployment active and working
- Cloudflare account with your domain added

### Step 1: Configure Railway Custom Domain

1. In Railway dashboard, go to your project → Settings → Domains
2. Note the CNAME/A record target Railway provides (e.g., `xxx.up.railway.app`)
3. Keep this tab open - you'll need it for Cloudflare DNS

### Step 2: Configure Cloudflare DNS

1. Log in to Cloudflare dashboard
2. Select your domain (e.g., `raulmermans.com`)
3. Go to **DNS** → **Records**
4. Add/update the following records:

   **For www subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Target: `<your-railway-domain>.up.railway.app` (from Step 1)
   - Proxy status: **Proxied** (orange cloud icon) ← Critical!
   - TTL: Auto

   **For apex domain (optional):**
   - Type: `CNAME` or `A`
   - Name: `@`
   - Target: Same as above (or Railway's A record IP)
   - Proxy status: **Proxied** (orange cloud)
   - TTL: Auto

### Step 3: Verify Cloudflare is Active

**Wait for DNS propagation** - repeatedly test until Cloudflare headers appear (typically 1-10 minutes, sometimes up to an hour for global propagation).

#### Verification 1: Cloudflare Proxy Active

```bash
# Check if Cloudflare is in front of your site
curl -I https://www.raulmermans.com

# Expected: Look for either of these Cloudflare indicators:
# - server: cloudflare
# - cf-ray: <some-id>
# - cf-cache-status: <status>
#
# Also expect HTML cache header:
# - cache-control: public, max-age=0, must-revalidate
```

#### Verification 2: Static Assets Cached Correctly

```bash
# Step 1: Extract an actual static chunk path from your site
CHUNK_PATH=$(curl -s https://www.raulmermans.com | grep -o '/_next/static/[^"]*\.js' | head -n 1)
echo "Testing chunk: $CHUNK_PATH"

# Step 2: Test caching headers on that chunk
curl -I "https://www.raulmermans.com${CHUNK_PATH}"

# Expected output:
# - cache-control: public, max-age=31536000, immutable
# - cf-cache-status: MISS (on first request)
#
# Run the same curl command again:
curl -I "https://www.raulmermans.com${CHUNK_PATH}"
# Expected on second request:
# - cf-cache-status: HIT
```

#### Verification 3: Apex Domain Redirect (if configured)

```bash
# Check if apex domain redirects to www
curl -I https://raulmermans.com

# Expected: 301 or 308 redirect to https://www.raulmermans.com
# If you see "server: cloudflare" and a 200 OK, the apex is serving directly
# (both configurations are valid - choose based on your preference)
```

### Step 4: Configure Cloudflare Caching (Optional)

1. In Cloudflare, go to **Caching** → **Configuration**
2. Recommended settings:
   - **Browser Cache TTL:** Respect Existing Headers
   - **Always Online:** On (optional)
   - **Development Mode:** Off (unless testing)

3. **Page Rules** (optional, only if needed):
   - URL: `www.raulmermans.com/_next/static/*`
   - Setting: Cache Level = Cache Everything
   - Edge Cache TTL: 1 year

#### Verification 4: API Routes Not Cached

```bash
# Check that API routes are never cached
curl -I https://www.raulmermans.com/api/health

# Expected:
# - cache-control: no-cache, no-store, must-revalidate
# - cf-cache-status: DYNAMIC or BYPASS (NOT HIT or MISS)
```

### Verification Checklist

After completing Steps 3-4 above, confirm:

- [ ] ✅ Verification 1: `curl -I https://www.raulmermans.com` shows `server: cloudflare` or `cf-ray`
- [ ] ✅ Verification 2: Static chunk shows `cache-control: public, max-age=31536000, immutable`
- [ ] ✅ Verification 2: Second request to static chunk shows `cf-cache-status: HIT`
- [ ] ✅ Verification 3: Apex redirect works (or apex serves directly if preferred)
- [ ] ✅ Verification 4: API route shows `cache-control: no-cache, no-store, must-revalidate`
- [ ] ✅ HTML pages show `cache-control: public, max-age=0, must-revalidate`
- [ ] ✅ Contact form still works after Cloudflare enabled (API not cached)
- [ ] ✅ Site updates appear after new Railway deployment (no stale HTML)

## Railway Configuration

- **Build Command:** Automatically clears cache and builds
- **Start Command:** `npm start`
- **Node Version:** 18.0.0 (specified in `.nvmrc`)

## Troubleshooting

### Changes Not Appearing?
1. Clear browser cache (or use Incognito)
2. Check Railway deployment status
3. Verify build succeeded in Railway logs

### Build Fails?
1. Check Railway build logs for errors
2. Verify all environment variables are set
3. Ensure Node.js version matches (18.0.0)

## Contact Form Setup

See `docs/guides/CONTACT_FORM_SETUP.md` for detailed Resend configuration.


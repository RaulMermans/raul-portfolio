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

Wait 5-10 minutes for DNS propagation, then test:

```bash
# Check homepage shows Cloudflare headers
curl -I https://www.raulmermans.com

# Expected output includes:
# - server: cloudflare
# - cf-ray: <some-id>
# - cache-control: public, max-age=0, must-revalidate

# Check static assets are cached
curl -I https://www.raulmermans.com/_next/static/chunks/main-<hash>.js

# Expected output includes:
# - cache-control: public, max-age=31536000, immutable
# - cf-cache-status: HIT (on second request)
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

### Verification Checklist

- [ ] `curl -I https://www.raulmermans.com` shows `server: cloudflare`
- [ ] Static assets show `cache-control: public, max-age=31536000, immutable`
- [ ] Second request to static asset shows `cf-cache-status: HIT`
- [ ] HTML pages show `cache-control: public, max-age=0, must-revalidate`
- [ ] API routes show `cache-control: no-cache, no-store, must-revalidate`
- [ ] Contact form still works (API not cached)
- [ ] Site updates after new Railway deployment (no stale HTML)

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


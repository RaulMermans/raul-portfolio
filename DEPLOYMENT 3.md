# 🚀 Deployment Guide

## Quick Start (IONOS Hosting Plus)

1. **GitHub Actions**: The deployment is handled automatically via GitHub Actions in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
2. **Secrets**: Ensure the following secrets are set in your GitHub repository settings:
   - `SFTP_SERVER` - Your IONOS SFTP host
   - `SFTP_USERNAME` - Your IONOS SFTP username
   - `SFTP_PASSWORD` - Your IONOS SFTP password
   - `SFTP_PORT` - Usually 22

3. **Deploy**: Push to the `main` branch to trigger the deployment.

## Removing Railway (Migration)

If you previously used Railway and see failing "Deployment failed" checks (e.g. "adequate-courage - raul-portfolio"):

1. **Disconnect in Railway Dashboard**
   - Go to [railway.app](https://railway.app) → Your project → Settings
   - Find "GitHub" or "Source" and **Disconnect** the repository
   - Or delete the Railway project entirely

2. **Remove from GitHub Branch Protection** (if Railway was a required check)
   - GitHub → Repository → Settings → Branches → Branch protection rules → Edit `main`
   - In "Require status checks to pass", remove the Railway check (e.g. "adequate-courage")
   - Save changes

3. **Verify**: Push a commit; only the "Deploy to IONOS SFTP" check should run.

## Cloudflare CDN Setup

### Prerequisites
- Cloudflare account with your domain added

### Step 1: Configure IONOS Custom Domain

1. In Cloudflare dashboard, go to your DNS settings for your domain.
2. Note the IP address or hostname provided by IONOS.
3. Keep this tab open - you'll need it for Cloudflare DNS

### Step 2: Configure Cloudflare DNS

1. Log in to Cloudflare dashboard
2. Select your domain (e.g., `raulmermans.com`)
3. Go to **DNS** → **Records**
4. Add/update the following records:

   **For www subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Target: `your-ionos-domain.com`
   - Proxy status: **Proxied** (orange cloud icon) ← Critical!
   - TTL: Auto

   **For apex domain (optional):**
   - Type: `CNAME` or `A`
   - Name: `@`
   - Target: Your IONOS IP address
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

### Verification Checklist

After completing Steps 3-4 above, confirm:

- [ ] ✅ Verification 1: `curl -I https://www.raulmermans.com` shows `server: cloudflare` or `cf-ray`
- [ ] ✅ Verification 2: Static chunk shows `cache-control: public, max-age=31536000, immutable`
- [ ] ✅ Verification 2: Second request to static chunk shows `cf-cache-status: HIT`
- [ ] ✅ Verification 3: Apex redirect works (or apex serves directly if preferred)
- [ ] ✅ HTML pages show `cache-control: public, max-age=0, must-revalidate`
- [ ] ✅ Contact link opens the visitor's email client
- [ ] ✅ Site updates appear after new GitHub Action deploy (no stale HTML)

## IONOS Configuration

- **Static Export**: Ensure `next.config.js` is configured for static export (`output: 'export'`).
- **Node Version**: 18.0.0 (specified in `.nvmrc`)

## Troubleshooting

### Deploy fails: "mirror: Not connected" or SFTP timeout?
1. **Verify IONOS SFTP credentials** – In IONOS control panel, confirm the SFTP host (often `ftp.yourdomain.com` or your server hostname), username, and password.
2. **Check secrets** – Ensure `SFTP_SERVER`, `SFTP_USERNAME`, `SFTP_PASSWORD`, and `SFTP_PORT` (usually `22`) are set in GitHub → Settings → Secrets and variables → Actions.
3. **Test locally** – Run `lftp -u USER,PASS -e "set sftp:auto-confirm yes; open sftp://HOST:22; ls; quit"` from your machine to confirm credentials work.
4. **IONOS firewall** – Some plans restrict SFTP by IP; GitHub Actions use dynamic IPs. Check if IONOS allows connections from any IP or if whitelisting is required.

### Changes Not Appearing?
1. Clear browser cache (or use Incognito)
2. Check GitHub Actions deployment status
3. Verify the files are correctly uploaded to IONOS via SFTP

### Build Fails?
1. Check GitHub Action logs for errors
2. Verify all environment variables and secrets are set
3. Ensure the project is static-export compatible

## Contact

The portfolio uses a static-safe `mailto:` contact flow. Do not add server-side contact credentials to this repository.

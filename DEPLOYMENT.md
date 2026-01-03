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


# Environment Variables Setup

## Quick Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your actual values (see CONTACT_FORM_SETUP.md for Resend setup)

3. Required variables:
   - `NEXT_PUBLIC_SITE_URL` - Your production URL
   - `RESEND_API_KEY` - From Resend (see CONTACT_FORM_SETUP.md)
   - `CONTACT_EMAIL` - Your email address
   - `FROM_EMAIL` - Email sender address

## For Production

Add these same variables to your deployment platform (Railway/Vercel) in the environment variables section.


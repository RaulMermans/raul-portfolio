# Contact Form Email Integration Setup Guide

This guide will walk you through setting up email integration for your contact form using Resend.

## 📋 Overview

Your contact form is now configured to send emails using [Resend](https://resend.com), a modern email API service. This guide covers:

1. Creating a Resend account
2. Getting your API key
3. Verifying your domain (optional, for production)
4. Setting up environment variables
5. Testing the integration

---

## 🚀 Step-by-Step Setup

### Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Click **"Sign Up"** (top right)
3. Sign up with your email (or use GitHub/Google)
4. Verify your email address

**✅ Done by you** - Takes ~2 minutes

---

### Step 2: Get Your API Key

1. Once logged in, go to [https://resend.com/api-keys](https://resend.com/api-keys)
2. Click **"Create API Key"**
3. Give it a name (e.g., "Portfolio Contact Form")
4. Select **"Sending access"** (not "Full access" - more secure)
5. Click **"Add"**
6. **IMPORTANT**: Copy the API key immediately - you won't be able to see it again!

**✅ Done by you** - Takes ~1 minute

---

### Step 3: Set Up Environment Variables

#### For Local Development:

1. In your project root, create a file named `.env.local` (if it doesn't exist)
2. Add the following:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://raulmermans.com

# Email Service (Resend)
RESEND_API_KEY=re_your_actual_api_key_here

# Contact Form Email Configuration
CONTACT_EMAIL=raulmermans@gmail.com

# From Email Address (use onboarding@resend.dev for testing)
FROM_EMAIL=onboarding@resend.dev
```

3. Replace `re_your_actual_api_key_here` with the API key you copied in Step 2
4. Save the file

**✅ Done by you** - Takes ~2 minutes

#### For Production (IONOS):

1. For static export: set secrets in GitHub repository (Settings → Secrets) so the build can access them. Resend API calls run client-side or via a separate backend.
2. If using a server/API: go to your hosting platform
2. Navigate to your project settings
3. Find "Environment Variables" or "Secrets"
4. Add these variables:

```
NEXT_PUBLIC_SITE_URL = https://raulmermans.com
RESEND_API_KEY = re_your_actual_api_key_here
CONTACT_EMAIL = raulmermans@gmail.com
FROM_EMAIL = onboarding@resend.dev
```

5. Save and redeploy your application

**✅ Done by you** - Takes ~3 minutes

---

### Step 4: Test the Integration (Local)

1. Make sure your `.env.local` file is set up correctly
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Test the contact form on your local site
4. Check your email inbox (the email specified in `CONTACT_EMAIL`)
5. You should receive the contact form submission

**✅ Done by you** - Takes ~2 minutes

---

### Step 5: Verify Your Domain (Optional - For Production)

**Why?** This allows you to send emails from `noreply@raulmermans.com` instead of `onboarding@resend.dev`, which looks more professional.

1. Go to [https://resend.com/domains](https://resend.com/domains)
2. Click **"Add Domain"**
3. Enter your domain: `raulmermans.com`
4. Follow the DNS setup instructions:
   - Add the provided DNS records to your domain
   - Wait for verification (can take a few minutes to 24 hours)
5. Once verified, update your `FROM_EMAIL` to use your domain:
   ```
   FROM_EMAIL=noreply@raulmermans.com
   ```

**✅ Done by you** - Takes ~10-30 minutes (mostly waiting for DNS)

---

## 🧪 Testing

### Test Email Sending

You can test the API endpoint directly:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

Or use the contact form on your website.

### Expected Response

**Success:**
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon.",
  "emailId": "abc123..."
}
```

**Error (missing fields):**
```json
{
  "error": "Missing required fields"
}
```

---

## 🔒 Security Notes

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Keep your API key secret** - Don't share it publicly
3. **Use environment variables** - Never hardcode API keys
4. **Rate limiting** - Resend has rate limits (100 emails/day on free tier)
5. **Domain verification** - Required for production use

---

## 📊 Resend Free Tier Limits

- **100 emails/day**
- **3,000 emails/month**
- Perfect for a portfolio contact form!

If you need more, upgrade to a paid plan.

---

## 🐛 Troubleshooting

### "Email service not configured"
- Check that `RESEND_API_KEY` is set in your environment variables
- Restart your development server after adding environment variables

### "Failed to send email"
- Verify your API key is correct
- Check Resend dashboard for error logs
- Make sure you haven't exceeded rate limits

### Emails going to spam
- Verify your domain (Step 5)
- Use a proper "from" email address
- Add SPF/DKIM records (Resend provides these)

### Not receiving emails
- Check spam folder
- Verify `CONTACT_EMAIL` is correct
- Check Resend dashboard for delivery status

---

## ✅ Checklist

- [ ] Created Resend account
- [ ] Got API key from Resend
- [ ] Added environment variables to `.env.local`
- [ ] Tested locally - received test email
- [ ] Added environment variables to production (GitHub Actions / IONOS)
- [ ] Tested in production
- [ ] (Optional) Verified domain for custom "from" email

---

## 📚 Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Resend Pricing](https://resend.com/pricing)

---

## 🎉 You're Done!

Once you've completed these steps, your contact form will automatically send emails to your inbox whenever someone submits the form.

**Need help?** Check the troubleshooting section or Resend's support.


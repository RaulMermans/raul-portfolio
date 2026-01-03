# Railway Deployment - Environment Variables Setup

## Required Environment Variables

Add these to your Railway project settings:

### 1. Go to Railway Dashboard
- Open your project in Railway
- Click on your service
- Go to **"Variables"** tab

### 2. Add These Variables:

```
NEXT_PUBLIC_SITE_URL = https://raulmermans.com
RESEND_API_KEY = re_RcudF1U7_SoTJHy9ThaPL2QQcstX89LwC
CONTACT_EMAIL = raulmermans@gmail.com
FROM_EMAIL = onboarding@resend.dev
```

### 3. Save and Redeploy
- Click **"Save"** or **"Deploy"**
- Railway will automatically redeploy with the new variables

## Verification

After deployment, test the contact form:
1. Go to your live site
2. Submit a test message through the contact form
3. Check your email inbox (`raulmermans@gmail.com`)

## Notes

- The `RESEND_API_KEY` is your actual API key from Resend
- `FROM_EMAIL` can be changed to `noreply@raulmermans.com` after domain verification
- All variables are case-sensitive

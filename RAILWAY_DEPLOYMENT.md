# Railway Deployment Guide

## Quick Deploy

Railway automatically deploys when you push to your connected Git repository.

### Option 1: Git Push (Recommended)
```bash
git add .
git commit -m "Remove visuals landing, fix deployment errors"
git push
```

Railway will automatically:
1. Detect the push
2. Run `npm install`
3. Run `npm run build`
4. Deploy if build succeeds

### Option 2: Railway CLI
```bash
# Install Railway CLI (if not installed)
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Deploy
railway up
```

## Build Configuration

Railway uses these settings automatically:
- **Build Command**: `npm run build` (auto-detected)
- **Start Command**: `npm start` (auto-detected)
- **Node Version**: >=18.0.0 (from package.json engines)

## Environment Variables

Make sure these are set in Railway dashboard:
- `NEXT_PUBLIC_SITE_URL` - Your production URL
- Any other environment variables your app needs

## Verify Deployment

After deployment:
1. Check Railway dashboard for build logs
2. Visit your Railway URL
3. Test all pages:
   - `/` (Homepage)
   - `/about`
   - `/case-studies`
   - `/photography`
   - `/privacy`
   - `/terms`

## Troubleshooting

### Build Fails
- Check Railway build logs
- Verify all dependencies are in `package.json`
- Ensure TypeScript compiles: `npm run type-check`

### Deployment Errors
- Check environment variables
- Verify Node.js version (>=18.0.0)
- Check Railway service logs

## Current Status

✅ Visuals landing page removed
✅ All TypeScript errors fixed
✅ Build should succeed
✅ Ready for deployment


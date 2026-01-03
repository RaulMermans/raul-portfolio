# 🚨 DEPLOYMENT DEBUG GUIDE

## Why Changes Aren't Appearing

### Common Causes:
1. **Browser Cache** - Your browser is showing old cached files
2. **Railway Not Deploying** - Changes not pushed or Railway not building
3. **Static Generation** - Next.js cached static pages
4. **CDN Cache** - Railway's CDN serving old files
5. **Build Cache** - `.next` folder has stale build

---

## 🔍 STEP 1: Verify Changes Are Committed

```bash
# Check if you have uncommitted changes
git status

# Check recent commits
git log --oneline -5

# If changes exist, commit them
git add -A
git commit -m "Force deployment test"
git push
```

---

## 🔍 STEP 2: Force Railway to Rebuild

### Option A: Force New Deployment
1. Go to Railway dashboard
2. Click on your service
3. Click "Deploy" → "Deploy Latest Commit"
4. Watch the build logs

### Option B: Add a Version Bumper
We'll add a timestamp to force rebuilds:

```bash
# This will be added to package.json
echo "BUILD_TIMESTAMP=$(date +%s)" >> .env.local
```

---

## 🔍 STEP 3: Clear All Caches

### Browser Cache (CRITICAL)
1. **Hard Refresh:**
   - Chrome/Edge: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
   - Firefox: `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
   - Safari: `Cmd+Option+R`

2. **Clear Cache Completely:**
   - Open DevTools (F12)
   - Right-click refresh button → "Empty Cache and Hard Reload"

3. **Incognito/Private Mode:**
   - Test in incognito to bypass cache

### Railway Build Cache
```bash
# Add to railway.json build command
rm -rf .next node_modules/.cache
```

---

## 🔍 STEP 4: Add Visible Test Change

Let's add a VERY OBVIOUS change to verify deployment:

1. Add a bright red banner to homepage
2. Add console.log with timestamp
3. Add visible text that says "DEPLOYMENT TEST [TIMESTAMP]"

---

## 🔍 STEP 5: Check Railway Logs

1. Go to Railway dashboard
2. Click on your service
3. Go to "Deployments" tab
4. Click on latest deployment
5. Check:
   - Build status (should be "Success")
   - Build logs (look for errors)
   - Deploy logs (should show "npm start")

---

## 🔍 STEP 6: Verify Environment Variables

Railway might not have the right env vars:

1. Railway Dashboard → Your Service → Variables
2. Check these exist:
   - `NEXT_PUBLIC_SITE_URL`
   - `RESEND_API_KEY` (if using contact form)
   - `CONTACT_EMAIL`
   - `FROM_EMAIL`

---

## 🔍 STEP 7: Test Locally First

```bash
# Build locally to verify changes work
npm run build
npm start

# Visit http://localhost:3000
# Do you see your changes?
```

If YES locally but NO on Railway → Deployment issue
If NO locally → Code issue

---

## 🎯 QUICK FIX: Add Deployment Test Banner

We'll add a visible banner that shows:
- Current build timestamp
- Git commit hash
- "DEPLOYED" status

This will make it OBVIOUS if deployment worked.

---

## 📋 CHECKLIST

- [ ] Changes committed to git?
- [ ] Changes pushed to GitHub?
- [ ] Railway shows new deployment?
- [ ] Railway build succeeded?
- [ ] Browser cache cleared?
- [ ] Tested in incognito?
- [ ] Local build works?
- [ ] Environment variables set?

---

## 🚀 IMMEDIATE ACTION PLAN

1. **Add visible test change** (bright banner)
2. **Commit and push**
3. **Force Railway deployment**
4. **Clear browser cache**
5. **Test in incognito**
6. **Check Railway logs**

Let's do this step by step!


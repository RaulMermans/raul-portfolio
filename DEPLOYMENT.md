# Deployment Guide

This guide covers how to deploy your portfolio website to various hosting platforms.

## Prerequisites

- Node.js 18+ installed
- Git repository set up
- Environment variables configured (if needed)

## Vercel (Recommended for Next.js)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via CLI**:
   ```bash
   vercel
   ```

3. **Deploy via Dashboard**:
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel will auto-detect Next.js and configure everything

4. **Environment Variables**:
   - Add your environment variables in the Vercel dashboard
   - Go to Project Settings → Environment Variables

## Netlify

1. **Install Netlify CLI** (optional):
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy via CLI**:
   ```bash
   netlify deploy --prod
   ```

3. **Deploy via Dashboard**:
   - Push your code to GitHub
   - Go to [netlify.com](https://netlify.com)
   - Import your repository
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Install Netlify Next.js Plugin**:
   The `netlify.toml` file is already configured with the Next.js plugin.

## AWS Amplify

1. Push your code to GitHub
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
3. Connect your repository
4. Build settings (auto-detected):
   - Build command: `npm run build`
   - Output directory: `.next`

## Cloudflare Pages

1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect your repository
4. Build settings:
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`

## Custom Server Deployment

If you need to deploy to a custom server:

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

3. **Use a process manager** (PM2 recommended):
   ```bash
   npm install -g pm2
   pm2 start npm --name "portfolio" -- start
   pm2 save
   pm2 startup
   ```

## Environment Variables

Make sure to set all required environment variables in your hosting platform:

- Copy `.env.example` to `.env.local` for local development
- Add the same variables in your hosting platform's dashboard

## Custom Domain

1. **Vercel**: Go to Project Settings → Domains
2. **Netlify**: Go to Domain Settings → Add custom domain
3. **AWS Amplify**: Go to App Settings → Domain Management

## SSL/HTTPS

Most modern hosting platforms provide free SSL certificates automatically:
- Vercel: Automatic
- Netlify: Automatic
- AWS Amplify: Automatic
- Cloudflare Pages: Automatic

## Performance Optimization

- Images: Use Next.js Image component for optimized images
- Fonts: Use next/font for optimized font loading
- Static Assets: Place in `/public` directory
- API Routes: Optimize database queries and use caching when possible

## Monitoring

Consider adding:
- Analytics (Google Analytics, Plausible, etc.)
- Error tracking (Sentry, LogRocket, etc.)
- Performance monitoring (Vercel Analytics, etc.)


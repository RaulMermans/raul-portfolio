# Setup Guide

Follow these steps to get your portfolio website up and running locally.

## Initial Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your actual values (if needed).

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure Overview

```
raul-portfolio/
├── app/                    # Next.js App Router (main application)
│   ├── api/               # Backend API routes
│   │   ├── contact/       # Contact form endpoint
│   │   ├── health/        # Health check endpoint
│   │   └── projects/      # Projects API endpoint
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # SEO sitemap
├── components/            # Reusable React components
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Footer component
├── lib/                   # Utility functions
│   └── utils.ts           # Helper functions
├── public/                # Static assets (images, fonts, etc.)
├── styles/                # Global styles
│   └── globals.css        # Global CSS with Tailwind
├── types/                 # TypeScript type definitions
│   └── index.ts           # Shared types
├── middleware.ts          # Next.js middleware
└── Configuration files    # Various config files
```

## Next Steps

1. **Customize Your Content**:
   - Update `app/page.tsx` with your introduction
   - Modify `app/layout.tsx` with your metadata
   - Add your projects to the projects API or create a data source

2. **Add Your Assets**:
   - Place images in `/public` directory
   - Update favicon and other static assets

3. **Configure Styling**:
   - Customize `tailwind.config.js` with your color scheme
   - Update `styles/globals.css` for global styles

4. **Set Up Contact Form**:
   - Implement email sending in `app/api/contact/route.ts`
   - Consider using services like Resend, SendGrid, or Nodemailer

5. **Add More Pages**:
   - Create `app/about/page.tsx` for About page
   - Create `app/projects/page.tsx` for Projects page
   - Create `app/contact/page.tsx` for Contact page

6. **Deploy**:
   - See `DEPLOYMENT.md` for deployment instructions
   - Push to GitHub and deploy to Vercel/Netlify

## Development Tips

- Use `npm run lint` to check for code issues
- Use `npm run type-check` to verify TypeScript types
- Hot reload is enabled in development mode
- Check browser console for any errors

## Troubleshooting

**Port 3000 already in use?**
```bash
# Kill the process or use a different port
PORT=3001 npm run dev
```

**TypeScript errors?**
- Make sure all dependencies are installed: `npm install`
- Check that Node.js version is 18+: `node --version`

**Build errors?**
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`


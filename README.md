# Raúl Mermans Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, and optimized for performance.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
raul-portfolio/
├── app/                    # Next.js App Router (pages & API routes)
│   ├── about/             # About page
│   ├── case-studies/      # Case studies pages
│   ├── photography/       # Photography gallery
│   ├── visuals/           # Visuals gallery
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities & bots
├── public/                # Static assets
│   └── images/           # Image assets
│       ├── case-studies/ # Case study images
│       ├── photography/  # Photography images
│       └── visuals/      # Visuals images
├── styles/                # Global CSS
└── types/                 # TypeScript definitions
```

## 🖼️ Adding Images

### Case Studies
Upload images to: `public/images/case-studies/{case-study-name}/`
- See README.md in each case study folder for exact filenames

### Photography
Upload images to: `public/images/photography/{category}/`
- Categories: `architecture/`, `landscape/`, `street/`

### Visuals
Upload images to: `public/images/visuals/{category}/`
- Categories: `ai-art/`, `album-covers/`, `client-work/`, `experiments/`

## 🔧 Configuration

### Environment Variables
Copy `.env.example` to `.env.local` and fill in:
- `NEXT_PUBLIC_SITE_URL` - Your site URL
- `RESEND_API_KEY` - For contact form (optional)
- `CONTACT_EMAIL` - Contact form recipient
- `FROM_EMAIL` - Sender email

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Railway deployment instructions.

## 📚 Documentation

See [docs/README.md](./docs/README.md) for detailed documentation.

## 📝 Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules + Global CSS
- **Deployment:** Railway
- **Email:** Resend (contact form)

## 📄 License

MIT

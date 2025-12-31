# Project Structure

This document explains the organization of the portfolio website repository.

## 📁 Root Directory

### Configuration Files
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `.eslintrc.json` - ESLint rules
- `.prettierrc` - Code formatting rules
- `.gitignore` - Git ignore rules
- `.nvmrc` - Node.js version
- `netlify.toml` - Netlify deployment config

### Documentation
- `README.md` - Main project readme
- `TODO.md` - Task list and remaining work
- `LICENSE` - MIT License
- `PROJECT_STRUCTURE.md` - This file

### Source Code
- `app/` - Next.js App Router (pages and API routes)
- `components/` - React components
- `lib/` - Utility functions
- `styles/` - Global CSS styles
- `types/` - TypeScript type definitions
- `public/` - Static assets (images, fonts, etc.)
- `middleware.ts` - Next.js middleware

---

## 📂 Detailed Structure

### `/app/`
Next.js App Router structure:
```
app/
├── api/              # Backend API routes
│   ├── contact/     # Contact form endpoint
│   ├── health/      # Health check endpoint
│   └── projects/    # Projects API endpoint
├── projects/        # Project detail pages
│   └── photography/ # Photography gallery page
├── layout.tsx       # Root layout
├── page.tsx         # Home page
├── robots.ts        # SEO robots.txt
└── sitemap.ts       # SEO sitemap
```

### `/components/`
Reusable React components:
```
components/
├── Header.tsx       # Navigation header
├── Footer.tsx       # Footer section
├── Hero.tsx         # Hero section
├── SectionCards.tsx # Section cards showcase
├── About.tsx        # About section
├── Services.tsx     # Services section
├── Contact.tsx      # Contact section
├── BackToTop.tsx    # Back to top button
├── Reveal.tsx       # Scroll reveal animation
├── PageTransition.tsx # Page transition wrapper
├── ErrorBoundary.tsx  # Error boundary component
└── StructuredData.tsx # JSON-LD structured data
```

### `/lib/`
Utility functions:
```
lib/
└── utils.ts         # Helper functions (cn, formatDate, etc.)
```

### `/styles/`
Global styles:
```
styles/
└── globals.css      # Global CSS with Tailwind
```

### `/types/`
TypeScript definitions:
```
types/
└── index.ts         # Shared type definitions
```

### `/public/`
Static assets:
```
public/
└── images/          # Image assets
    ├── projects/    # Project images
    ├── about/       # About section images
    └── services/    # Service images
```

### `/docs/`
Documentation and references:
```
docs/
├── reference/       # Design mockups (HTML)
└── guides/         # Setup and deployment guides
```

---

## 🎯 What Goes Where?

### Adding New Pages
→ Create in `/app/` (e.g., `/app/about/page.tsx`)

### Adding New Components
→ Create in `/components/` (e.g., `/components/NewComponent.tsx`)

### Adding Images
→ Place in `/public/images/` (e.g., `/public/images/projects/photo.webp`)

### Adding Utilities
→ Add to `/lib/utils.ts` or create new file in `/lib/`

### Adding Types
→ Add to `/types/index.ts` or create new file in `/types/`

### Adding Styles
→ Add to `/styles/globals.css` or use Tailwind classes

### Adding API Routes
→ Create in `/app/api/` (e.g., `/app/api/new-endpoint/route.ts`)

---

## 📝 File Naming Conventions

- **Components**: PascalCase (e.g., `Header.tsx`)
- **Pages**: lowercase (e.g., `page.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Types**: camelCase (e.g., `index.ts`)
- **Images**: kebab-case (e.g., `project-1.webp`)

---

## 🚫 What NOT to Include

- `node_modules/` - Dependencies (gitignored)
- `.next/` - Build output (gitignored)
- `.env.local` - Environment variables (gitignored)
- Temporary files
- Build artifacts

---

## 🔄 Keeping It Clean

1. **Remove unused files** - Delete files that are no longer needed
2. **Organize by feature** - Group related files together
3. **Use consistent naming** - Follow the conventions above
4. **Document structure** - Update this file when structure changes
5. **Keep root clean** - Only essential config files in root


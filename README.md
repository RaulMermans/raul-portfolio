# Raul Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🚀 Next.js 14 with App Router
- 💻 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- ⚡ Optimized for performance
- 🔒 SEO-friendly

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+

### Installation

1. Clone the repository
```bash
git clone https://github.com/raulmermans/raul-portfolio.git
cd raul-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Copy environment variables
```bash
cp .env.example .env.local
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
raul-portfolio/
├── app/                    # Next.js App Router (pages & API routes)
├── components/            # React components
├── lib/                   # Utility functions
├── public/                # Static assets (images, fonts)
├── styles/                # Global CSS styles
├── types/                 # TypeScript type definitions
├── docs/                  # Documentation & references
│   ├── reference/         # HTML mockups
│   └── guides/           # Setup & deployment guides
└── [config files]         # Configuration files
```

📖 **See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed structure**

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Deployment

This project can be deployed on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Cloudflare Pages**
- Any Node.js hosting service

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build settings

## License

MIT

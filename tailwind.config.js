/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0EB',
        'cream-warm': '#EDE6DD',
        'cream-dark': '#DDD5C8',
        ink: '#1A1714',
        'ink-soft': '#3A3530',
        'ink-muted': '#6B635A',
        'ink-faint': '#8A827A',
        accent: '#C41E3A',
        'gradient-warm': '#FFAA88',
        'gradient-rose': '#FFB5A0',
        'gradient-soft': '#E8D0C8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      spacing: {
        'touch-min': '44px',
      },
    },
  },
  plugins: [],
}


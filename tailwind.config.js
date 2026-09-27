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
        cream: 'var(--cream)',
        'cream-warm': 'var(--cream-warm)',
        'cream-dark': 'var(--cream-dark)',
        ink: 'var(--ink)',
        'ink-soft': 'var(--ink-soft)',
        'ink-muted': 'var(--ink-muted)',
        'ink-faint': 'var(--ink-faint)',
        accent: 'var(--accent)',
        'gradient-warm': 'var(--warm)',
        'gradient-rose': 'var(--rose)',
        'gradient-soft': 'var(--gradient-soft)',
      },
      fontFamily: {
        display: ['var(--font-heading)'],
        body: ['var(--font-ui)'],
        mono: ['var(--font-code)'],
        prose: ['var(--font-prose)'],
      },
      spacing: {
        'touch-min': '44px',
      },
    },
  },
  plugins: [],
}

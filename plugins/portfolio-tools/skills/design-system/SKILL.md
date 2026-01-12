# Design System Skill

## Metadata
```yaml
name: design-system
version: 1.0.0
type: skill
trigger: automatic
priority: standard
```

## Description
Automatically maintains consistent design language across the portfolio. Activates when writing or modifying UI components, CSS, or styling code to ensure adherence to the established design system.

## Auto-Trigger Conditions

This skill activates when:
- Creating new React components
- Writing CSS/SCSS/CSS Modules
- Modifying existing UI code
- Adding new pages or layouts
- Working with Tailwind classes (if used)

## Portfolio Design System

### Color Palette

#### Primary Colors
```css
:root {
  /* Brand Colors */
  --color-primary: #2563eb;        /* Blue - main actions */
  --color-primary-dark: #1d4ed8;   /* Blue - hover states */
  --color-primary-light: #3b82f6;  /* Blue - highlights */

  /* Neutral Colors */
  --color-background: #ffffff;      /* Main background */
  --color-background-alt: #f8fafc;  /* Secondary background */
  --color-surface: #ffffff;         /* Card/component surfaces */

  /* Text Colors */
  --color-text-primary: #0f172a;    /* Main text */
  --color-text-secondary: #475569;  /* Secondary text */
  --color-text-muted: #94a3b8;      /* Muted/placeholder text */

  /* Accent Colors */
  --color-accent: #8b5cf6;          /* Purple - accents */
  --color-success: #22c55e;         /* Green - success states */
  --color-warning: #f59e0b;         /* Amber - warnings */
  --color-error: #ef4444;           /* Red - errors */

  /* Border Colors */
  --color-border: #e2e8f0;          /* Default borders */
  --color-border-hover: #cbd5e1;    /* Hover borders */
}

/* Dark Mode */
[data-theme="dark"] {
  --color-background: #0f172a;
  --color-background-alt: #1e293b;
  --color-surface: #1e293b;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-border: #334155;
  --color-border-hover: #475569;
}
```

### Typography

```css
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}

/* Typography Scale */
h1 { font-size: var(--text-4xl); font-weight: var(--font-bold); }
h2 { font-size: var(--text-3xl); font-weight: var(--font-semibold); }
h3 { font-size: var(--text-2xl); font-weight: var(--font-semibold); }
h4 { font-size: var(--text-xl); font-weight: var(--font-medium); }
p  { font-size: var(--text-base); line-height: var(--leading-relaxed); }
```

### Spacing System

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

### Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;    /* 4px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-full: 9999px;   /* Pill shape */
}
```

### Shadows

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
```

### Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Component Patterns

#### Buttons
```css
.button {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  transition: all 150ms ease;
}

.button-primary {
  background: var(--color-primary);
  color: white;
}

.button-primary:hover {
  background: var(--color-primary-dark);
}
```

#### Cards
```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
}
```

#### Form Inputs
```css
.input {
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
}

.input:focus {
  border-color: var(--color-primary);
  outline: 2px solid var(--color-primary-light);
  outline-offset: 2px;
}
```

## Enforcement Rules

When writing UI code, always:

1. **Use CSS Variables** - Never hardcode colors or spacing
2. **Follow Spacing Scale** - Use defined spacing values
3. **Maintain Typography Hierarchy** - Use proper heading levels
4. **Ensure Accessibility** - Min 4.5:1 contrast ratio
5. **Mobile First** - Start with mobile, enhance for larger
6. **Consistent Borders** - Use defined radius values
7. **Proper Shadows** - Use elevation system

## Correction Examples

```css
/* ❌ Wrong - Hardcoded values */
.component {
  color: #333333;
  padding: 15px;
  border-radius: 5px;
}

/* ✅ Correct - Using design system */
.component {
  color: var(--color-text-primary);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}
```

## Integration Notes

- Automatically applied when creating/editing components
- Works with CSS Modules pattern
- Complements security-auditor skill
- References `app/globals.css` for current values

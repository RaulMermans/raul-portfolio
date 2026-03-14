---
name: accessibility-enforcer
description: Guide for ensuring accessibility in the portfolio. This skill should be used when creating interactive components, handling focus management, implementing ARIA attributes, or ensuring WCAG compliance. Covers keyboard navigation, screen reader support, color contrast, and focus management.
---

# Accessibility Enforcer

This skill provides guidance for ensuring the portfolio is accessible to all users.

## WCAG Compliance Targets

Target: **WCAG 2.1 Level AA**

### Key Requirements

- Color contrast ratio: 4.5:1 (normal text), 3:1 (large text)
- All functionality keyboard accessible
- Focus visible on all interactive elements
- Alternative text for all images
- Form inputs have labels
- No content flashes more than 3 times per second

## Skip Links

Every page must have a skip link:

```tsx
// First element inside <body>
<a href="#main-content" className="skip-link">
  Skip to main content
</a>

// Main content target
<main id="main-content">
  {/* Page content */}
</main>
```

```css
.skip-link {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.skip-link:focus {
  position: fixed;
  top: 0;
  left: 0;
  width: auto;
  height: auto;
  padding: var(--space-4);
  background: var(--color-background);
  color: var(--color-text-primary);
  z-index: 9999;
  outline: 2px solid var(--color-primary);
}
```

## Semantic HTML

### Use Correct Elements

```html
<!-- Navigation -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<!-- Main content -->
<main id="main-content">
  <article>
    <header>
      <h1>Article Title</h1>
    </header>
    <section>
      <h2>Section Title</h2>
      <p>Content...</p>
    </section>
  </article>
</main>

<!-- Footer -->
<footer>
  <nav aria-label="Footer navigation">
    <!-- Links -->
  </nav>
</footer>
```

### Heading Hierarchy

```html
<!-- Correct -->
<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>
  <h2>Another Section</h2>

<!-- Wrong - skipped levels -->
<h1>Page Title</h1>
  <h4>Section</h4>  <!-- Skipped h2, h3 -->
```

## ARIA Attributes

### When to Use ARIA

1. When HTML semantics are insufficient
2. For dynamic content updates
3. For complex widgets (modals, tabs)

### Common ARIA Attributes

```tsx
// Labeling
aria-label="Close menu"           // Accessible name
aria-labelledby="section-title"   // Reference another element
aria-describedby="help-text"      // Additional description

// State
aria-expanded="true"              // Expandable element state
aria-hidden="true"                // Hide from screen readers
aria-pressed="true"               // Toggle button state
aria-selected="true"              // Selection state
aria-disabled="true"              // Disabled state

// Live regions
aria-live="polite"                // Announce when convenient
aria-live="assertive"             // Announce immediately
aria-atomic="true"                // Announce entire region

// Relationships
aria-controls="menu-panel"        // What this controls
aria-owns="submenu"               // Parent-child relationship
```

### ARIA Landmarks

```html
<header role="banner">           <!-- Site header -->
<nav role="navigation">          <!-- Navigation -->
<main role="main">               <!-- Main content -->
<aside role="complementary">     <!-- Sidebar -->
<footer role="contentinfo">      <!-- Site footer -->
<form role="search">             <!-- Search form -->
```

## Keyboard Navigation

### Focusable Elements

Native focusable elements:
- `<a href="...">`
- `<button>`
- `<input>`, `<textarea>`, `<select>`
- `[tabindex="0"]`

### Tab Order

```tsx
// Natural tab order (preferred)
<button>First</button>
<button>Second</button>
<button>Third</button>

// Custom tab order (use sparingly)
<button tabIndex={2}>Second</button>
<button tabIndex={1}>First</button>
<button tabIndex={3}>Third</button>

// Remove from tab order
<div tabIndex={-1}>Programmatically focusable only</div>
```

### Keyboard Handlers

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
    case ' ': // Space
      e.preventDefault()
      handleActivate()
      break
    case 'Escape':
      handleClose()
      break
    case 'ArrowDown':
      e.preventDefault()
      focusNextItem()
      break
    case 'ArrowUp':
      e.preventDefault()
      focusPreviousItem()
      break
  }
}

<div
  role="button"
  tabIndex={0}
  onClick={handleActivate}
  onKeyDown={handleKeyDown}
>
  Custom Button
</div>
```

## Focus Management

### Focus Trap (Modals)

```tsx
import { trapFocus } from '@/lib/accessibility'

useEffect(() => {
  if (!isOpen || !modalRef.current) return
  
  const cleanup = trapFocus(modalRef.current)
  
  return cleanup
}, [isOpen])
```

### Focus on Route Change

```tsx
useEffect(() => {
  // Focus main content on page load
  const main = document.getElementById('main-content')
  main?.focus()
}, [])
```

### Return Focus After Modal

```tsx
const [previousFocus, setPreviousFocus] = useState<HTMLElement | null>(null)

const openModal = () => {
  setPreviousFocus(document.activeElement as HTMLElement)
  setIsOpen(true)
}

const closeModal = () => {
  setIsOpen(false)
  previousFocus?.focus()
}
```

### Visible Focus Styles

```css
/* Don't remove outlines - make them visible */
:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Only hide for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

## Color Contrast

### Minimum Ratios

| Text Size | Ratio Required |
|-----------|----------------|
| Normal text (< 18px) | 4.5:1 |
| Large text (≥ 18px bold or ≥ 24px) | 3:1 |
| UI components | 3:1 |

### Design System Colors

Use the design system colors which meet contrast requirements:

```css
/* Text on light background */
color: var(--color-text-primary);     /* #0f172a - passes */
color: var(--color-text-secondary);   /* #475569 - passes */

/* Text on dark background */
color: var(--color-text-primary);     /* #f1f5f9 in dark mode */
```

### Testing Contrast

- Chrome DevTools: Inspect element > Contrast ratio
- WebAIM Contrast Checker: webaim.org/resources/contrastchecker
- Lighthouse accessibility audit

## Images

### Alt Text

```tsx
// Informative image
<Image
  src="/images/profile.webp"
  alt="Raúl Mermans working at his desk with a large monitor"
/>

// Decorative image (hide from screen readers)
<Image
  src="/images/pattern.webp"
  alt=""
  aria-hidden="true"
/>

// Complex image with long description
<figure>
  <Image
    src="/images/diagram.webp"
    alt="System architecture diagram"
    aria-describedby="diagram-desc"
  />
  <figcaption id="diagram-desc">
    Detailed description of the diagram...
  </figcaption>
</figure>
```

### Background Images

```tsx
// Decorative backgrounds
<div 
  className="hero-background" 
  aria-hidden="true"
  role="presentation"
/>
```

## Forms

### Labels

```tsx
// Explicit label (preferred)
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />

// Implicit label
<label>
  Email Address
  <input type="email" />
</label>

// Hidden label (with visible placeholder)
<label htmlFor="search" className="sr-only">Search</label>
<input id="search" type="search" placeholder="Search..." />
```

### Error Messages

```tsx
<div className="form-field">
  <label htmlFor="email">Email</label>
  <input
    id="email"
    type="email"
    aria-invalid={hasError}
    aria-describedby={hasError ? 'email-error' : undefined}
  />
  {hasError && (
    <span id="email-error" role="alert" className="error">
      Please enter a valid email address
    </span>
  )}
</div>
```

### Required Fields

```tsx
<label htmlFor="name">
  Name
  <span aria-hidden="true" className="required">*</span>
</label>
<input
  id="name"
  required
  aria-required="true"
/>
```

## Screen Reader Utilities

### Visually Hidden Text

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

```tsx
// Use for screen reader only content
<button>
  <span aria-hidden="true">×</span>
  <span className="sr-only">Close menu</span>
</button>
```

### Live Announcements

```tsx
import { announceToScreenReader } from '@/lib/accessibility'

// Announce form submission
const handleSubmit = async () => {
  await submitForm()
  announceToScreenReader('Form submitted successfully')
}

// Announce loading
announceToScreenReader('Loading content, please wait', 'polite')

// Urgent announcement
announceToScreenReader('Error: Please check your input', 'assertive')
```

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
import { prefersReducedMotion } from '@/lib/accessibility'

useEffect(() => {
  if (prefersReducedMotion()) {
    // Skip animations
    return
  }
  
  // Set up animations
}, [])
```

## Interactive Components

### Buttons vs Links

```tsx
// Button - performs action
<button onClick={handleSave}>Save</button>

// Link - navigates to URL
<Link href="/about">About</Link>

// Button styled as link
<button className="link-style" onClick={handleAction}>
  Action
</button>

// WRONG - don't use div/span for clickables
<div onClick={handleClick}>Click me</div> // ❌
```

### Toggle Buttons

```tsx
<button
  aria-pressed={isActive}
  onClick={() => setIsActive(!isActive)}
>
  {isActive ? 'Active' : 'Inactive'}
</button>
```

### Expandable Sections

```tsx
<button
  aria-expanded={isOpen}
  aria-controls="panel-content"
  onClick={() => setIsOpen(!isOpen)}
>
  Section Title
</button>
<div
  id="panel-content"
  hidden={!isOpen}
>
  Section content...
</div>
```

## Accessibility Checklist

### Perceivable
- [ ] Images have alt text
- [ ] Color contrast meets 4.5:1 / 3:1
- [ ] No color-only information
- [ ] Captions/transcripts for media

### Operable
- [ ] All functionality keyboard accessible
- [ ] Focus visible on all elements
- [ ] Skip link present
- [ ] No keyboard traps
- [ ] Enough time to read/interact

### Understandable
- [ ] Page language declared (`<html lang="en">`)
- [ ] Consistent navigation
- [ ] Clear error messages
- [ ] Labels on form inputs

### Robust
- [ ] Valid HTML
- [ ] ARIA used correctly
- [ ] Works with screen readers
- [ ] Works at 200% zoom

## Testing Tools

- **Screen readers**: VoiceOver (Mac), NVDA (Windows)
- **Chrome DevTools**: Accessibility inspector
- **Lighthouse**: Accessibility audit
- **axe DevTools**: Browser extension
- **WAVE**: webaccessibility.com

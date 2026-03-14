---
name: frontend-developer
description: Comprehensive frontend development guide for the portfolio. This skill should be used when creating or modifying React components, writing CSS/styles, handling forms, managing state, or implementing interactive UI features. Covers React patterns, CSS architecture, and interactive UI best practices specific to this Next.js portfolio project.
---

# Frontend Developer

This skill provides guidance for all frontend development in the portfolio, covering React patterns, CSS architecture, and interactive UI implementation.

## React Patterns

### Component Structure

All components follow this structure:

```tsx
'use client' // Only if needed (hooks, events, browser APIs)

import { useState, useEffect, useRef } from 'react'
import { CONSTANT } from '@/lib/constants'

interface ComponentNameProps {
  title: string
  onClick?: () => void
  children?: React.ReactNode
}

export default function ComponentName({ title, onClick, children }: ComponentNameProps) {
  const ref = useRef<HTMLElement>(null)
  
  return (
    <section ref={ref} className="component-name">
      {children}
    </section>
  )
}
```

### When to Use 'use client'

Add the `'use client'` directive only when the component needs:
- React hooks (useState, useEffect, useRef, etc.)
- Event handlers (onClick, onChange, onSubmit)
- Browser APIs (window, document, localStorage)
- Third-party client libraries

Server Components (no directive) are preferred for:
- Static content display
- Data fetching
- Layout wrappers
- Metadata generation

### State Management Patterns

**Local State (useState)**
```tsx
// Simple value state
const [isOpen, setIsOpen] = useState(false)

// Object state with proper typing
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: '',
})

// Update object state immutably
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target
  setFormData(prev => ({ ...prev, [name]: value }))
}
```

**Status State Pattern**
```tsx
// Use union types for status
const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

// Conditional rendering based on status
{status === 'loading' && <Spinner />}
{status === 'error' && <ErrorMessage />}
{status === 'success' && <SuccessMessage />}
```

### Effect Patterns

**Basic Effect with Cleanup**
```tsx
useEffect(() => {
  const handler = (e: Event) => { /* handle */ }
  
  window.addEventListener('resize', handler, { passive: true })
  
  return () => {
    window.removeEventListener('resize', handler)
  }
}, []) // Empty deps = mount/unmount only
```

**Effect with Dependencies**
```tsx
useEffect(() => {
  if (!elementRef.current) return
  
  // Effect logic here
  
}, [dependency1, dependency2]) // Re-run when deps change
```

**Debounced Effect**
```tsx
useEffect(() => {
  let timeoutId: NodeJS.Timeout
  
  const handleResize = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      // Debounced logic
    }, 150)
  }
  
  window.addEventListener('resize', handleResize, { passive: true })
  
  return () => {
    window.removeEventListener('resize', handleResize)
    clearTimeout(timeoutId)
  }
}, [])
```

### Ref Patterns

**DOM Element Refs**
```tsx
const sectionRef = useRef<HTMLElement>(null)
const inputRef = useRef<HTMLInputElement>(null)
const buttonRef = useRef<HTMLButtonElement>(null)

// Access in effects
useEffect(() => {
  if (!sectionRef.current) return
  const rect = sectionRef.current.getBoundingClientRect()
}, [])
```

**Mutable Value Refs (no re-render)**
```tsx
const rafId = useRef<number | null>(null)
const cachedRect = useRef<DOMRect | null>(null)

// Use for values that change but shouldn't trigger re-render
rafId.current = requestAnimationFrame(() => { /* ... */ })
```

### Custom Hooks

The project provides these custom hooks in `hooks/`:

**useResponsive**
```tsx
import { useResponsive } from '@/hooks'

function Component() {
  const { isMobile, isTablet, isDesktop, width, breakpoint } = useResponsive()
  
  return (
    <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
      {isDesktop && <DesktopOnlyFeature />}
    </div>
  )
}
```

**useErrorHandler**
```tsx
import { useErrorHandler } from '@/hooks'

function Component() {
  const { error, handleError, clearError } = useErrorHandler()
  
  const doSomething = async () => {
    try {
      await riskyOperation()
    } catch (e) {
      handleError(e)
    }
  }
}
```

**useSafeAsync**
```tsx
import { useSafeAsync } from '@/hooks'

function Component() {
  const { execute, status, value, error } = useSafeAsync()
  
  const fetchData = () => {
    execute(async () => {
      const res = await fetch('/api/data')
      return res.json()
    })
  }
}
```

## CSS Architecture

### Decision Tree

```
Need styling?
│
├── Single utility (margin, padding, display)?
│   └── Use Tailwind: className="mt-4 flex"
│
├── Component-specific styles?
│   └── Custom CSS with BEM in globals.css
│
├── Repeated pattern across components?
│   └── Create utility class in globals.css
│
└── Design token (color, spacing, radius)?
    └── Use CSS variable from design-system
```

### BEM Naming Convention

```css
/* Block */
.contact-form { }

/* Element (part of block) */
.contact-form__field { }
.contact-form__label { }
.contact-form__input { }
.contact-form__submit { }

/* Modifier (variation) */
.contact-form__field--half { }
.contact-form__input--error { }
.contact-form__submit--loading { }
```

### Using Design System Variables

Always use CSS variables from the design-system skill:

```css
/* Colors */
color: var(--color-text-primary);
background: var(--color-background);
border-color: var(--color-border);

/* Spacing */
padding: var(--space-4);
margin-bottom: var(--space-6);
gap: var(--space-2);

/* Typography */
font-size: var(--text-base);
font-weight: var(--font-medium);
line-height: var(--leading-normal);

/* Borders */
border-radius: var(--radius-lg);

/* Shadows */
box-shadow: var(--shadow-md);
```

### Responsive Breakpoints

Mobile-first approach with these breakpoints:

```css
/* Base styles (mobile) */
.component {
  padding: var(--space-4);
  flex-direction: column;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    padding: var(--space-6);
    flex-direction: row;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    padding: var(--space-8);
  }
}
```

### Layout Patterns

**Flexbox (1D layouts)**
```css
/* Row layout with gap */
.row {
  display: flex;
  gap: var(--space-4);
  align-items: center;
}

/* Column layout */
.column {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

/* Space between */
.spread {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

**Grid (2D layouts)**
```css
/* Equal columns */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

/* Responsive grid */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}
```

## Interactive UI

### Form Handling Pattern

```tsx
'use client'

import { useState, FormEvent } from 'react'

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setFormData({ name: '', email: '' }) // Reset form
      
      // Auto-reset success state
      setTimeout(() => setStatus('idle'), 5000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      
      {status === 'error' && (
        <div role="alert">{errorMessage}</div>
      )}
      
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Submit'}
      </button>
    </form>
  )
}
```

### Input States CSS

```css
.input {
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  transition: border-color 150ms ease, box-shadow 150ms ease;
}

/* Focus state */
.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Error state */
.input--error {
  border-color: var(--color-error);
}

.input--error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Disabled state */
.input:disabled {
  background: var(--color-background-alt);
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Button States

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  transition: all 150ms ease;
  cursor: pointer;
}

/* Hover */
.btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Active/pressed */
.btn:active:not(:disabled) {
  transform: translateY(0);
}

/* Disabled */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Loading state */
.btn--loading {
  pointer-events: none;
}
```

### Hover Effects

```css
/* Subtle lift */
.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* Color transition */
.link {
  color: var(--color-text-secondary);
  transition: color 150ms ease;
}

.link:hover {
  color: var(--color-primary);
}

/* Underline animation */
.link-underline {
  position: relative;
}

.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: width 200ms ease;
}

.link-underline:hover::after {
  width: 100%;
}
```

### Loading States

```tsx
// Button loading
<button disabled={isLoading}>
  {isLoading ? (
    <>
      <span className="spinner" aria-hidden="true" />
      Loading...
    </>
  ) : (
    'Submit'
  )}
</button>

// Skeleton loading
{isLoading ? (
  <div className="skeleton skeleton--text" />
) : (
  <p>{content}</p>
)}
```

```css
/* Spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Skeleton */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-background-alt) 25%,
    var(--color-border) 50%,
    var(--color-background-alt) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}

.skeleton--text {
  height: 1em;
  width: 100%;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## Event Listener Best Practices

Always use passive listeners for scroll/touch events:

```tsx
useEffect(() => {
  const handler = () => { /* ... */ }
  
  // Passive for performance
  window.addEventListener('scroll', handler, { passive: true })
  window.addEventListener('touchstart', handler, { passive: true })
  
  // Non-passive if you need preventDefault
  element.addEventListener('wheel', handler, { passive: false })
  
  return () => {
    window.removeEventListener('scroll', handler)
    window.removeEventListener('touchstart', handler)
    element.removeEventListener('wheel', handler)
  }
}, [])
```

## Performance Considerations

1. **Avoid inline function definitions in JSX** when possible
2. **Use useCallback** for functions passed as props to child components
3. **Use useMemo** for expensive calculations
4. **Debounce resize/scroll handlers** (150ms minimum)
5. **Use RAF for animations** instead of setInterval
6. **Prefer CSS transitions** over JS animations when possible

```tsx
// Memoize expensive computation
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name))
}, [items])

// Memoize callback
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])
```

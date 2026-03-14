---
name: component-scaffolder
description: Guide for scaffolding new components in the portfolio. This skill should be used when creating new React components to ensure consistent structure, naming conventions, and patterns. Provides templates for client/server components, TypeScript interfaces, and CSS structure.
---

# Component Scaffolder

This skill provides templates and guidelines for creating consistent components.

## Component Types

### Server Component (Default)

Use when the component:
- Displays static content
- Fetches data
- Has no interactivity

```tsx
// components/StaticSection.tsx
interface StaticSectionProps {
  title: string
  children: React.ReactNode
}

export default function StaticSection({ title, children }: StaticSectionProps) {
  return (
    <section className="static-section">
      <h2 className="static-section__title">{title}</h2>
      <div className="static-section__content">
        {children}
      </div>
    </section>
  )
}
```

### Client Component

Use when the component needs:
- React hooks (useState, useEffect, useRef)
- Event handlers (onClick, onChange)
- Browser APIs (window, document)

```tsx
// components/InteractiveCard.tsx
'use client'

import { useState, useRef, useEffect } from 'react'

interface InteractiveCardProps {
  title: string
  description: string
  onSelect?: (id: string) => void
}

export default function InteractiveCard({ 
  title, 
  description, 
  onSelect 
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`interactive-card ${isHovered ? 'interactive-card--hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(title)}
    >
      <h3 className="interactive-card__title">{title}</h3>
      <p className="interactive-card__description">{description}</p>
    </div>
  )
}
```

## File Naming

### Components

```
components/
├── Hero.tsx              # PascalCase
├── ContactForm.tsx       # PascalCase, compound words
├── case-studies/         # Lowercase folder for related components
│   ├── CaseStudyHero.tsx
│   ├── CaseStudyGallery.tsx
│   └── CaseStudySection.tsx
```

### Conventions

- Component files: `PascalCase.tsx`
- Utility files: `camelCase.ts`
- Folders: `kebab-case/` or `lowercase/`
- Test files: `ComponentName.test.tsx`

## TypeScript Interfaces

### Props Interface Pattern

```tsx
interface ComponentNameProps {
  // Required props
  title: string
  items: Item[]
  
  // Optional props
  subtitle?: string
  variant?: 'light' | 'dark'
  onAction?: () => void
  
  // Children
  children?: React.ReactNode
}
```

### Common Prop Types

```tsx
// String
title: string

// Number
count: number

// Boolean
isActive: boolean

// Union types
variant: 'primary' | 'secondary' | 'ghost'
size: 'sm' | 'md' | 'lg'

// Arrays
items: string[]
images: ImageData[]

// Objects
config: { label: string; value: string }

// Functions
onClick: () => void
onSelect: (id: string) => void
onChange: (value: string) => void

// React types
children: React.ReactNode
className?: string
style?: React.CSSProperties

// Refs
ref?: React.RefObject<HTMLDivElement>

// Event handlers
onMouseEnter?: React.MouseEventHandler<HTMLDivElement>
onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
```

### Export Types

Add shared types to `types/index.ts`:

```tsx
// types/index.ts
export interface CardData {
  id: string
  title: string
  image: string
  href: string
}

// Use in components
import type { CardData } from '@/types'
```

## BEM Naming Convention

### Structure

```
.block                    // Component root
.block__element          // Child element
.block--modifier         // Variant/state
.block__element--modifier // Element variant
```

### Example

```tsx
<article className="work-card">
  <div className="work-card__image-wrapper">
    <Image className="work-card__image" />
  </div>
  <div className="work-card__content">
    <h3 className="work-card__title">Title</h3>
    <p className="work-card__description">Description</p>
  </div>
  <a className="work-card__link work-card__link--primary">
    View Project
  </a>
</article>
```

### CSS

```css
.work-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border-radius: var(--radius-xl);
}

.work-card__image-wrapper {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.work-card__image {
  object-fit: cover;
}

.work-card__content {
  padding: var(--space-4);
}

.work-card__title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
}

.work-card__description {
  color: var(--color-text-secondary);
  margin-top: var(--space-2);
}

.work-card__link {
  margin-top: auto;
  padding: var(--space-4);
}

.work-card__link--primary {
  background: var(--color-primary);
  color: white;
}
```

## Common Patterns

### With Reveal Animation

```tsx
'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedSection({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reveals = section.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="animated-section">
      {children}
    </section>
  )
}
```

### With Responsive Behavior

```tsx
'use client'

import { useResponsive } from '@/hooks'

export default function ResponsiveComponent() {
  const { isMobile, isDesktop } = useResponsive()

  return (
    <div className="responsive-component">
      {isMobile && <MobileLayout />}
      {isDesktop && <DesktopLayout />}
    </div>
  )
}
```

### With Form State

```tsx
'use client'

import { useState, FormEvent } from 'react'

interface FormData {
  name: string
  email: string
}

export default function SimpleForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      await submitForm(formData)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="simple-form">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="simple-form__input"
      />
      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="simple-form__submit"
      >
        {status === 'loading' ? 'Sending...' : 'Submit'}
      </button>
    </form>
  )
}
```

### With External Data

```tsx
interface DataDisplayProps {
  endpoint: string
}

export default async function DataDisplay({ endpoint }: DataDisplayProps) {
  const data = await fetch(endpoint).then(r => r.json())

  return (
    <div className="data-display">
      {data.items.map((item: Item) => (
        <div key={item.id} className="data-display__item">
          {item.name}
        </div>
      ))}
    </div>
  )
}
```

## Component Checklist

When creating a new component:

### Structure
- [ ] File in correct location (`components/`)
- [ ] PascalCase filename
- [ ] `'use client'` only if needed
- [ ] Props interface defined
- [ ] Default export

### TypeScript
- [ ] All props typed
- [ ] No `any` types
- [ ] Optional props marked with `?`
- [ ] Event handlers properly typed

### CSS
- [ ] BEM naming convention
- [ ] Uses design system variables
- [ ] No hardcoded colors/spacing
- [ ] Responsive styles if needed

### Accessibility
- [ ] Semantic HTML elements
- [ ] ARIA labels where needed
- [ ] Keyboard accessible
- [ ] Focus states visible

### Performance
- [ ] Event listeners passive where possible
- [ ] Effects have proper cleanup
- [ ] Heavy components lazy loaded

## Quick Templates

### Minimal Server Component

```tsx
interface Props {
  title: string
}

export default function Component({ title }: Props) {
  return (
    <div className="component">
      <h2 className="component__title">{title}</h2>
    </div>
  )
}
```

### Minimal Client Component

```tsx
'use client'

import { useState } from 'react'

interface Props {
  initialValue: number
}

export default function Counter({ initialValue }: Props) {
  const [count, setCount] = useState(initialValue)

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  )
}
```

### With Ref

```tsx
'use client'

import { useRef, useEffect } from 'react'

export default function RefComponent() {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return
    // Use ref
  }, [])

  return <div ref={elementRef}>Content</div>
}
```

---
name: animation-system
description: Guide for implementing animations in the portfolio. This skill should be used when adding scroll reveal effects, hover animations, transitions, or interactive motion. Covers reveal animations, IntersectionObserver patterns, RAF throttling, magnetic effects, and reduced motion accessibility.
---

# Animation System

This skill provides guidance for implementing consistent, performant animations in the portfolio.

## Reveal Animations

### CSS Classes

The portfolio uses a reveal animation system with these classes:

```html
<!-- Basic reveal (fades up) -->
<div class="reveal">Content</div>

<!-- Delayed reveals (staggered effect) -->
<div class="reveal">First</div>
<div class="reveal reveal-delay-1">Second</div>
<div class="reveal reveal-delay-2">Third</div>
<div class="reveal reveal-delay-3">Fourth</div>
```

### CSS Implementation

```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Delay variants */
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }
```

### JavaScript Trigger

```tsx
useEffect(() => {
  const reveals = document.querySelectorAll('.reveal')
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully in view
    }
  )
  
  reveals.forEach((el) => observer.observe(el))
  
  return () => observer.disconnect()
}, [])
```

## IntersectionObserver Patterns

### Basic Setup

```tsx
useEffect(() => {
  const element = elementRef.current
  if (!element) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is visible
          handleVisible()
        } else {
          // Element is not visible
          handleHidden()
        }
      })
    },
    {
      threshold: 0.1, // 10% visible
      rootMargin: '0px', // No margin
    }
  )

  observer.observe(element)

  return () => observer.disconnect()
}, [])
```

### Threshold Options

```tsx
// Trigger when any part visible
threshold: 0

// Trigger when 10% visible (recommended for reveals)
threshold: 0.1

// Trigger when 50% visible
threshold: 0.5

// Trigger when fully visible
threshold: 1.0

// Multiple thresholds (for progress tracking)
threshold: [0, 0.25, 0.5, 0.75, 1.0]
```

### Root Margin

```tsx
// Trigger 50px before entering viewport
rootMargin: '50px 0px'

// Trigger 50px after entering viewport (delayed)
rootMargin: '0px 0px -50px 0px'

// Trigger 100px early at bottom
rootMargin: '0px 0px 100px 0px'
```

### One-Time Trigger

```tsx
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target) // Stop observing after trigger
      }
    })
  },
  { threshold: 0.1 }
)
```

## RAF Throttling

### Basic Pattern

```tsx
useEffect(() => {
  let rafId: number | null = null
  
  const handleScroll = () => {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        // Animation logic here
        updateAnimation()
        rafId = null
      })
    }
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  return () => {
    window.removeEventListener('scroll', handleScroll)
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }
  }
}, [])
```

### Throttle Utility

```tsx
// From lib/performance.ts
import { rafThrottle } from '@/lib/performance'

useEffect(() => {
  const handleScroll = rafThrottle(() => {
    // Animation logic
  })
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

### With Cached Values

```tsx
useEffect(() => {
  let ticking = false
  let cachedRect: DOMRect | null = null
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (!cachedRect) {
          cachedRect = element.getBoundingClientRect()
        }
        
        // Use cachedRect for calculations
        updatePosition(e, cachedRect)
        
        ticking = false
      })
      ticking = true
    }
  }
  
  // Invalidate cache on resize
  const handleResize = () => {
    cachedRect = null
  }
  
  element.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
  
  return () => {
    element.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)
  }
}, [])
```

## Magnetic Hover Effect

The portfolio uses magnetic hover effects on CTAs:

```tsx
const handleMouseMove = (e: MouseEvent) => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const rect = buttonRef.current?.getBoundingClientRect()
      if (!rect) return
      
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
      
      const maxDistance = 150 // Pixels
      const strength = 0.15 // Movement multiplier
      
      if (distance < maxDistance) {
        const factor = (1 - distance / maxDistance) * strength
        buttonRef.current!.style.transform = 
          `translate(${distanceX * factor}px, ${distanceY * factor}px)`
      } else {
        buttonRef.current!.style.transform = 'translate(0, 0)'
      }
      
      ticking = false
    })
    ticking = true
  }
}
```

### CSS for Magnetic Elements

```css
.magnetic-button {
  transition: transform 0.15s ease-out;
  will-change: transform;
}
```

## Hover Transitions

### Basic Lift Effect

```css
.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

### Scale Effect

```css
.thumbnail {
  transition: transform 300ms ease;
}

.thumbnail:hover {
  transform: scale(1.05);
}
```

### Underline Animation

```css
.link {
  position: relative;
}

.link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: width 200ms ease;
}

.link:hover::after {
  width: 100%;
}
```

### Color Transition

```css
.nav-link {
  color: var(--color-text-secondary);
  transition: color 150ms ease;
}

.nav-link:hover {
  color: var(--color-primary);
}
```

## Letter Animation (Hero)

The hero uses staggered letter animation:

```tsx
const name = 'RAÚL'
const letters = name.split('')

{letters.map((letter, i) => (
  <span 
    key={i} 
    className="hero__letter" 
    style={{ animationDelay: `${0.3 + i * 0.06}s` }}
  >
    {letter}
  </span>
))}
```

```css
.hero__letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  animation: letterReveal 0.6s ease forwards;
}

@keyframes letterReveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Page Transitions

### Basic Fade

```css
.page-enter {
  opacity: 0;
}

.page-enter-active {
  opacity: 1;
  transition: opacity 300ms ease;
}

.page-exit {
  opacity: 1;
}

.page-exit-active {
  opacity: 0;
  transition: opacity 300ms ease;
}
```

### With Transform

```css
.page-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms ease, transform 300ms ease;
}
```

## Reduced Motion Support

### Media Query

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Specific Overrides

```css
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
  
  .hero__letter {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
```

### JavaScript Detection

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

### Desktop-Only Animations

```tsx
useEffect(() => {
  // Skip on mobile/touch devices
  const isDesktop = window.matchMedia('(hover: hover)').matches
  if (!isDesktop) return
  
  // Desktop-only hover effects
}, [])
```

## Scroll-Linked Effects

### Parallax

```tsx
useEffect(() => {
  const handleScroll = () => {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY
      const parallaxElement = parallaxRef.current
      if (parallaxElement) {
        parallaxElement.style.transform = `translateY(${scrollY * 0.3}px)`
      }
    })
  }
  
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

### Progress Bar

```tsx
useEffect(() => {
  const updateProgress = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = (scrollTop / docHeight) * 100
    
    progressRef.current!.style.width = `${progress}%`
  }
  
  window.addEventListener('scroll', updateProgress, { passive: true })
  return () => window.removeEventListener('scroll', updateProgress)
}, [])
```

## Performance Best Practices

### DO

- Use `transform` and `opacity` for animations (GPU accelerated)
- Use `passive: true` for scroll/touch listeners
- Throttle with RAF for smooth 60fps
- Use CSS transitions for simple state changes
- Cache DOM measurements (getBoundingClientRect)

### DON'T

- Animate `width`, `height`, `top`, `left` (causes layout)
- Animate `margin`, `padding` (causes layout)
- Read layout properties in animation loop (forced sync layout)
- Use setInterval for animations (use RAF instead)
- Animate too many elements simultaneously

### Will-Change Hint

```css
/* Use sparingly - only for known animated elements */
.animated-element {
  will-change: transform, opacity;
}

/* Remove when not animating */
.animated-element.idle {
  will-change: auto;
}
```

## Animation Constants

From `lib/constants.ts`:

```typescript
export const HERO_MAGNETIC_MAX_DISTANCE = 150
export const HERO_MAGNETIC_STRENGTH = 0.15
export const HERO_SCALE_FACTOR = 1.02
```

Use constants for consistent animation values across the project.

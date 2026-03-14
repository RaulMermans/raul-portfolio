# Visual Hierarchy Skill

## Metadata
```yaml
name: visual-hierarchy
version: 1.0.0
type: skill
trigger: automatic
priority: high
```

## Description
Enforces minimalist UI principles and prevents visual clutter. Activates when designing or modifying page layouts, navigation elements, or any component with multiple UI indicators. Ensures clean visual hierarchy with no redundant elements.

## Auto-Trigger Conditions

This skill activates when:
- Creating new page layouts or hero sections
- Adding navigation indicators (pagination, counters, progress bars)
- Designing scroll hints or call-to-action elements
- Reviewing UI for visual clutter
- Adding multiple interactive elements to a viewport

## Core Principles

### 1. One Indicator Per Information
Never display the same information in multiple ways. If a counter shows "01/02", don't also show pagination dots for the same data.

```
❌ BAD: Pagination dots + Counter + Progress bar (all show position)
✅ GOOD: Single counter OR pagination (not both)
```

### 2. Maximum 3 Focal Points Per Viewport
Users can only focus on a few elements at once. Limit primary attention-grabbing elements to 3.

```
Focal Point Hierarchy:
1. Primary: Main content (title, hero image)
2. Secondary: Primary CTA
3. Tertiary: Navigation hint

Anything beyond 3 competes for attention and creates clutter.
```

### 3. Progressive Disclosure
Show more on interaction, not by default. Let users discover secondary information.

```
❌ BAD: All info visible at once
✅ GOOD: Core info visible, details on hover/click
```

### 4. Whitespace is Intentional
Empty space guides the eye and reduces cognitive load. Don't fill every pixel.

```
❌ BAD: Elements in all four corners + center
✅ GOOD: Content grouped in one area, rest is breathing room
```

### 5. If Two Elements Say the Same Thing, Remove One
Redundancy isn't emphasis—it's clutter.

```
❌ BAD: "SCROLL" text + scroll arrow + next preview bar
✅ GOOD: Minimal next hint (implies scrollability)
```

## Anti-Patterns to Flag

### Redundant Navigation Indicators
```
// ❌ Flag this
<Pagination items={items} />
<Counter current={1} total={5} />
<ProgressBar progress={20} />

// ✅ Suggest this
<Counter current={1} total={5} />
```

### Competing CTAs at Same Level
```
// ❌ Flag this
<Button primary>View Project</Button>
<Button primary>Learn More</Button>
<Button primary>Contact Us</Button>

// ✅ Suggest this
<Button primary>View Project</Button>
<Link secondary>Learn More</Link>
```

### Decorative Noise
```css
/* ❌ Flag this */
.element {
  border: 1px solid;
  box-shadow: 0 2px 4px;
  outline: 2px dashed;
  text-decoration: underline;
}

/* ✅ Suggest this */
.element {
  box-shadow: var(--shadow-md);
}
```

### Over-Animated Elements
```css
/* ❌ Flag this - multiple animated elements compete */
.scroll-hint { animation: bounce 2s infinite; }
.cta { animation: pulse 1.5s infinite; }
.arrow { animation: float 2s infinite; }

/* ✅ Suggest this - one subtle animation */
.next-hint { animation: gentleBounce 2.5s ease-in-out infinite; }
```

## Checklist for New Layouts

Before finalizing any layout, verify:

- [ ] **Position indicators**: Only ONE way to show current position
- [ ] **Scroll hints**: Only ONE indicator that there's more content
- [ ] **CTAs**: Clear hierarchy (one primary, rest secondary)
- [ ] **Focal points**: Maximum 3 attention-grabbing elements
- [ ] **Animations**: Maximum 1-2 subtle animations per viewport
- [ ] **Labels**: No redundant text (if icon is clear, skip label)

## Real Example: Case Studies Hero Stack

### Before (Cluttered)
```
Elements competing for attention:
- Pagination (01 with line, 02) - RIGHT
- Counter (01 / 02) - BOTTOM RIGHT  
- "SCROLL" indicator - LEFT
- Next preview bar - BOTTOM
- Subtitle badge - CONTENT
- Title - CONTENT
- Description - CONTENT  
- CTA - CONTENT

Result: 8+ focal points, redundant position info
```

### After (Clean)
```
Elements with clear hierarchy:
1. Title + Description (PRIMARY - content)
2. CTA (SECONDARY - action)
3. Counter (TERTIARY - position, top-right)
4. Next hint (QUATERNARY - subtle, center-bottom)

Result: 4 clear elements, single position indicator
```

## Integration Notes

- Works alongside `design-system` skill for consistent styling
- Complements `accessibility-enforcer` for semantic structure
- Should be consulted before ANY new page layout
- Reference this skill when reviewing PRs with UI changes

## Quick Reference

| Element Type | Maximum Count | Position |
|-------------|---------------|----------|
| Position indicator | 1 | Top-right or pagination area |
| Scroll hint | 1 | Bottom center (subtle) |
| Primary CTA | 1 | Within content area |
| Animations | 1-2 | Spread across viewport |
| Navigation | 1 system | Consistent location |

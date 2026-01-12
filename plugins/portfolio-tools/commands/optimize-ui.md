# Optimize UI Command

## Purpose
Analyze the portfolio's CSS files and suggest modern design improvements.

## Instructions

When this command is invoked, perform the following analysis:

1. **Scan CSS Files**: Read all CSS modules and global CSS files in the project:
   - `app/globals.css`
   - `app/**/*.module.css`
   - `components/**/*.module.css`

2. **Analyze Current Styles**: Evaluate the existing CSS for:
   - Color schemes and contrast ratios
   - Typography choices and hierarchy
   - Spacing and layout patterns
   - Animation and transition usage
   - Responsive design breakpoints

3. **Suggest 3 Modern Design Improvements**: Based on current 2024-2025 design trends, provide exactly 3 actionable improvements:

   **Improvement Format:**
   - **What**: Clear description of the change
   - **Why**: Design trend or UX principle supporting this
   - **How**: Specific CSS code snippet to implement
   - **Files**: Which files need modification

4. **Focus Areas** (prioritize these):
   - Glassmorphism or subtle blur effects
   - Modern color gradients
   - Micro-interactions and hover states
   - Variable fonts and fluid typography
   - CSS Grid/Flexbox optimization
   - Dark mode enhancements
   - Scroll-driven animations
   - Container queries for component-based responsiveness

## Output Format

```
## Portfolio UI Analysis

### Current State Summary
[Brief overview of current design patterns]

### Recommended Improvements

#### 1. [Improvement Title]
- **What**: [Description]
- **Why**: [Rationale]
- **How**:
  ```css
  [Code snippet]
  ```
- **Files**: [File paths]

#### 2. [Improvement Title]
[Same format]

#### 3. [Improvement Title]
[Same format]

### Implementation Priority
[Which to do first and why]
```

## Notes
- Preserve existing brand identity
- Ensure accessibility (WCAG 2.1 AA compliance)
- Keep changes performant (no heavy animations on mobile)
- Maintain consistency with current design language

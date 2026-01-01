# Page Shrinking Issue - Critical Audit Report

## 🔴 CRITICAL FINDINGS

### Issue 1: PageTransition Scale Transform
**Location**: `styles/globals.css` lines 2823-2840

**Problem**: 
```css
.page-transition--exiting {
  transform: translateY(-30px) scale(0.96);  /* <-- SCALES PAGE TO 96%! */
  ...
}

.page-transition--pending {
  transform: translateY(30px) scale(0.96);   /* <-- SCALES PAGE TO 96%! */
  ...
}
```

The `scale(0.96)` transform literally shrinks the entire page to 96% during transitions, causing the visible "page shrinking" effect.

**Impact**: HIGH - Causes visible page shrinking during page transitions

---

### Issue 2: Body Fixed Positioning During Transitions
**Location**: `styles/globals.css` lines 2898-2905

**Problem**:
```css
body.page-transitioning {
  overflow: hidden;
  position: fixed;        /* <-- FIXES BODY, CAN CAUSE LAYOUT ISSUES */
  width: 100%;
  height: 100%;
  left: 0;
}
```

Setting `position: fixed` on the body can cause layout shifts and width calculation issues, especially when combined with the scale transform.

**Impact**: MEDIUM - Can cause layout inconsistencies

---

### Issue 3: Body Top Offset Without Width Preservation
**Location**: `components/PageTransition.tsx` line 65

**Problem**:
```typescript
document.body.style.top = `-${scrollPositionRef.current}px`
```

When body is set to `position: fixed`, setting `top` without preserving width can cause the body to lose its proper width calculation.

**Impact**: MEDIUM - Can cause width calculation issues

---

### Issue 4: PageTransition Scale on Entering
**Location**: `styles/globals.css` line 2864

**Problem**:
```css
.page-transition--entering {
  transform: translateX(0) translateY(0) scale(1);  /* Scale back to 1 */
  ...
}
```

While this scales back to 1, the transition from 0.96 to 1.0 can cause visible shrinking/expanding.

**Impact**: LOW - Less noticeable but still problematic

---

## Root Cause Analysis

The page shrinking is caused by **multiple compounding issues**:

1. **Primary Cause**: `scale(0.96)` on `.page-transition--exiting` and `.page-transition--pending` classes literally scales the entire page wrapper down to 96% of its size
2. **Secondary Cause**: `position: fixed` on body during transitions can cause width calculation issues
3. **Tertiary Cause**: The combination of fixed positioning + scale transform creates a visual shrinking effect

## Why This Affects Homepage

Even though the homepage might not be transitioning, the PageTransition component:
- Wraps ALL pages (including homepage) in the `.page-transition` div
- The component might be in a transitioning state on initial load
- CSS rules apply globally to any page wrapped in PageTransition

## Recommended Solutions

### Solution 1: Remove Scale Transform (RECOMMENDED)
Remove `scale(0.96)` from all transition states. Use only translate and opacity for animations.

**Changes needed**:
- Remove `scale(0.96)` from `.page-transition--exiting`
- Remove `scale(0.96)` from `.page-transition--pending`
- Keep only `translateX/Y` and `opacity` transforms

### Solution 2: Use Transform-Origin Properly
If scale must be kept for design reasons, use `transform-origin: center center` to ensure scaling happens from center.

### Solution 3: Fix Body Positioning Strategy
Instead of `position: fixed` on body, use a different approach:
- Use `overflow: hidden` on html/body without fixed positioning
- Or use a wrapper div for the scroll lock mechanism

### Solution 4: Ensure Width Preservation
When using `position: fixed`, explicitly set width:
```css
body.page-transitioning {
  position: fixed;
  width: 100vw;  /* Use viewport width instead of 100% */
  left: 0;
  right: 0;
}
```

## Priority Fix Order

1. **IMMEDIATE**: Remove `scale(0.96)` from transition CSS (fixes visible shrinking)
2. **HIGH**: Review and fix body fixed positioning strategy
3. **MEDIUM**: Add proper width preservation for fixed body
4. **LOW**: Review transition timing and easing

## Files to Modify

1. `styles/globals.css` - Remove scale transforms from page-transition classes
2. `components/PageTransition.tsx` - Review body positioning logic
3. `styles/globals.css` - Fix body.page-transitioning CSS rules

## Testing Checklist

After fixes:
- [ ] Homepage loads without shrinking
- [ ] Page transitions don't cause visible shrinking
- [ ] All pages maintain full width during transitions
- [ ] No layout shifts occur
- [ ] Scroll behavior works correctly
- [ ] Mobile viewport is not affected

---

**Status**: 🔴 CRITICAL - Needs Immediate Fix
**Estimated Fix Time**: 15-30 minutes
**Risk Level**: LOW (fix is straightforward CSS changes)


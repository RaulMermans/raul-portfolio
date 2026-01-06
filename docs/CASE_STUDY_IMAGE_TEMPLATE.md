# 📐 Case Study Image Position Template

Use this template to ensure images appear in the exact positions you want.

## 🎯 Visual Position Map

### Hero Section
```
┌─────────────────────────────────────┐
│                                     │
│         Hero.webp                   │
│      (Full background)              │
│                                     │
└─────────────────────────────────────┘
Location: hero/Hero.webp
```

### Full Bleed Section
```
┌─────────────────────────────────────┐
│                                     │
│      Full-1.webp                    │
│   (First full-width image)          │
│                                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│                                     │
│      full-2.webp                    │
│   (Second full-width image)         │
│                                     │
└─────────────────────────────────────┘
Location: full/Full-1.webp, full/full-2.webp
```

### Approach Section
```
┌──────────────┬──────────────┐
│              │              │
│ approach-1  │ approach-2  │
│   (Left)     │   (Right)    │
│              │              │
└──────────────┴──────────────┘
Location: approach/approach-1.webp, approach/approach-2.webp
```

### Feature Section
```
┌─────────────────────────────────────┐
│                                     │
│      feature_1.webp                  │
│   (Large showcase image)            │
│                                     │
└─────────────────────────────────────┘
Location: feature/feature_1.webp
```

### Gallery Section (2x2 Grid)
```
┌──────────────────┬──────────────────┐
│                  │                  │
│   gallery-1      │   gallery-2      │
│   (COLOR)        │   (GRAYSCALE)    │
│   Landscape      │   Portrait       │
│   4:3            │   3:4            │
│                  │                  │
├──────────────────┼──────────────────┤
│                  │                  │
│   gallery-3      │   gallery4       │
│   (GRAYSCALE)    │   (COLOR)        │
│   Portrait       │   Landscape      │
│   3:4            │   4:3            │
│                  │                  │
└──────────────────┴──────────────────┘
Location: gallery/gallery-1.webp, gallery-2.webp, gallery-3.webp, gallery4.webp
```

## 📋 Quick Upload Checklist

When adding images for a new case study:

1. **Create folder structure:**
   ```
   public/images/case-studies/{case-study-id}/
   ├── hero/
   ├── full/
   ├── approach/
   ├── feature/
   ├── gallery/
   └── thumb/
   ```

2. **Upload images with exact filenames:**
   - Hero: `Hero.webp` → `hero/Hero.webp`
   - Full 1: `Full-1.webp` → `full/Full-1.webp`
   - Full 2: `full-2.webp` → `full/full-2.webp`
   - Approach 1: `approach-1.webp` → `approach/approach-1.webp`
   - Approach 2: `approach-2.webp` → `approach/approach-2.webp`
   - Feature: `feature_1.webp` → `feature/feature_1.webp`
   - Gallery 1: `gallery-1.webp` → `gallery/gallery-1.webp` (top-left, COLOR)
   - Gallery 2: `gallery-2.webp` → `gallery/gallery-2.webp` (top-right, GRAYSCALE)
   - Gallery 3: `gallery-3.webp` → `gallery/gallery-3.webp` (bottom-left, GRAYSCALE)
   - Gallery 4: `gallery4.webp` → `gallery/gallery4.webp` (bottom-right, COLOR)
   - Thumb: `thumb.webp` → `thumb/thumb.webp`

3. **Verify with validation script:**
   ```bash
   node scripts/validate-case-study-images.js {case-study-id}
   ```

4. **Update content file:**
   - Edit `data/case-studies-content.ts`
   - Add your case study content
   - Images will automatically load from the correct paths

## 🎨 Gallery Display Rules

The gallery automatically applies styling based on position:

| Position | Filename | Display | Aspect Ratio | Grid Position |
|----------|----------|---------|--------------|--------------|
| 1 | `gallery-1.webp` | COLOR | 4:3 (landscape) | Top-Left |
| 2 | `gallery-2.webp` | GRAYSCALE | 3:4 (portrait) | Top-Right |
| 3 | `gallery-3.webp` | GRAYSCALE | 3:4 (portrait) | Bottom-Left |
| 4 | `gallery4.webp` | COLOR | 4:3 (landscape) | Bottom-Right |

**Hover Effect:** All images show full color on hover

## ⚠️ Common Issues

### Image Not Showing?
1. Check filename matches exactly (case-sensitive!)
2. Verify file is in correct folder
3. Run validation script: `node scripts/validate-case-study-images.js {id}`
4. Check browser console for 404 errors

### Wrong Position in Gallery?
1. Verify filename matches position (gallery-1 = top-left, etc.)
2. Check order in `case-studies-content.ts` matches: 1, 2, 3, 4
3. Ensure no extra images in gallery folder

### Case Sensitivity?
- macOS: `Hero.webp` = `hero.webp` (same file)
- Linux/Production: `Hero.webp` ≠ `hero.webp` (different files!)
- **Solution:** Use consistent casing (prefer lowercase with hyphens)

## 💡 Pro Tips

1. **Use the validation script** before deploying
2. **Follow the exact filenames** - even small differences matter
3. **Test locally first** - verify all images load
4. **Keep aspect ratios** - recommended ratios ensure best display
5. **Optimize images** - compress before uploading for performance


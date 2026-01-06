# 📸 Case Study Image Position Guide

This guide ensures images appear in the **exact position** you want in your case studies.

## 🎯 How It Works

Each case study has a **position-based image mapping system**. When you upload an image with a specific filename, it automatically appears in the correct position.

## 📁 Folder Structure

All case study images go in:
```
public/images/case-studies/{case-study-id}/
```

Then organized by section:
- `hero/` - Hero background images
- `full/` - Full-bleed section images
- `approach/` - Approach section images
- `feature/` - Feature showcase images
- `gallery/` - Gallery grid images
- `thumb/` - Thumbnail for case studies list

## 🖼️ Image Positions by Section

### Hero Section
**Position:** Hero Background
- **Folder:** `hero/`
- **Filename:** `Hero.webp` (or `hero.webp`)
- **Aspect Ratio:** 16:9
- **Usage:** Main hero background image

### Full Bleed Section
**Position 1:** Full Bleed 1 (First)
- **Folder:** `full/`
- **Filename:** `Full-1.webp` or `full-1.webp`
- **Aspect Ratio:** 16:9
- **Usage:** First full-width image

**Position 2:** Full Bleed 2 (Second)
- **Folder:** `full/`
- **Filename:** `full-2.webp`
- **Aspect Ratio:** 16:9
- **Usage:** Second full-width image

### Approach Section
**Position 1:** Approach Image 1 (Left)
- **Folder:** `approach/`
- **Filename:** `approach-1.webp`
- **Aspect Ratio:** 4:3
- **Usage:** Left side of approach section

**Position 2:** Approach Image 2 (Right)
- **Folder:** `approach/`
- **Filename:** `approach-2.webp`
- **Aspect Ratio:** 4:3
- **Usage:** Right side of approach section

### Feature Section
**Position:** Feature Image (Large Showcase)
- **Folder:** `feature/`
- **Filename:** `feature_1.webp` or `feature.webp`
- **Aspect Ratio:** 16:9
- **Usage:** Large featured showcase image

### Gallery Section (2x2 Grid)

The gallery uses a **position-based system** where each image has a specific position:

**Position 1: Top-Left** (Color, Landscape)
- **Folder:** `gallery/`
- **Filename:** `gallery-1.webp`
- **Aspect Ratio:** 4:3 (landscape)
- **Display:** Full COLOR
- **Grid Position:** Top-left

**Position 2: Top-Right** (Grayscale, Portrait)
- **Folder:** `gallery/`
- **Filename:** `gallery-2.webp`
- **Aspect Ratio:** 3:4 (portrait)
- **Display:** GRAYSCALE
- **Grid Position:** Top-right

**Position 3: Bottom-Left** (Grayscale, Portrait)
- **Folder:** `gallery/`
- **Filename:** `gallery-3.webp`
- **Aspect Ratio:** 3:4 (portrait)
- **Display:** GRAYSCALE
- **Grid Position:** Bottom-left

**Position 4: Bottom-Right** (Color, Landscape)
- **Folder:** `gallery/`
- **Filename:** `gallery4.webp` (or `gallery-4.webp`)
- **Aspect Ratio:** 4:3 (landscape)
- **Display:** Full COLOR
- **Grid Position:** Bottom-right

### Thumbnail
**Position:** Thumbnail (Case Studies List)
- **Folder:** `thumb/`
- **Filename:** `thumb.webp`
- **Aspect Ratio:** 16:9
- **Usage:** Thumbnail on case studies listing page

## ✅ Quick Reference: AI Sports Campaign

For the **AI Sports Campaign** case study, here's the exact mapping:

```
public/images/case-studies/ai-sports/
├── hero/
│   └── Hero.webp              → Hero background
├── full/
│   ├── Full-1.webp            → Full bleed 1
│   └── full-2.webp             → Full bleed 2
├── approach/
│   ├── approach-1.webp        → Approach left
│   └── approach-2.webp        → Approach right
├── feature/
│   └── feature_1.webp          → Feature showcase
├── gallery/
│   ├── gallery-1.webp        → Gallery top-left (COLOR, landscape)
│   ├── gallery-2.webp         → Gallery top-right (GRAYSCALE, portrait)
│   ├── gallery-3.webp         → Gallery bottom-left (GRAYSCALE, portrait)
│   └── gallery4.webp          → Gallery bottom-right (COLOR, landscape)
└── thumb/
    └── thumb.webp              → Thumbnail
```

## 🎨 Gallery Display Rules

The gallery automatically applies:
- **Color/Grayscale:** Items 1 & 4 are color, items 2 & 3 are grayscale
- **Aspect Ratios:** Items 1 & 4 are landscape (4:3), items 2 & 3 are portrait (3:4)
- **Hover Effect:** All images show full color on hover

## 📝 Adding Images for New Case Studies

1. **Create the folder structure:**
   ```
   public/images/case-studies/{new-case-study-id}/
   ├── hero/
   ├── full/
   ├── approach/
   ├── feature/
   ├── gallery/
   └── thumb/
   ```

2. **Upload images with exact filenames** matching the position you want

3. **Update the image map** in `lib/case-study-image-map.ts` to add your new case study

4. **Update the content** in `data/case-studies-content.ts` to reference your images

## 🔍 Troubleshooting

### Image Not Showing?
1. Check the filename matches exactly (case-sensitive on Linux/production)
2. Verify the file is in the correct folder
3. Check the browser console for 404 errors
4. Ensure the image path in `case-studies-content.ts` matches the filename

### Wrong Position?
1. Verify the filename matches the position mapping
2. Check the gallery order in `case-studies-content.ts`
3. Ensure gallery items are in the correct order (1, 2, 3, 4)

### Case Sensitivity Issues?
- On macOS: `Hero.webp` and `hero.webp` are the same
- On Linux/Production: They are different!
- **Best Practice:** Use consistent casing (prefer lowercase with hyphens)

## 💡 Pro Tips

1. **Use descriptive filenames:** `gallery-1.webp` is clearer than `img1.webp`
2. **Keep aspect ratios consistent:** Follow the recommended aspect ratios for best display
3. **Optimize images:** Compress before uploading for better performance
4. **Test locally first:** Verify all images load before deploying


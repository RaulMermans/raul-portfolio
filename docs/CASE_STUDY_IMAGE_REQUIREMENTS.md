# 📸 Case Study Image Requirements - Minimum Needed

## Required vs Optional Images

### ✅ **REQUIRED Images** (Page won't work properly without these)

#### `hero/` folder
- **Minimum:** **1 image**
- **Required:** ✅ YES
- **Usage:** Hero section background
- **Filename:** `Hero.webp` or `hero.webp` (case-sensitive on production)
- **Example:** `hero/Hero.webp`

---

### 🔶 **OPTIONAL but Recommended Images**

#### `thumb/` folder
- **Minimum:** **1 image** (recommended)
- **Required:** ❌ NO (but highly recommended)
- **Usage:** Thumbnail on case studies listing page
- **Filename:** `thumb.webp`
- **Example:** `thumb/thumb.webp`
- **Note:** If missing, listing page may show placeholder or no image

---

#### `full/` folder
- **Minimum:** **0 images** (optional)
- **Required:** ❌ NO
- **Usage:** Full-bleed section images (between content sections)
- **Typical:** 0-3 images
- **Examples:** 
  - AI Sports: `full/Full-1.webp`, `full/full-2.webp` (2 images)
  - Remoria: `full/full-1.webp` (1 image)
- **Note:** Section won't show if empty array `[]`

---

#### `approach/` folder
- **Minimum:** **0 images** (optional)
- **Required:** ❌ NO
- **Usage:** Images in the Approach section
- **Typical:** 0-2 images
- **Examples:**
  - AI Sports: `approach/approach-1.webp`, `approach/approach-2.webp` (2 images)
  - Remoria: `approach/approach-1.webp`, `approach/approach-2.webp` (2 images)
- **Note:** Images display in a grid if provided

---

#### `feature/` folder
- **Minimum:** **0 images** (optional)
- **Required:** ❌ NO
- **Usage:** Large featured showcase image
- **Typical:** 0-1 image
- **Examples:**
  - AI Sports: `feature/feature_1.webp` (1 image)
  - Remoria: `feature/feature.webp` (1 image)
- **Note:** Section won't show if not defined

---

#### `gallery/` folder
- **Minimum:** **1 image** (if gallery section exists in content)
- **Required:** ❌ NO (but required if you want gallery to show)
- **Usage:** Gallery showcase section
- **Typical:** 4-5 images for best visual impact
- **Examples:**
  - AI Sports: 4 images (2x2 grid)
    - `gallery/gallery-1.webp` (top-left, COLOR)
    - `gallery/gallery-2.webp` (top-right, GRAYSCALE)
    - `gallery/gallery-3.webp` (bottom-left, GRAYSCALE)
    - `gallery/gallery4.webp` (bottom-right, COLOR)
  - Remoria: 5 images
    - `gallery/gallery-1.webp`
    - `gallery/gallery-2.webp`
    - `gallery/gallery-3.webp`
    - `gallery/gallery-4.webp`
    - `gallery/gallery-5.webp`
- **Note:** Gallery won't show if `gallery` is not defined in content or is empty

---

## 📊 Summary Table

| Folder | Minimum | Required | Typical Count | Display Location |
|--------|---------|----------|---------------|------------------|
| `hero/` | **1** | ✅ **YES** | 1 | Hero section background |
| `thumb/` | 1 | ❌ No | 1 | Case studies listing |
| `full/` | 0 | ❌ No | 0-3 | Full-bleed sections |
| `approach/` | 0 | ❌ No | 0-2 | Approach section grid |
| `feature/` | 0 | ❌ No | 0-1 | Feature showcase |
| `gallery/` | 1* | ❌ No* | 4-5 | Gallery section |

\* Required if you want the gallery section to display

---

## 🎯 Absolute Minimum for Basic Case Study

**To have a working case study page, you need at minimum:**

```
public/images/case-studies/{case-study-id}/
└── hero/
    └── Hero.webp  ✅ REQUIRED (1 image minimum)
```

**That's it!** Just the hero image will make the page work.

---

## 🌟 Recommended Minimum for Full Experience

For a complete, polished case study:

```
public/images/case-studies/{case-study-id}/
├── hero/
│   └── Hero.webp              ✅ 1 image (REQUIRED)
├── thumb/
│   └── thumb.webp             🔶 1 image (recommended)
├── gallery/
│   ├── gallery-1.webp         🔶 4 images (for 2x2 grid)
│   ├── gallery-2.webp
│   ├── gallery-3.webp
│   └── gallery4.webp
└── feature/
    └── feature.webp           🔶 1 image (optional)
```

**Total: 7 images minimum** (1 required + 6 recommended)

---

## 📋 Quick Checklist

**Must Have:**
- [ ] `hero/Hero.webp` (or `hero.webp`)

**Should Have:**
- [ ] `thumb/thumb.webp`
- [ ] `gallery/` folder with at least 4 images

**Nice to Have:**
- [ ] `feature/feature.webp`
- [ ] `approach/` folder with 1-2 images
- [ ] `full/` folder with 1-2 images

---

## 🔍 How to Check What You Have

Run the validation script:
```bash
node scripts/validate-case-study-images.js {case-study-id}
```

This will show you:
- ✅ Which images exist
- ❌ Which images are missing
- ⚠️ Case sensitivity issues


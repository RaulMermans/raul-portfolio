# Photography Gallery - How to Add Your Photos

## 📸 Adding Your Photos

### Step 1: Open the File
Edit: `/app/photography/page.tsx`

### Step 2: Find the Categories Object
Look for the `categories` object at the top of the file (around line 13-50).

### Step 3: Add Your Photos

**Structure for each photo:**
```typescript
{
  src: '/images/photography/your-photo.webp',  // Path to your image
  alt: 'Description of the photo',              // For accessibility
}
```

**Example:**
```typescript
const categories = {
  landscape: {
    name: 'Landscape',
    count: 12,  // Update this number to match your photo count
    images: [
      { src: '/images/photography/mountain-1.webp', alt: 'Mountain landscape at dawn' },
      { src: '/images/photography/forest-1.webp', alt: 'Forest valley with morning mist' },
      // Add more photos here...
    ],
  },
  architecture: {
    name: 'Architecture',
    count: 12,  // Update this number to match your photo count
    images: [
      { src: '/images/photography/building-1.webp', alt: 'Modern glass building facade' },
      { src: '/images/photography/building-2.webp', alt: 'Brutalist concrete structure' },
      // Add more photos here...
    ],
  },
}
```

### Step 4: Update the Count
Make sure the `count` number matches the number of images in each category.

### Step 5: Save Your Images
Place your images in: `/public/images/photography/`

**Recommended:**
- Use WebP format (best compression)
- Name them descriptively: `mountain-1.webp`, `building-1.webp`, etc.
- Keep file sizes under 500KB each

---

## 🎯 Adding New Categories

Want to add more categories (like "Portraits", "Street", etc.)?

1. Add a new category to the `categories` object:
```typescript
portraits: {
  name: 'Portraits',
  count: 8,
  images: [
    { src: '/images/photography/portrait-1.webp', alt: 'Portrait description' },
    // ... more photos
  ],
},
```

2. Add a button in the bottom navigation (around line 280):
```typescript
<button
  onClick={() => setActiveCategory('portraits')}
  className="category-btn ..."
>
  Portraits
</button>
```

---

## ✨ Features

- **Click any image** → Opens in lightbox (fullscreen)
- **Arrow keys** → Navigate between images in lightbox
- **ESC key** → Close lightbox
- **Category buttons** → Filter images by category
- **Horizontal scroll** → Scroll with mouse wheel or arrow keys
- **Keyboard navigation** → Arrow keys to scroll gallery

---

## 📝 Notes

- Images are automatically organized in a scattered grid layout
- Active category images are in color, inactive are grayscale
- Lightbox shows high-resolution versions of images
- All images are clickable (even inactive ones open lightbox)

---

## 🚀 Quick Start

1. Save your photos to `/public/images/photography/`
2. Update the `categories` object with your photo paths
3. Update the `count` numbers
4. Done! Your photos will appear in the gallery


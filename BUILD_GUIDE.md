# Step-by-Step Build Guide

This guide will walk you through building your portfolio website step by step.

## Understanding the Structure

**Important:** Next.js uses React components (`.tsx` files), not traditional HTML files. Each page is a React component that returns JSX (which looks like HTML but is JavaScript).

### File Structure Overview:
- `app/page.tsx` = Your home page (like `index.html`)
- `app/about/page.tsx` = About page
- `app/projects/page.tsx` = Projects page
- `app/contact/page.tsx` = Contact page
- `components/` = Reusable components (Header, Footer, etc.)
- `app/layout.tsx` = Wraps all pages (like a template)

---

## Build Order (Step by Step)

### ✅ STEP 1: Update the Layout (Foundation)
**File:** `app/layout.tsx`

**What to do:**
- Update the title, description, and metadata
- Add Header and Footer components to wrap all pages
- This is your site's foundation

**Current state:** Basic layout exists
**Your task:** Add Header/Footer, update metadata

---

### ✅ STEP 2: Build the Home Page
**File:** `app/page.tsx`

**What to include:**
- Hero section (your name, title, brief intro)
- Call-to-action buttons
- Maybe a quick skills overview
- Link to projects/contact

**Current state:** Basic welcome message
**Your task:** Replace with your actual hero section

---

### ✅ STEP 3: Create the About Page
**File:** `app/about/page.tsx` (create this file)

**What to include:**
- Your story/background
- Skills and technologies
- Education/experience
- What you're passionate about

**Current state:** Doesn't exist yet
**Your task:** Create the file and build the page

---

### ✅ STEP 4: Create the Projects Page
**File:** `app/projects/page.tsx` (create this file)

**What to include:**
- Grid/list of your projects
- Project cards with:
  - Project name
  - Description
  - Technologies used
  - Links (GitHub, live demo)
  - Screenshots/images

**Current state:** API route exists, but no page
**Your task:** Create the page and fetch/display projects

---

### ✅ STEP 5: Create the Contact Page
**File:** `app/contact/page.tsx` (create this file)

**What to include:**
- Contact form (name, email, message)
- Your contact info (email, social links)
- Form submission handling

**Current state:** API route exists, but no page
**Your task:** Create the page with a contact form

---

### ✅ STEP 6: Build Reusable Components
**Files:** `components/Header.tsx`, `components/Footer.tsx`

**What to do:**
- Header: Update navigation links, add your logo/name
- Footer: Add social media links, copyright info

**Current state:** Basic structure exists
**Your task:** Customize with your content

---

### ✅ STEP 7: Add Your Projects Data
**File:** `app/api/projects/route.ts`

**What to do:**
- Replace example data with your actual projects
- Or connect to a database/CMS
- Structure: title, description, image, technologies, links

**Current state:** Has example project
**Your task:** Add your real projects

---

### ✅ STEP 8: Add Images and Assets
**Folder:** `public/`

**What to add:**
- Your profile photo
- Project screenshots
- Logo/favicon
- Any other images

**Current state:** Empty folder
**Your task:** Add your images

---

### ✅ STEP 9: Customize Styling
**Files:** `tailwind.config.js`, `styles/globals.css`

**What to do:**
- Choose your color scheme
- Add custom fonts
- Set up your brand colors
- Customize spacing/typography

**Current state:** Default Tailwind setup
**Your task:** Make it yours!

---

### ✅ STEP 10: Polish & Deploy
**What to do:**
- Test all pages
- Check mobile responsiveness
- Fix any bugs
- Deploy to Vercel/Netlify

---

## Quick Reference: What Each File Does

| File | Purpose | Priority |
|------|---------|----------|
| `app/layout.tsx` | Wraps all pages, sets metadata | ⭐⭐⭐ HIGH |
| `app/page.tsx` | Home page (first thing visitors see) | ⭐⭐⭐ HIGH |
| `app/about/page.tsx` | About you page | ⭐⭐ MEDIUM |
| `app/projects/page.tsx` | Showcase your work | ⭐⭐⭐ HIGH |
| `app/contact/page.tsx` | Contact form | ⭐⭐ MEDIUM |
| `components/Header.tsx` | Navigation bar | ⭐⭐⭐ HIGH |
| `components/Footer.tsx` | Footer with links | ⭐ LOW |
| `app/api/projects/route.ts` | Backend: serves project data | ⭐⭐ MEDIUM |
| `app/api/contact/route.ts` | Backend: handles form submissions | ⭐⭐ MEDIUM |

---

## Recommended Starting Point

**Start with these 3 files in order:**

1. **`app/layout.tsx`** - Add Header/Footer, update metadata
2. **`app/page.tsx`** - Build your hero/home section
3. **`components/Header.tsx`** - Customize navigation

Then build the other pages as needed!

---

## Need Help?

- Each `.tsx` file is like an HTML page but written in React
- Use Tailwind CSS classes for styling (like `className="text-white bg-blue-500"`)
- Components can be reused across pages
- The `app/` folder structure automatically creates routes

**Example:** `app/about/page.tsx` automatically becomes `/about` URL

Ready to start? Begin with Step 1!


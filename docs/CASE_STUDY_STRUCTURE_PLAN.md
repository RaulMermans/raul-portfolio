# Case Study Structure & Documentation Plan

## Current State Analysis

**Problems:**
- 900+ lines of duplicated code across 2 case studies
- Hardcoded image paths (not using new folder structure)
- No type safety
- Difficult to add new case studies
- Content mixed with presentation logic

## Recommended Documents & Structure

### 1. Type Definitions (`types/case-study.ts`)
**Purpose:** Type-safe structure for all case study content

**Contains:**
- `CaseStudyContent` interface (complete case study structure)
- `HeroSection`, `OverviewSection`, `ChallengeSection`, etc.
- `ImageReference` types using new folder structure
- Variant types (gold accent, etc.)

**Why:** Prevents runtime errors, enables autocomplete, self-documenting

---

### 2. Image Path Utility (`lib/case-study-images.ts`)
**Purpose:** Centralized, type-safe image path management

**Functions:**
```typescript
getCaseStudyImage(id: string, type: ImageType, filename: string): string
getCaseStudyHero(id: string): string
getCaseStudyThumb(id: string): string
// etc.
```

**Why:** Uses new folder structure, single source of truth, easy refactoring

---

### 3. Case Study Content Data (`data/case-studies-content.ts`)
**Purpose:** Separate content from presentation

**Structure:**
```typescript
export const caseStudiesContent: Record<string, CaseStudyContent> = {
  'ai-sports': { ... },
  'remoria': { ... }
}
```

**Why:** Easy content editing, can migrate to CMS later, consistent structure

---

### 4. Reusable Components (`components/case-studies/`)

#### `CaseStudyLayout.tsx`
- Header, footer, animations
- Scroll effects hook
- Reveal animations setup
- Structured data

#### `CaseStudyHero.tsx`
- Hero section with image, title, tagline
- Scroll indicator
- Letterbox effects

#### `CaseStudyOverview.tsx`
- Meta information grid
- Description text
- Intent quote

#### `CaseStudyChallenge.tsx`
- Quote heading
- Challenge text
- Success criteria list

#### `CaseStudyApproach.tsx`
- Approach text and tools
- System grids (variable/constant/output)
- Special modules (aesthetic, voice for Remoria)

#### `CaseStudyGallery.tsx`
- Flexible gallery layouts (2, 3, asymmetric columns)
- Image optimization
- Hover effects

#### `CaseStudyResults.tsx`
- Results text
- Takeaway quote
- Variant support (gold accent)

#### `CaseStudyImage.tsx`
- Next.js Image wrapper
- Consistent optimization settings
- Type-safe path handling

**Why:** DRY principle, consistent styling, easier maintenance

---

### 5. Custom Hooks (`hooks/useCaseStudy.ts`)

#### `useCaseStudyAnimations()`
- Scroll header effect
- Intersection Observer for reveals
- Cleanup logic

#### `useCaseStudyData(id: string)`
- Fetch case study content
- Type-safe data access
- Error handling

**Why:** Reusable logic, cleaner components, easier testing

---

### 6. Documentation Files

#### `docs/CASE_STUDY_GUIDE.md`
**Contents:**
- How to add a new case study (step-by-step)
- Folder structure requirements
- Image naming conventions
- Content structure requirements
- Component usage examples
- Common patterns and variants

#### `docs/CASE_STUDY_REFACTORING.md` (already created)
- Refactoring plan
- Migration strategy
- Expected outcomes

#### `public/images/case-studies/[id]/README.md`
**Contents (per case study):**
- Required images for each folder
- Image dimensions/specs
- Naming conventions
- Optional images

**Why:** Onboarding, consistency, reference

---

### 7. Dynamic Route Structure (Future)

#### `app/case-studies/[id]/page.tsx`
Instead of individual pages per case study, use dynamic routing:

```typescript
export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const content = caseStudiesContent[params.id]
  // Render using components
}
```

**Benefits:**
- Single page component for all case studies
- Automatic routing for new case studies
- Easier maintenance

**Why:** Scalability, no code duplication, automatic routing

---

### 8. Validation Utilities (`lib/validate-case-study.ts`)

**Functions:**
- `validateCaseStudyContent(content: CaseStudyContent)`
- `validateImagePaths(content: CaseStudyContent)`
- Development-time checks

**Why:** Catch errors early, ensure consistency

---

### 9. Template/Generator Script (`scripts/create-case-study.ts`)

**Purpose:** Automate case study creation

**Actions:**
- Creates folder structure
- Creates image folders (hero, thumb, approach, etc.)
- Generates template data structure
- Creates README.md with instructions

**Why:** Reduce manual work, ensure consistency

---

### 10. Image Optimization Documentation (`docs/CASE_STUDY_IMAGES.md`)

**Contents:**
- Image formats and optimization
- Required dimensions per type
- Naming conventions
- Tools and workflows

**Why:** Consistency, performance, quality

---

## Priority Order

### High Priority (Do First)
1. ✅ Type definitions (`types/case-study.ts`)
2. ✅ Image path utility (`lib/case-study-images.ts`)
3. ✅ Case study content data structure (`data/case-studies-content.ts`)
4. ✅ Documentation (`docs/CASE_STUDY_GUIDE.md`)

### Medium Priority (Do Next)
5. Reusable components (`components/case-studies/`)
6. Custom hooks (`hooks/useCaseStudy.ts`)
7. Case study README templates

### Low Priority (Nice to Have)
8. Dynamic routing refactor
9. Validation utilities
10. Case study generator script

---

## File Structure Summary

```
types/
  case-study.ts                    # Type definitions

lib/
  case-study-images.ts             # Image path utilities
  validate-case-study.ts           # Validation (future)

data/
  case-studies.ts                  # List metadata (existing)
  case-studies-content.ts          # Full content (new)

components/
  case-studies/
    CaseStudyLayout.tsx            # Layout wrapper
    CaseStudyHero.tsx              # Hero section
    CaseStudyOverview.tsx          # Overview section
    CaseStudyChallenge.tsx         # Challenge section
    CaseStudyApproach.tsx          # Approach section
    CaseStudyGallery.tsx           # Gallery section
    CaseStudyResults.tsx           # Results section
    CaseStudyImage.tsx             # Image wrapper

hooks/
  useCaseStudy.ts                  # Case study hooks

docs/
  CASE_STUDY_GUIDE.md             # How-to guide
  CASE_STUDY_REFACTORING.md       # Refactoring plan (created)
  CASE_STUDY_IMAGES.md            # Image guidelines

public/images/case-studies/
  [id]/
    hero/                         # Hero images
    thumb/                        # Thumbnail images
    approach/                     # Approach section images
    gallery/                      # Gallery images
    feature/                      # Feature images
    full/                         # Full-bleed images
    README.md                     # Image requirements

scripts/
  create-case-study.ts            # Case study generator (future)

app/case-studies/
  [id]/
    page.tsx                      # Dynamic route (future)
  # OR keep individual pages using shared components
```

---

## Expected Impact

**Before:**
- 900+ lines of duplicated code
- Hardcoded paths
- No type safety
- 2-3 hours to add new case study

**After:**
- ~200 lines per case study (using components)
- Type-safe paths
- Full type safety
- 30 minutes to add new case study

---

## Questions to Consider

1. **Dynamic routing vs. individual pages?**
   - Dynamic: Single component, automatic routing
   - Individual: More control, easier to customize per case study

2. **Content storage:**
   - TypeScript files (current plan)
   - JSON files
   - CMS (future)

3. **Image optimization:**
   - Manual optimization
   - Automated pipeline
   - On-the-fly optimization

4. **Variant support:**
   - How to handle case-study-specific variants (gold accent, etc.)
   - Should variants be part of type system?


# Case Study Refactoring Plan

## Current Problems

1. **450+ lines of duplicated code** per case study page
2. **Hardcoded image paths** scattered throughout (not using new folder structure)
3. **No type safety** for case study content structure
4. **Duplicate useEffect hooks** for scroll effects and animations
5. **No reusable components** - all sections duplicated in JSX
6. **No centralized content** - all text/content hardcoded in components
7. **Difficult to add new case studies** - must copy/paste entire page and modify manually

## Proposed Solutions

### 1. Type Definitions (`types/case-study.ts`)

Create comprehensive TypeScript interfaces for:
- Case study metadata (hero, overview, challenge, approach, results)
- Image references using the new folder structure
- Section content types
- Variant types (e.g., gold accent for Remoria)

**Benefits:**
- Type safety across the codebase
- Auto-completion in editors
- Compile-time error checking
- Self-documenting code

### 2. Image Path Utility (`lib/case-study-images.ts`)

Create utility functions that use the new folder structure:
```typescript
getCaseStudyImage(caseStudyId: string, type: 'hero' | 'thumb' | 'gallery' | 'approach' | 'feature' | 'full', filename: string)
```

**Benefits:**
- Centralized path management
- Type-safe image references
- Easy to update paths in one place
- Uses new organized folder structure

### 3. Case Study Data Structure (`data/case-studies-content.ts`)

Move all content out of JSX into structured data:
- Hero content (title, tagline, subtitle, image)
- Overview (meta items, description, intent)
- Challenge (quote, text, criteria)
- Approach (text, tools, systems, modules)
- Deliverables
- Gallery images
- Results

**Benefits:**
- Content separated from presentation
- Easy to edit content without touching components
- Can be migrated to CMS later
- Consistent structure across case studies

### 4. Reusable Components (`components/case-studies/`)

Create component library:
- `CaseStudyLayout.tsx` - Wrapper with header, footer, animations
- `CaseStudyHero.tsx` - Hero section
- `CaseStudyOverview.tsx` - Overview section
- `CaseStudyChallenge.tsx` - Challenge section
- `CaseStudyApproach.tsx` - Approach section
- `CaseStudyGallery.tsx` - Gallery section
- `CaseStudyResults.tsx` - Results section
- `CaseStudyImage.tsx` - Optimized image wrapper

**Benefits:**
- DRY principle (Don't Repeat Yourself)
- Consistent styling and behavior
- Easier maintenance
- Single source of truth for sections

### 5. Custom Hooks (`hooks/useCaseStudy.ts`)

Extract common logic:
- `useCaseStudyAnimations()` - Scroll effects, reveal animations
- `useCaseStudyData(id)` - Fetch case study content

**Benefits:**
- Reusable logic
- Cleaner component code
- Easier testing

### 6. Documentation (`docs/CASE_STUDY_GUIDE.md`)

Create guide for:
- How to add a new case study
- Folder structure for images
- Content structure requirements
- Component usage examples

**Benefits:**
- Onboarding new developers
- Consistency across case studies
- Reference for structure

## Folder Structure After Refactoring

```
data/
  case-studies.ts              # List metadata (existing)
  case-studies-content.ts      # Full content for each case study (new)

types/
  case-study.ts                # Type definitions (new)

lib/
  case-study-images.ts         # Image path utilities (new)

components/
  case-studies/
    CaseStudyLayout.tsx        # Layout wrapper (new)
    CaseStudyHero.tsx          # Hero section (new)
    CaseStudyOverview.tsx      # Overview section (new)
    CaseStudyChallenge.tsx     # Challenge section (new)
    CaseStudyApproach.tsx      # Approach section (new)
    CaseStudyGallery.tsx       # Gallery section (new)
    CaseStudyResults.tsx       # Results section (new)
    CaseStudyImage.tsx         # Image wrapper (new)

hooks/
  useCaseStudy.ts              # Case study hooks (new)

app/case-studies/
  [id]/
    page.tsx                   # Dynamic route (simplified, uses components)
```

## Migration Strategy

### Phase 1: Foundation
1. Create type definitions
2. Create image path utility
3. Document new structure

### Phase 2: Data Extraction
1. Extract content from ai-sports/page.tsx → data structure
2. Extract content from remoria/page.tsx → data structure
3. Verify all content is captured

### Phase 3: Component Creation
1. Create CaseStudyLayout component
2. Create individual section components (one at a time)
3. Test each component in isolation

### Phase 4: Integration
1. Refactor ai-sports/page.tsx to use new components
2. Refactor remoria/page.tsx to use new components
3. Verify functionality matches original

### Phase 5: Optimization
1. Add TypeScript strict mode checks
2. Add error boundaries for missing content
3. Add loading states if needed
4. Performance optimization

## Expected Outcomes

- **90% reduction in code duplication** (from ~900 lines to ~200 lines per case study)
- **Type-safe** case study content
- **Consistent** structure across all case studies
- **Easy to add** new case studies (copy folder structure, add data, done)
- **Maintainable** - changes to components affect all case studies
- **Scalable** - can add 10+ case studies without code bloat

## Next Steps

1. Review and approve this plan
2. Start with Phase 1 (types and utilities)
3. Iterate through phases
4. Document as we go


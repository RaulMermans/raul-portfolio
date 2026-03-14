# Code Review Command

## Purpose
Perform a deep PR-style review of code changes or specified files.

## Instructions

When this command is invoked, perform a comprehensive code review:

### 1. Identify Scope

If reviewing staged/unstaged changes:
```bash
git diff --stat
git diff
```

If reviewing specific files, read those files directly.

### 2. Review Checklist

Evaluate the code against these criteria:

#### Code Quality
- [ ] Clear, descriptive variable and function names
- [ ] Appropriate code organization and structure
- [ ] No unnecessary complexity or over-engineering
- [ ] DRY principle followed (no excessive duplication)
- [ ] Single responsibility principle for functions/components

#### Security
- [ ] No hardcoded secrets, API keys, or credentials
- [ ] User inputs are validated and sanitized
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities in rendered content
- [ ] Proper authentication/authorization checks
- [ ] Sensitive data not logged or exposed

#### Performance
- [ ] No obvious N+1 queries or inefficient loops
- [ ] Appropriate use of memoization where beneficial
- [ ] No memory leaks (proper cleanup of subscriptions/listeners)
- [ ] Lazy loading used where appropriate
- [ ] Images optimized and properly sized

#### React/Next.js Specific
- [ ] Proper use of hooks (dependencies, rules of hooks)
- [ ] No unnecessary re-renders
- [ ] Appropriate component splitting
- [ ] Server vs client components used correctly
- [ ] Metadata and SEO properly handled

#### TypeScript
- [ ] Proper type definitions (no excessive `any`)
- [ ] Null/undefined handled appropriately
- [ ] Interfaces/types are well-defined

#### Style & Consistency
- [ ] Follows project conventions
- [ ] Consistent with existing codebase patterns
- [ ] CSS modules used appropriately
- [ ] Responsive design considered

#### Error Handling
- [ ] Errors caught and handled gracefully
- [ ] User-friendly error messages
- [ ] Edge cases considered

### 3. Output Format

```markdown
## Code Review Summary

**Files Reviewed:** [list files]
**Overall Assessment:** [APPROVE / REQUEST CHANGES / COMMENT]

---

### Critical Issues (Must Fix)
[Issues that block merging]

### Warnings (Should Fix)
[Issues that should be addressed but aren't blockers]

### Suggestions (Nice to Have)
[Optional improvements]

### Positive Observations
[What's done well - reinforce good practices]

---

### File-by-File Breakdown

#### `filename.tsx`
- Line X: [Issue/Comment]
- Line Y: [Issue/Comment]

---

### Summary
[2-3 sentence overall summary with recommended next steps]
```

### 4. Review Tone

- Be constructive, not critical
- Explain the "why" behind suggestions
- Acknowledge good patterns
- Prioritize issues by severity
- Provide code examples for fixes when helpful

## Trigger Phrases
- "review my code"
- "review this PR"
- "check my changes"
- "/review"

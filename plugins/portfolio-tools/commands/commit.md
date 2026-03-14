# Smart Commit Command

## Purpose
Analyze changes, generate a conventional commit message, and offer to commit.

## Instructions

When this command is invoked, follow this workflow:

### 1. Analyze Current State

```bash
# Check what's changed
git status

# See staged changes
git diff --cached

# See unstaged changes
git diff

# Get context from recent commits
git log --oneline -5
```

### 2. Categorize Changes

Determine the commit type based on changes:

| Type | Description | Emoji |
|------|-------------|-------|
| `feat` | New feature | ✨ |
| `fix` | Bug fix | 🐛 |
| `docs` | Documentation only | 📝 |
| `style` | Formatting, no code change | 🎨 |
| `refactor` | Code restructuring | ♻️ |
| `perf` | Performance improvement | ⚡ |
| `test` | Adding/fixing tests | ✅ |
| `build` | Build system/dependencies | 📦 |
| `ci` | CI configuration | 👷 |
| `chore` | Maintenance tasks | 🔧 |
| `revert` | Reverting changes | ⏪ |
| `security` | Security fix | 🔒 |

### 3. Generate Commit Message

Follow Conventional Commits format:

```
<emoji> <type>(<scope>): <short description>

<body - what and why, not how>

<footer - breaking changes, issue refs>
```

**Rules:**
- Subject line max 72 characters
- Use imperative mood ("Add" not "Added")
- Don't end subject with period
- Body explains motivation for change
- Reference issues if applicable

### 4. Present to User

```markdown
## Proposed Commit

**Files to commit:**
- [list of files]

**Commit message:**
```
<emoji> <type>(<scope>): <description>

<body>
```

---

**Options:**
1. ✅ Commit with this message
2. ✏️ Edit the message
3. ➕ Stage more files first
4. ❌ Cancel

What would you like to do?
```

### 5. Execute Commit

If user approves:
```bash
# Stage files if needed
git add <files>

# Commit with the message
git commit -m "<message>"

# Show result
git log -1
```

### 6. Offer Next Steps

After successful commit:
```markdown
## Commit Successful!

**Next steps:**
- `git push` - Push to remote
- Continue working on more changes
- `/review` - Review before pushing
```

## Safety Checks

Before committing, verify:
- [ ] No secrets or credentials in diff
- [ ] No `.env` files being committed
- [ ] No `node_modules` or build artifacts
- [ ] No large binary files
- [ ] No debug/console.log statements (warn only)

If issues found, warn user before proceeding.

## Examples

**Single feature:**
```
✨ feat(contact): add form validation feedback

Add real-time validation messages to contact form fields.
Users now see immediate feedback when entering invalid email
or leaving required fields empty.
```

**Bug fix:**
```
🐛 fix(nav): resolve mobile menu not closing on route change

The mobile navigation menu remained open when clicking internal
links. Added useEffect cleanup to close menu on path change.

Fixes #42
```

**Multiple related changes:**
```
🎨 style(components): standardize button component styling

- Unify padding and border-radius across all button variants
- Add consistent hover/focus states
- Update disabled state styling for better accessibility
```

## Trigger Phrases
- "commit my changes"
- "smart commit"
- "/commit"

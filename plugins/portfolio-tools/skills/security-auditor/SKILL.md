# Security Auditor Skill

## Metadata
```yaml
name: security-auditor
version: 1.0.0
type: skill
trigger: automatic
priority: critical
```

## Description
Automatically monitors code for security vulnerabilities and sensitive data exposure. Activates whenever code involving credentials, user input, or security-sensitive operations is written or modified.

## Auto-Trigger Conditions

This skill activates automatically when detecting:

### Credential Patterns
- API keys: `api_key`, `apiKey`, `API_KEY`, `sk-`, `pk_`
- Passwords: `password`, `passwd`, `pwd`, `secret`
- Tokens: `token`, `bearer`, `jwt`, `auth`
- Connection strings: `mongodb://`, `postgres://`, `mysql://`
- AWS: `AKIA`, `aws_access_key`, `aws_secret`
- Private keys: `-----BEGIN`, `PRIVATE KEY`

### Dangerous Operations
- `eval()`, `Function()` constructor
- `dangerouslySetInnerHTML`
- `innerHTML` assignments
- SQL string concatenation
- Shell command execution with user input
- `fs.readFile`/`fs.writeFile` with user-provided paths

### User Input Handling
- Form submissions without validation
- URL parameters used directly
- Request body data without sanitization
- File uploads without type checking

## Response Protocol

When triggered, immediately:

### 1. STOP and Alert

```
⚠️ SECURITY ALERT ⚠️

I detected a potential security concern in your code:

**Issue:** [Description]
**Location:** [File:Line]
**Severity:** [CRITICAL / HIGH / MEDIUM / LOW]
**Risk:** [What could go wrong]
```

### 2. Provide Context

Explain why this is a security concern:
- What attack vector it enables
- Real-world examples of exploitation
- Compliance implications (GDPR, PCI-DSS, etc.)

### 3. Offer Secure Alternative

```typescript
// ❌ Insecure (what was written)
const apiKey = "sk-1234567890abcdef";

// ✅ Secure (recommended)
const apiKey = process.env.API_KEY;
```

### 4. Verification Steps

Suggest how to verify the fix:
- Environment variable check
- .gitignore verification
- Secret scanning tools

## Security Checks Reference

### Environment Variables
```typescript
// ✅ Good
const key = process.env.SECRET_KEY;

// ❌ Bad
const key = "hardcoded-secret-value";
```

### Input Validation
```typescript
// ✅ Good - Zod validation
const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
});

// ❌ Bad - No validation
const { email, name } = req.body;
```

### SQL Queries
```typescript
// ✅ Good - Parameterized
const result = await db.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]
);

// ❌ Bad - String concatenation
const result = await db.query(
  `SELECT * FROM users WHERE id = ${userId}`
);
```

### HTML Rendering
```tsx
// ✅ Good - React auto-escapes
<div>{userContent}</div>

// ❌ Bad - XSS vulnerability
<div dangerouslySetInnerHTML={{ __html: userContent }} />
```

### File Operations
```typescript
// ✅ Good - Validated path
const safePath = path.join(UPLOAD_DIR, path.basename(filename));

// ❌ Bad - Path traversal
const unsafePath = path.join(UPLOAD_DIR, userProvidedPath);
```

## Files to Always Check

When reviewing portfolio project:
- `app/api/**/*.ts` - API routes
- `.env*` files - Should be in .gitignore
- `next.config.js` - Security headers
- `middleware.ts` - Auth/security middleware
- Any file handling form submissions

## Severity Levels

| Level | Description | Action |
|-------|-------------|--------|
| CRITICAL | Immediate exploitation risk | Block commit, require fix |
| HIGH | Significant vulnerability | Strong warning, recommend fix |
| MEDIUM | Potential risk | Warning, suggest improvement |
| LOW | Best practice violation | Informational note |

## Integration Notes

- Works alongside other skills
- Takes precedence over style/formatting concerns
- Logs all detections for audit trail
- Can be temporarily muted with `// security-ignore: <reason>`

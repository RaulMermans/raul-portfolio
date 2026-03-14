# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

1. **Do NOT open a public GitHub issue** for security vulnerabilities
2. **Email**: Send details to [raulmermans@gmail.com] with subject "Security Vulnerability Report"
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 7 days
- **Resolution Timeline**: Depends on severity; critical issues prioritized

### Scope

This policy applies to:
- The main portfolio website
- API endpoints
- Contact form functionality

### Out of Scope

- Third-party services (Vercel, Resend, etc.)
- Social engineering attacks
- Denial of service attacks

## Security Best Practices

This project follows security best practices:

- Input validation and sanitization
- Rate limiting on API endpoints
- Security headers (CSP, X-Frame-Options, etc.)
- Environment variable protection
- No secrets in source code

## Acknowledgments

We appreciate responsible disclosure and will acknowledge security researchers who report valid vulnerabilities (with permission).

# Security Policy

This repository contains the source code for a static portfolio website.

The project does not require a backend server, database, or runtime API secrets in the public source tree. Deployment credentials are managed through GitHub Secrets and should never be committed to the repository.

## Supported Scope

Security reports should relate to this repository or its deployment workflow.

Relevant areas include:

- Exposed credentials or API keys
- Misconfigured GitHub Actions workflows
- Unsafe deployment configuration
- Accidental publication of private files
- Supply-chain or dependency issues
- Public asset or metadata leaks that could expose private information

Out of scope:

- Generic spam sent through public contact links
- Social engineering attempts outside this repository
- Issues requiring access to private accounts, credentials, or infrastructure
- Automated scanner noise without a reproducible risk

## Secrets Policy

No secrets should be committed to this repository.

Do not commit:

- API keys
- Passwords
- Access tokens
- Private keys
- `.env` files with real values
- SFTP credentials
- Provider credentials
- Personal machine paths or private deployment shortcuts

The only environment reference that should be committed is `.env.example`, and it must contain placeholders only.

## Deployment Credentials

The site deploys through GitHub Actions to the configured IONOS environment.

Deployment credentials must live only in GitHub Secrets.

Expected deployment secret names:

```txt
SFTP_HOST
SFTP_USER
SFTP_PASSWORD
SFTP_PORT
SFTP_REMOTE_PATH
```

Secret names may appear in workflow files. Secret values must never appear in source code, documentation, commit messages, screenshots, logs, or issue comments.

## If a Secret Is Exposed

Treat any exposed credential as compromised, even if it was visible only briefly.

Immediate response:

1. Revoke or rotate the credential at the provider.
2. Remove the credential from the current working tree.
3. Check provider logs for unauthorized usage.
4. Remove unused GitHub Actions secrets.
5. Run a secret scan before making the repository public again.

Recommended local scan:

```bash
gitleaks detect --source . --verbose --redact
```

Use `--redact` to avoid printing secret values in terminal output.

If the secret appears in Git history, the credential must still be considered compromised even after the file is edited. A Git history rewrite may be considered after the credential has already been revoked.

## Reporting a Vulnerability

If you find a vulnerability, please report it through the public contact channel listed on the portfolio website:

[raulmermans.com](https://www.raulmermans.com)

Please include:

- A concise description of the issue
- Affected file, workflow, or page
- Steps to reproduce, if applicable
- Potential impact
- Suggested remediation, if known

Do not include active secrets, passwords, or private credentials in the report.

## Public Contact Information

The site may include public contact information by design.

Public contact information is not considered a secret. However, private credentials, provider tokens, deployment values, and local environment files must never be committed.

## Dependency Hygiene

Before major public releases, run:

```bash
npm audit
npm run lint
npm run type-check
npm run build
```

Dependency updates should preserve the static export and GitHub Actions deployment workflow.

## Deployment Safety

The deployment workflow should remain limited to pushes to `main`.

Any change to deployment behavior should be reviewed carefully before merging, especially changes involving:

- GitHub Actions permissions
- SFTP configuration
- Secret handling
- Build output paths
- Remote deployment paths
- Branch triggers

## Current Architecture

This project is currently intended to operate as:

```txt
push to main → GitHub Actions → static build → IONOS deployment
```

Security decisions should preserve that model unless the deployment architecture is intentionally changed.

# Deployment

This portfolio is deployed as a static Next.js export to IONOS Hosting via GitHub Actions.

## Overview

- Build command: `npm run build`
- Output directory: `out/`
- Hosting target: IONOS static hosting
- Deploy transport: SFTP from GitHub Actions
- Workflow: `.github/workflows/deploy.yml`

The workflow runs on pushes to `main` and can also be started manually from the GitHub Actions tab.

## Required GitHub Secrets

Configure these in GitHub under **Settings > Secrets and variables > Actions**:

- `SFTP_SERVER`
- `SFTP_USERNAME`
- `SFTP_PASSWORD`
- `SFTP_PORT`

The workflow also sets:

- `NEXT_PUBLIC_SITE_URL=https://www.raulmermans.com`

## Static Export Notes

The site is configured with `output: 'export'` in `next.config.js`.

Because this is a static export, server runtime features such as Next.js API routes and middleware are not part of the deployed IONOS build. The contact flow currently uses a static-safe `mailto:` fallback instead of a server-side contact endpoint.

## Local Preflight

Run these before pushing deployment changes:

```bash
npm ci
npm run lint
npm run type-check
npm run build
```

After `npm run build`, confirm that `out/` exists.

## Deployment

Push to `main`:

```bash
git push origin main
```

GitHub Actions will install dependencies, build the static export, verify `out/`, and upload the contents of `out/` to the configured IONOS SFTP target.

## Troubleshooting

If deployment fails:

- Check that all required SFTP secrets exist in GitHub Actions.
- Confirm the IONOS SFTP host, username, password, and port are current.
- Confirm `npm run build` creates `out/` locally.
- Check whether IONOS blocks SFTP connections from GitHub Actions runner IPs.
- Review the failed GitHub Actions step logs for the exact command or upload error.

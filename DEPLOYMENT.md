# Deployment

This portfolio deploys only after the `CI` workflow succeeds for a push to `main`.

The GitHub Actions workflow builds the static Next.js export and uploads the
generated `out/` directory to the configured IONOS destination via SFTP.

Deployment credentials are stored in GitHub Secrets and are not committed to
the repository.

## Overview

- Build command: `npm run build`
- Output directory: `out/`
- Hosting target: IONOS static hosting
- Deploy transport: SFTP from GitHub Actions
- Workflow: `.github/workflows/deploy.yml`

The deployment workflow is triggered by that successful CI run and checks out
the exact verified commit SHA. Pull requests never receive deployment secrets.

## Required GitHub Secrets

Configure these in GitHub under **Settings > Secrets and variables > Actions**:

- `SFTP_HOST`
- `SFTP_USER`
- `SFTP_PASSWORD`
- `SFTP_PORT`
- `SFTP_REMOTE_PATH`

## Static Export Notes

The site is configured with `output: 'export'` in `next.config.js`.

Because this is a static export, server runtime features such as Next.js API
routes and middleware are not part of the deployed IONOS build. The contact
flow currently uses a static-safe `mailto:` fallback instead of a server-side
contact endpoint.

## Local Preflight

Run these before pushing deployment changes:

```bash
npm ci
npm run lint
npm run type-check
npm run build
npm run verify:export
npm run verify:canonical
```

After `npm run build`, confirm that `out/` exists.

## Deployment

Push to `main`:

```bash
git push origin main
```

GitHub Actions will run quality and browser checks first, then build the static
export, verify `out/`, upload it, and confirm the deployed fingerprint.

Local/private deployment helper scripts are intentionally ignored.

Do not include real server paths, local machine paths, usernames, passwords,
host values, or SFTP destinations.

## Troubleshooting

If deployment fails:

- Check that all required SFTP secrets exist in GitHub Actions.
- Confirm the IONOS SFTP host, username, password, and port are current.
- Confirm `npm run build` creates `out/` locally.
- Check whether IONOS blocks SFTP connections from GitHub Actions runner IPs.
- Review the failed GitHub Actions step logs for the exact command or upload error.

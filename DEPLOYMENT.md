# Deployment

This portfolio deploys from pushes to `main`.

The deployment model is intentionally simple:

```txt
push to main → GitHub Actions → static build → IONOS deployment
```

GitHub Actions builds the static Next.js export and uploads the generated `out/` directory to the configured IONOS destination through SFTP.

## Deployment Flow

1. Changes are committed and pushed to `main`.
2. GitHub Actions starts the deployment workflow.
3. Dependencies are installed.
4. The static build is generated.
5. The workflow checks that the `out/` directory exists.
6. The contents of `out/` are uploaded to IONOS through SFTP.

## Source Branch

Deployment is triggered only from:

```txt
main
```

Do not change the deployment branch unless the hosting setup is intentionally changed.

## Build Output

The project is configured as a static export.

Expected output directory:

```txt
out/
```

The deployment workflow should fail if the `out/` directory is missing after build.

## Required GitHub Secrets

Deployment credentials are stored in GitHub Secrets.

Expected secret names:

```txt
SFTP_HOST
SFTP_USER
SFTP_PASSWORD
SFTP_PORT
SFTP_REMOTE_PATH
```

Secret names may appear in workflow files. Secret values must never be committed to the repository.

## Local Checks Before Push

Run these before pushing to `main`:

```bash
npm run lint
npm run type-check
npm run build
```

If these pass locally, commit and push:

```bash
git add .
git commit -m "Describe the change"
git push origin main
```

The push to `main` will trigger deployment automatically.

## Private Deployment Helpers

Local deployment or commit helper scripts should not be tracked.

Ignored examples:

```txt
deploy.sh
scripts/*.local.sh
.env.deploy
```

These files may exist locally, but they should not be committed.

## Do Not Commit

Never commit:

- SFTP credentials
- API keys
- Provider tokens
- Passwords
- Private server paths
- Personal machine paths
- `.env` files with real values
- Screenshots showing credentials
- Logs containing secrets

## GitHub Actions Notes

The deployment workflow should remain narrow and predictable.

Recommended properties:

- Triggered only by pushes to `main`
- Uses GitHub Secrets for credentials
- Builds the static site before upload
- Uploads only the generated `out/` directory
- Does not expose secret values in logs
- Does not run on arbitrary pull requests from untrusted forks

## Rollback

To rollback, revert the problematic commit and push to `main`:

```bash
git revert <commit-hash>
git push origin main
```

GitHub Actions will deploy the reverted version.

If GitHub Actions fails, inspect:

```txt
GitHub → Repository → Actions → Deploy to IONOS
```

Check the failed step and fix the smallest possible issue.

## Troubleshooting

### Build succeeds locally but deployment fails

Check:

- GitHub Actions logs
- IONOS SFTP credentials
- `SFTP_REMOTE_PATH`
- Whether `out/` exists after build
- Whether the SFTP destination is reachable

### Build fails before upload

Run locally:

```bash
npm run lint
npm run type-check
npm run build
```

Fix the build before pushing again.

### Site does not update after push

Check:

1. The latest GitHub Actions run completed successfully.
2. The workflow deployed from `main`.
3. The correct `out/` directory was uploaded.
4. IONOS is serving the expected destination path.
5. Browser/CDN cache is not showing an old version.

## Current Architecture

```txt
Next.js static export
        ↓
GitHub Actions on main
        ↓
out/ directory
        ↓
SFTP upload
        ↓
IONOS-hosted website
```

This deployment model should remain unchanged unless the hosting strategy is intentionally redesigned.

#!/bin/bash
set -e

# Public-safe deployment helper.
# This project deploys when changes are pushed to the configured GitHub branch.
# IONOS deployment is handled externally through GitHub Actions and GitHub Secrets.
# Do not commit private deployment scripts, credentials, hostnames, server paths, or machine paths.

npm run lint
npm run type-check
npm run build

git status

echo "If checks pass, commit and push to the deployment branch."
echo "GitHub Actions should deploy the static export to IONOS."

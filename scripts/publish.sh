#!/usr/bin/env bash
set -euo pipefail

next_version="$1"

echo "Publishing @zoemejor/react-fontawesome-light version ${next_version}"

# Make sure we are on a recent npm that supports trusted publishing + provenance
npm install -g npm@latest

# Update the version in package.json and package-lock.json for this build only
# --no-git-tag-version avoids creating a git tag here (semantic-release handles tags)
npm version "${next_version}" --no-git-tag-version

# Fresh install and build
npm ci
npm run build

# Publish via Trusted Publishing (OIDC) with provenance
npm publish --access public --provenance

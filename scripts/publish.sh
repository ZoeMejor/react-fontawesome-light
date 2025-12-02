#!/usr/bin/env bash
set -euo pipefail

next_version="$1"

echo "Publishing @zoemejor/react-fontawesome-light version ${next_version}"

# Ensure dependencies and build are up to date
npm ci
npm run build

# Publish to npm using the NPM_TOKEN from CI
npm publish --access public
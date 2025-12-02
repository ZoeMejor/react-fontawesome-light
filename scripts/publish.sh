#!/usr/bin/env bash
set -euo pipefail

next_version="$1"

echo "Publishing @zoemejor/react-fontawesome-light version ${next_version}"

# 1) Update package.json (and package-lock.json) to the version semantic-release chose
#    --no-git-tag-version means "do not create a git tag", semantic-release does that.
npm version "${next_version}" --no-git-tag-version

# 2) Install dependencies and build the package
npm ci
npm run build

# 3) Publish to npm using the NODE_AUTH_TOKEN / NPM_TOKEN provided in CI
npm publish --access public

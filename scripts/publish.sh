#!/usr/bin/env bash
set -euo pipefail

next_version="$1"

echo "Publishing @zoemejor/react-fontawesome-light version ${next_version}"

npm ci
npm run build

npm publish --access public

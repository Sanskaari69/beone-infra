#!/usr/bin/env bash
# Builds the static site for GitHub Pages and publishes it to the gh-pages branch of `origin`.
#   bash scripts/deploy-pages.sh
# Needs: a git remote named origin, and push access. Set Pages to "Deploy from a branch: gh-pages / (root)".
set -euo pipefail
cd "$(dirname "$0")/.."

REPO_NAME="$(basename -s .git "$(git remote get-url origin)")"
ORIGIN="$(git remote get-url origin)"
NAME="$(git config user.name)"
EMAIL="$(git config user.email)"

NEXT_PUBLIC_BASE_PATH="/${REPO_NAME}" npm run build
touch out/.nojekyll

cd out
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.name="$NAME" -c user.email="$EMAIL" commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git push -f "$ORIGIN" gh-pages
echo "Published. Site: https://$(git -C .. remote get-url origin | sed -E 's#.*github.com[:/]([^/]+)/.*#\1#').github.io/${REPO_NAME}/"

#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build -- --base=.

# navigate into the build output directory
cd dist

echo > .nojekyll

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:seksan2538/shiba-book-shop.git master:gh-pages

cd -

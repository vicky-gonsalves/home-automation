#!/bin/bash

if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
if [ "$TRAVIS_BRANCH" == "development" ]; then
git config --global user.email 'travis@travis-ci.org'
git config --global user.name 'Travis'
git remote set-branches --add origin master
git fetch
git reset --hard
git checkout master
git merge --ff-only "$TRAVIS_COMMIT"
git push git+ssh://git@github.com/${TRAVIS_REPO_SLUG}.git master
echo "Merging development into master"
else
echo "Skipping merge into master because branch is not 'development'"
fi
else
echo "Skipping merge because it's a pull request"
fi


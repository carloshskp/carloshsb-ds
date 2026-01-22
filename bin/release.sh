#!/bin/bash

# Get the current version from package.json
VERSION=$(cat package.json | jq -r '.version')

# Add the package.json to the commit
git add package.json

# Commit the change
git commit -m "Bump version to $VERSION"

# Tag the release
git tag -a "v$VERSION" -m "Bump version to $VERSION"

# Push the release
git push --tags

# Push the commit
git push

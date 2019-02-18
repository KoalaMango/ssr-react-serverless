#!/bin/bash

# Create a new branch and push to origin
git checkout master
git checkout -b $1
git add patterns/
git commit -m "New pattern introduced - $1"
git push origin $1
git checkout feature/pattern-builder-poc
git branch -D $1

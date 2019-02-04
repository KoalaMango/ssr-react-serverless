#!/bin/bash

# Create a new branch and push to origin
git checkout -b $1
git add patterns/
git commit -m "Added new pattern - $1"
git push origin $1
git checkout master
git branch -D $1

#!/bin/bash

# Create a new branch and push to origin
git checkout -b feature/$1
git add patterns/
git commit -m "Added new pattern - $1"
git push origin feature/$1
git checkout master
git branch -D feature/$1

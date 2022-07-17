#!/bin/bash

DEPLOYPATH=$1

npm run build
cp main.js "$DEPLOYPATH"
echo "Moved main.js to $DEPLOYPATH"
cp manifest.json "$DEPLOYPATH"
echo "Moved manifest.json to $DEPLOYPATH"
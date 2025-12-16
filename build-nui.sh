#!/bin/bash

echo "====================================="
echo "Building qb-vehicleshop NUI"
echo "====================================="
echo ""

cd html

echo "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install dependencies!"
    exit 1
fi

echo ""
echo "Building NUI..."
npm run build
if [ $? -ne 0 ]; then
    echo "Failed to build NUI!"
    exit 1
fi

echo ""
echo "====================================="
echo "NUI build completed successfully!"
echo "====================================="

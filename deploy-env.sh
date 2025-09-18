#!/bin/bash

echo "Setting up Vercel environment variables..."

# Read environment variables from .env.local and set them in Vercel
while IFS='=' read -r key value
do
  if [[ ! $key =~ ^# && $key != "" ]]; then
    echo "Setting $key..."
    echo "$value" | vercel env add "$key" production --force
  fi
done < .env.local

echo "Environment variables setup complete!"
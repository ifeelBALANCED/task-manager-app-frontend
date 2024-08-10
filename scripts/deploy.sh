#!/bin/bash

# Install dependencies
npm i -g pnpm
pnpm install --frozen-lockfile

# Build the project
pnpm run build

# Deploy to Vercel
vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
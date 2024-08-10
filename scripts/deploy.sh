#!/bin/bash

# Install dependencies and build
npm i -g pnpm
pnpm install --frozen-lockfile
pnpm run build

# Deploy to Vercel
npm install -g vercel
DEPLOYMENT_URL=$(VERCEL_ORG_ID=$VERCEL_ORG_ID VERCEL_PROJECT_ID=$VERCEL_PROJECT_ID vercel --confirm -t $VERCEL_TOKEN --scope $VERCEL_USER)
import { defineConfig, devices } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config()

const CI_ENABLED = process.env.VITE_CI === 'true'
const PORT = CI_ENABLED ? 4173 : 5173
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: CI_ENABLED,
  retries: CI_ENABLED ? 2 : 0,
  workers: CI_ENABLED ? 5 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
    testIdAttribute: 'data-testid',
    baseURL: BASE_URL,
    launchOptions: {
      headless: true,
    },
  },
  timeout: 120 * 1000,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: CI_ENABLED ? 'pnpm run build && pnpm run preview' : 'pnpm run dev',
    url: `http://localhost:${PORT}`,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
  },
})

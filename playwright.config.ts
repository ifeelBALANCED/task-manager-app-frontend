// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

const PORT = process.env.VITE_CI ? 4173 : 5173

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.VITE_CI,
  retries: process.env.VITE_CI ? 2 : 0,
  workers: process.env.VITE_CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    testIdAttribute: 'data-testid',
    baseURL: process.env.VITE_BASE_URL, // Use VITE_BASE_URL here
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
    command: process.env.VITE_CI ? 'pnpm run build && pnpm run preview' : 'pnpm run dev',
    url: `http://localhost:${PORT}`,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
  },
})

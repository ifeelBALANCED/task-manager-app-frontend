import { defineConfig, devices } from '@playwright/test'

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
    baseURL: 'https://task-manager-app-backend-7wv6.onrender.com',
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

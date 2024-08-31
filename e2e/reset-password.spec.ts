import { test } from '@playwright/test'
import { BASE_URL } from './config'

test.describe('Reset Password Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/reset-password`)
  })
})

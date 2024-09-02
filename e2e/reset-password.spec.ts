import { BASE_URL } from './config'
import { test } from './test.setup'

test.describe('Reset Password Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/reset-password`)
  })
})

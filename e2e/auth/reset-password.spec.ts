import { BASE_URL } from '../config'
import { test } from '../test.setup'

// @TODO: Write tests for the reset password form
test.describe('Reset Password Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/reset-password`)
  })
})

import { expect } from '@playwright/test'
import { BASE_URL } from '../config'
import { test } from '../test.setup'

test.describe('Forgot Password Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/forgot-password`)
  })

  test('should render the forgot password form with all required fields visible', async ({
    page,
  }) => {
    await test.step('Check if forgot password form is visible', async () => {
      await expect(page.getByTestId('forgot-password-form')).toBeVisible()
    })

    const requiredElements = ['email-input', 'forgot-password-submit-button']

    for (const element of requiredElements) {
      await test.step(`Check if ${element} is visible`, async () => {
        await expect(page.getByTestId(element)).toBeVisible()
      })
    }
  })

  test('should display "Email is required" error message when email input is empty', async ({
    page,
  }) => {
    await test.step('Clear email input', async () => {
      await page.getByTestId('email-input').press('Space')
      await page.getByTestId('email-input').press('Backspace')
    })

    await test.step('Check for "Email is required" error message', async () => {
      await expect(page.getByTestId('email-input')).toHaveAttribute(
        'aria-errormessage',
        'Email is required',
      )
    })
  })

  test('should display "invalid email format" error message for invalid email format', async ({
    page,
  }) => {
    await test.step('Fill invalid email format', async () => {
      await page.getByTestId('email-input').fill('invalid-email')
    })

    await test.step('Check for "Invalid email format" error message', async () => {
      await expect(page.getByTestId('email-input')).toHaveAttribute(
        'aria-errormessage',
        'Invalid email format',
      )
    })
  })

  test('should display that email does not exist', async ({ page, request }) => {
    const notFoundEmailDto = {
      email: 'test231312312@gmail.com',
    }

    await test.step('Fill non-existent email', async () => {
      await page.getByTestId('email-input').fill(notFoundEmailDto.email)
    })

    await test.step('Submit forgot password request', async () => {
      const forgotPasswordQuery = await request.post('/forgot-password/', {
        data: notFoundEmailDto,
      })
      await page.getByTestId('forgot-password-submit-button').click()
      expect(forgotPasswordQuery.status()).toEqual(400)
    })
  })

  test('should successfully submit the form with valid email', async ({ page, request }) => {
    const validEmailDto = {
      email: 'test@mantine.dev',
    }

    await test.step('Fill valid email', async () => {
      await page.getByTestId('email-input').fill(validEmailDto.email)
    })

    await test.step('Submit forgot password request', async () => {
      const forgotQuery = await request.post('/forgot-password/', {
        data: validEmailDto,
      })
      await page.getByTestId('forgot-password-submit-button').click()
      await expect(page.getByTestId('loading-overlay')).toBeVisible()
      expect(forgotQuery.ok()).toBeTruthy()
    })
  })

  test('should redirect back to login on button click', async ({ page }) => {
    await test.step('Click back to login link', async () => {
      await page.getByTestId('back-to-login-link').click()
    })

    await test.step('Check if redirected to login page', async () => {
      expect(page.url()).toBe(`${BASE_URL}/`)
    })
  })
})

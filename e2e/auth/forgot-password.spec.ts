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
    await expect(page.getByTestId('forgot-password-form')).toBeVisible()

    const requiredElements = ['email-input', 'forgot-password-submit-button']

    for (const element of requiredElements) {
      await expect(page.getByTestId(element)).toBeVisible()
    }
  })

  test('should display "Email is required" error message when email input is empty', async ({
    page,
  }) => {
    await page.getByTestId('email-input').press('Space')
    await page.getByTestId('email-input').press('Backspace')
    await expect(page.getByTestId('email-input')).toHaveAttribute(
      'aria-errormessage',
      'Email is required',
    )
  })

  test('should display "invalid email format" error message for invalid email format', async ({
    page,
  }) => {
    await page.getByTestId('email-input').fill('invalid-email')
    await expect(page.getByTestId('email-input')).toHaveAttribute(
      'aria-errormessage',
      'Invalid email format',
    )
  })

  test('should display that email does not exist', async ({ page, request }) => {
    const notFoundEmailDto = {
      email: 'test231312312@gmail.com',
    }

    await page.getByTestId('email-input').fill(notFoundEmailDto.email)
    const forgotPasswordQuery = await request.post('/forgot-password/', { data: notFoundEmailDto })
    await page.getByTestId('forgot-password-submit-button').click()

    expect(forgotPasswordQuery.status()).toEqual(400)
  })

  test('should successfully submit the form with valid email', async ({ page, request }) => {
    const validEmailDto = {
      email: 'test@mantine.dev',
    }

    await page.getByTestId('email-input').fill(validEmailDto.email)
    const forgotQuery = await request.post('/forgot-password/', {
      data: validEmailDto,
    })
    await page.getByTestId('forgot-password-submit-button').click()
    await expect(page.getByTestId('loading-overlay')).toBeVisible()

    expect(forgotQuery.ok()).toBeTruthy()
  })

  test('should redirect back to login on button click', async ({ page }) => {
    await page.getByTestId('back-to-login-link').click()
    expect(page.url()).toBe(`${BASE_URL}/`)
  })
})

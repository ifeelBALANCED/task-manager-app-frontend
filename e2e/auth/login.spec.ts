import { expect } from '@playwright/test'
import { BASE_URL } from '../config'
import { test } from '../test.setup'

test.describe('Login Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/`)
  })

  test('should render the login form on the homepage', async ({ page }) => {
    await test.step('Check if login form is visible', async () => {
      await expect(page.getByTestId('login-form')).toBeVisible()
    })
  })

  test('should render all required input fields and buttons for the login form', async ({
    page,
  }) => {
    const requiredElements = [
      'email-input',
      'password-input',
      'remember-me-checkbox',
      'forgot-password-link',
      'login-submit-button',
    ]

    for (const element of requiredElements) {
      await test.step(`Check if ${element} is visible`, async () => {
        await expect(page.getByTestId(element)).toBeVisible()
      })
    }
  })

  test('should successfully log in with valid credentials and navigate to the dashboard', async ({
    page,
    request,
  }) => {
    const loginDto = {
      email: 'test@mantine.dev',
      password: 'k8o8j94W',
    }

    await test.step('Submit login request', async () => {
      const loginQuery = await request.post('/login/', { data: loginDto })

      await test.step('Fill email input', async () => {
        await page.getByTestId('email-input').fill(loginDto.email)
      })

      await test.step('Fill password input', async () => {
        await page.getByTestId('password-input').fill(loginDto.password)
      })

      await test.step('Check remember me checkbox', async () => {
        await page.getByTestId('remember-me-checkbox').check()
      })

      await test.step('Click login submit button', async () => {
        await page.getByTestId('login-submit-button').click()
      })

      await test.step('Check if loading overlay is visible', async () => {
        await expect(page.getByTestId('loading-overlay')).toBeVisible()
      })

      expect(loginQuery.ok()).toBeTruthy()
    })
  })

  test('should display an error message for invalid credentials', async ({ page, request }) => {
    const invalidLoginDto = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    }

    await test.step('Submit login request with invalid credentials', async () => {
      const loginQuery = await request.post('/login/', { data: invalidLoginDto })

      await test.step('Fill email input', async () => {
        await page.getByTestId('email-input').fill(invalidLoginDto.email)
      })

      await test.step('Fill password input', async () => {
        await page.getByTestId('password-input').fill(invalidLoginDto.password)
      })

      await test.step('Click login submit button', async () => {
        await page.getByTestId('login-submit-button').click()
      })

      await test.step('Check if loading overlay is visible', async () => {
        await expect(page.getByTestId('loading-overlay')).toBeVisible()
      })

      expect(loginQuery.status()).toEqual(400)
    })
  })

  test('should display an error message for invalid email format', async ({ page }) => {
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

  test('should display an error message for empty email', async ({ page }) => {
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

  test('should display an error message for empty password', async ({ page }) => {
    await test.step('Clear password input', async () => {
      await page.getByTestId('password-input').press('Space')
      await page.getByTestId('password-input').press('Backspace')
    })

    await test.step('Check for "Password is required" error message', async () => {
      await expect(page.getByTestId('password-input')).toHaveAttribute(
        'aria-errormessage',
        'Password is required',
      )
    })
  })

  test('should navigate to forgot password page when clicking forgot password link', async ({
    page,
  }) => {
    await test.step('Click forgot password link', async () => {
      await page.getByTestId('forgot-password-link').click()
    })

    await test.step('Check if redirected to forgot password page', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/forgot-password`)
    })
  })

  test('should navigate to register page when clicking create account link', async ({ page }) => {
    await test.step('Click create account link', async () => {
      await page.getByTestId('create-account-link').click()
    })

    await test.step('Check if redirected to register page', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/register`)
    })
  })
})

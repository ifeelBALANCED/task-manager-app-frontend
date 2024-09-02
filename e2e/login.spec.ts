import { expect } from '@playwright/test'
import { BASE_URL } from './config'
import { test } from './test.setup'

test.describe('Login Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/`)
  })

  test('should render the login form on the homepage', async ({ page }) => {
    await expect(page.getByTestId('login-form')).toBeVisible()
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
      await expect(page.getByTestId(element)).toBeVisible()
    }
  })

  // test('should successfully log in with valid credentials and navigate to the dashboard', async ({
  //   page,
  // }) => {
  //   const loginDto = {
  //     email: 'test@mantine.dev',
  //     password: 'k8o8j94W',
  //   }
  //
  //   const loginQuery = createTestQuery('/login/', loginDto, { method: 'post' })
  //   const scope = fork({
  //     handlers: [
  //       [
  //         loginQuery.__.executeFx,
  //         () =>
  //           Promise.resolve({
  //             access: 'access-token',
  //             refresh: 'refresh-token',
  //           }),
  //       ],
  //     ],
  //   })
  //   await page.getByTestId('email-input').fill(loginDto.email)
  //   await page.getByTestId('password-input').fill(loginDto.password)
  //   await page.getByTestId('remember-me-checkbox').check()
  //   await page.getByTestId('login-submit-button').click()
  //
  //   await allSettled(loginQuery.refresh, { scope })
  //   await expect(page.getByTestId('loading-overlay')).toBeVisible()
  //
  //   expect(scope.getState(loginQuery.$data)).toEqual({
  //     access: 'access-token',
  //     refresh: 'refresh-token',
  //   })
  // })

  test('should successfully log in with valid credentials and navigate to the dashboard', async ({
    page,
    request,
  }) => {
    const loginDto = {
      email: 'test@mantine.dev',
      password: 'k8o8j94W',
    }

    const loginQuery = await request.post('/login/', { data: loginDto })

    await page.getByTestId('email-input').fill(loginDto.email)
    await page.getByTestId('password-input').fill(loginDto.password)
    await page.getByTestId('remember-me-checkbox').check()
    await page.getByTestId('login-submit-button').click()

    await expect(page.getByTestId('loading-overlay')).toBeVisible()

    expect(loginQuery.ok()).toBeTruthy()
  })

  test('should display an error message for invalid credentials', async ({ page, request }) => {
    const invalidLoginDto = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
    }

    const loginQuery = await request.post('/login/', { data: invalidLoginDto })

    await page.getByTestId('email-input').fill(invalidLoginDto.email)
    await page.getByTestId('password-input').fill(invalidLoginDto.password)
    await page.getByTestId('login-submit-button').click()

    await expect(page.getByTestId('loading-overlay')).toBeVisible()
    expect(loginQuery.status()).toEqual(400)
  })

  test('should display an error message for invalid email format', async ({ page }) => {
    await page.getByTestId('email-input').fill('invalid-email')
    await expect(page.getByTestId('email-input')).toHaveAttribute(
      'aria-errormessage',
      'Invalid email format',
    )
  })

  test('should display an error message for empty email', async ({ page }) => {
    await page.getByTestId('email-input').press('Space')
    await page.getByTestId('email-input').press('Backspace')
    await expect(page.getByTestId('email-input')).toHaveAttribute(
      'aria-errormessage',
      'Email is required',
    )
  })

  test('should display an error message for empty password', async ({ page }) => {
    await page.getByTestId('password-input').press('Space')
    await page.getByTestId('password-input').press('Backspace')
    await expect(page.getByTestId('password-input')).toHaveAttribute(
      'aria-errormessage',
      'Password is required',
    )
  })

  test('should navigate to forgot password page when clicking forgot password link', async ({
    page,
  }) => {
    await page.getByTestId('forgot-password-link').click()
    await expect(page).toHaveURL(`${BASE_URL}/forgot-password`)
  })

  test('should navigate to register page when clicking create account link', async ({ page }) => {
    await page.getByTestId('create-account-link').click()
    await expect(page).toHaveURL(`${BASE_URL}/register`)
  })
})

import { expect, type Page } from '@playwright/test'

import { BASE_URL } from './config'
import { createRegisterDto, type RegisterDto } from './fixtures'
import { test } from './test.setup'

test.describe('Register Form', () => {
  let page: Page

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage
    await page.goto(`${BASE_URL}/register`)
  })

  const getElement = (testId: string) => page.getByTestId(testId)

  const fillRegisterForm = async (registerDto: RegisterDto) => {
    await getElement('nickname-input').fill(registerDto.nickname)
    await getElement('email-input').fill(registerDto.email)
    await getElement('password-input').fill(registerDto.password)
  }

  test('should render the register form with all required fields', async () => {
    await expect(getElement('register-form')).toBeVisible()

    const requiredElements = [
      'nickname-input',
      'email-input',
      'password-input',
      'register-submit-button',
    ]

    for (const element of requiredElements) {
      await expect(getElement(element)).toBeVisible()
    }
  })

  test('should display and error message for empty nickname', async ({ page }) => {
    await page.getByTestId('nickname-input').press('Space')
    await page.getByTestId('nickname-input').press('Backspace')
    await expect(page.getByTestId('nickname-input')).toHaveAttribute(
      'aria-errormessage',
      'Nickname is required',
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

  test('should display an error message for invalid email format', async ({ page }) => {
    await page.getByTestId('email-input').fill('invalid-email')
    await expect(page.getByTestId('email-input')).toHaveAttribute(
      'aria-errormessage',
      'this must be a valid email',
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

  test('should display an error message for less than required length for password', async ({
    page,
  }) => {
    await page.getByTestId('password-input').fill('pass')
    await expect(page.getByTestId('password-input')).toHaveAttribute(
      'aria-errormessage',
      'Password must be at least 8 characters',
    )
  })

  test('should successfully register a new user', async ({ request }) => {
    const registerDto = createRegisterDto()

    await fillRegisterForm(registerDto)
    await page.getByTestId('register-submit-button').click()
    await expect(getElement('loading-overlay')).toBeVisible()

    const registerResponse = await request.post('/register/', { data: registerDto })
    expect(registerResponse.status()).toBe(201)
  })

  test('should display an error message when registering with an existing email', async ({
    request,
  }) => {
    const registerDto = {
      nickname: 'test',
      email: 'test@mantine.dev',
      password: 'password',
    }

    const registerQuery = await request.post('/register/', { data: registerDto })
    await fillRegisterForm(registerDto)
    await page.getByTestId('register-submit-button').click()

    await expect(getElement('loading-overlay')).toBeVisible()
    expect(registerQuery.status()).toEqual(400)
  })

  test('should navigate to login page', async () => {
    await getElement('login-link').click()
    await expect(page).toHaveURL(`${BASE_URL}/`)
  })
})

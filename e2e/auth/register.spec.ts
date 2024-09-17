import { expect, type Page } from '@playwright/test'
import { BASE_URL } from '../config'
import { createRegisterDto, type RegisterDto } from '../fixtures'
import { test } from '../test.setup'

test.describe('Register Form', () => {
  let page: Page

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage
    await page.goto(`${BASE_URL}/register`)
  })

  const getElement = (testId: string) => page.getByTestId(testId)

  const fillRegisterForm = async (registerDto: RegisterDto) => {
    await test.step('Fill nickname input', async () => {
      await getElement('nickname-input').fill(registerDto.nickname)
    })
    await test.step('Fill email input', async () => {
      await getElement('email-input').fill(registerDto.email)
    })
    await test.step('Fill password input', async () => {
      await getElement('password-input').fill(registerDto.password)
    })
  }

  test('should render the register form with all required fields', async () => {
    await test.step('Check if register form is visible', async () => {
      await expect(getElement('register-form')).toBeVisible()
    })

    const requiredElements = [
      'nickname-input',
      'email-input',
      'password-input',
      'register-submit-button',
    ]

    for (const element of requiredElements) {
      await test.step(`Check if ${element} is visible`, async () => {
        await expect(getElement(element)).toBeVisible()
      })
    }
  })

  test('should display an error message for empty nickname', async ({ page }) => {
    await test.step('Clear nickname input', async () => {
      await page.getByTestId('nickname-input').press('Space')
      await page.getByTestId('nickname-input').press('Backspace')
    })
    await test.step('Check for "Nickname is required" error message', async () => {
      await expect(page.getByTestId('nickname-input')).toHaveAttribute(
        'aria-errormessage',
        'Nickname is required',
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

  test('should display an error message for invalid email format', async ({ page }) => {
    await test.step('Fill invalid email format', async () => {
      await page.getByTestId('email-input').fill('invalid-email')
    })
    await test.step('Check for "Invalid email format" error message', async () => {
      await expect(page.getByTestId('email-input')).toHaveAttribute(
        'aria-errormessage',
        'this must be a valid email',
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

  test('should display an error message for less than required length for password', async ({
    page,
  }) => {
    await test.step('Fill short password', async () => {
      await page.getByTestId('password-input').fill('pass')
    })
    await test.step('Check for "Password must be at least 8 characters" error message', async () => {
      await expect(page.getByTestId('password-input')).toHaveAttribute(
        'aria-errormessage',
        'Password must be at least 8 characters',
      )
    })
  })

  test('should successfully register a new user', async ({ request }) => {
    const registerDto = createRegisterDto()

    await fillRegisterForm(registerDto)
    await test.step('Click register submit button', async () => {
      await page.getByTestId('register-submit-button').click()
    })
    await test.step('Check if loading overlay is visible', async () => {
      await expect(getElement('loading-overlay')).toBeVisible()
    })

    await test.step('Submit register request', async () => {
      const registerResponse = await request.post('/register/', { data: registerDto })
      expect(registerResponse.status()).toBe(201)
    })
  })

  test('should display an error message when registering with an existing email', async ({
    request,
  }) => {
    const registerDto = {
      nickname: 'test',
      email: 'test@mantine.dev',
      password: 'password',
    }

    await test.step('Submit register request with existing email', async () => {
      const registerQuery = await request.post('/register/', { data: registerDto })
      await fillRegisterForm(registerDto)
      await test.step('Click register submit button', async () => {
        await page.getByTestId('register-submit-button').click()
      })
      await test.step('Check if loading overlay is visible', async () => {
        await expect(getElement('loading-overlay')).toBeVisible()
      })
      expect(registerQuery.status()).toEqual(400)
    })
  })

  test('should navigate to login page', async () => {
    await test.step('Click login link', async () => {
      await getElement('login-link').click()
    })
    await test.step('Check if redirected to login page', async () => {
      await expect(page).toHaveURL(`${BASE_URL}/`)
    })
  })
})

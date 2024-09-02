import { expect } from '@playwright/test'
import { BASE_URL } from './config'
import { test } from './test.setup'

test.describe('Logging out', () => {
  let accessToken: string | null = null
  let refreshToken: string | null = null

  test.beforeEach(async ({ page, request }) => {
    await page.goto(`${BASE_URL}/`)

    const loginDto = {
      email: 'test@mantine.dev',
      password: 'k8o8j94W',
    }

    await test.step('Login and store tokens', async () => {
      const loginResponse = await request.post('/login/', { data: loginDto })
      expect(loginResponse.ok()).toBeTruthy()

      const tokens = await loginResponse.json()
      accessToken = tokens.access
      refreshToken = tokens.refresh

      expect(accessToken).toBeDefined()
      expect(refreshToken).toBeDefined()

      await page.evaluate(({ access, refresh }) => {
        localStorage.setItem('access', access)
        localStorage.setItem('refresh', refresh)
      }, tokens)
    })

    await test.step('Fill login form and submit', async () => {
      await page.getByTestId('email-input').fill(loginDto.email)
      await page.getByTestId('password-input').fill(loginDto.password)
      await page.getByTestId('login-submit-button').click()
    })

    await test.step('Wait for dashboard to load fully', async () => {
      await page.waitForURL(`${BASE_URL}/dashboard`)
      await page.waitForLoadState('load')
      expect(page.url()).toBe(`${BASE_URL}/dashboard`)

      const userQuery = await request.get('/me/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      expect(userQuery.ok()).toBeTruthy()

      const userData = await userQuery.json()

      await page.evaluate((user) => {
        localStorage.setItem('user', JSON.stringify(user))
      }, userData)
    })
  })

  test('should successfully log out', async ({ page, request }) => {
    await test.step('Verify dashboard is fully loaded', async () => {
      await page.waitForURL(`${BASE_URL}/dashboard`)
      await page.waitForLoadState('load')
      expect(page.url()).toBe(`${BASE_URL}/dashboard`)
    })

    await test.step('Perform logout', async () => {
      expect(refreshToken).toBeTruthy()
      expect(accessToken).toBeTruthy()

      const logoutQuery = await request.post('/logout/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { refresh: refreshToken },
      })

      await page.getByTestId('user-menu').click()
      await page.getByTestId('logout-menu-item').click()

      expect(logoutQuery.status()).toBe(200)
      await page.waitForURL(`${BASE_URL}/`)
      expect(page.url()).toBe(`${BASE_URL}/`)
    })
  })
})

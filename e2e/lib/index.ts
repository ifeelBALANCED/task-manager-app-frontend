import { APIRequestContext, expect, Page } from '@playwright/test'
import { BASE_URL } from '../config'
import { test } from '../test.setup'

interface LoginResult {
  accessToken: string
  refreshToken: string
}

export const loginUser = async (page: Page, request: APIRequestContext): Promise<LoginResult> => {
  let accessToken = ''
  let refreshToken = ''

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

  return { accessToken, refreshToken }
}

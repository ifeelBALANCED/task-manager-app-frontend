import { expect } from '@playwright/test'
import { BASE_URL } from '../config'
import { loginUser } from '../lib'
import { test } from '../test.setup'

let accessToken: string | null = null
let refreshToken: string | null = null

test.beforeEach(async ({ page, request }) => {
  await loginUser(page, request).then((pair) => {
    accessToken = pair.accessToken
    refreshToken = pair.refreshToken
  })
})

test.describe('Logging out', () => {
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

      await test.step('Click user menu', async () => {
        await page.getByTestId('user-menu').click()
      })

      await test.step('Click logout menu item', async () => {
        await page.getByTestId('logout-menu-item').click()
      })

      expect(logoutQuery.status()).toBe(200)
      await page.waitForURL(`${BASE_URL}/`)
      expect(page.url()).toBe(`${BASE_URL}/`)
    })
  })
})

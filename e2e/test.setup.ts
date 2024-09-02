import { APIRequestContext, request, test as baseTest } from '@playwright/test'
import * as dotenv from 'dotenv'

dotenv.config()

type TestOptions = {
  request: APIRequestContext
}

export const test = baseTest.extend<TestOptions>({
  request: async ({}, use) => {
    const context = await request.newContext({
      baseURL: process.env.VITE_API_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    })
    await use(context)
  },
})

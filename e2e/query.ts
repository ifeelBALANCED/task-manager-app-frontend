import { createQuery } from '@farfetched/core'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { createEffect } from 'effector'
import { apiTest } from './config'

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

interface CreateTestQueryOptions extends AxiosRequestConfig {
  method?: HttpMethod
}

export const createTestQuery = <TData = unknown>(
  url: string,
  body?: unknown,
  options: CreateTestQueryOptions = {},
) => {
  const { method = 'get', ...axiosOptions } = options

  const queryFx = createEffect(async (): Promise<TData> => {
    try {
      const config: AxiosRequestConfig = {
        ...axiosOptions,
        method,
        url,
      }

      if (body && ['post', 'put', 'patch'].includes(method)) {
        config.data = body
      }

      const response = await apiTest.request<TData>(config)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(`API request failed: ${error.message}`)
      }
      throw error
    }
  })

  return createQuery({
    handler: queryFx,
  })
}

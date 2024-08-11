import { createQuery } from '@farfetched/core'
import { AxiosResponse } from 'axios'
import { createEffect } from 'effector'
import { getLocalRefreshToken, instance, saveTokens } from '@/shared/api'
import type { User } from '../types'
import { getLogoutUrl, getMeUrl } from './contracts'

export const getMeQuery = createQuery({
  handler: async (): Promise<User> => {
    const response: AxiosResponse<User> = await instance.get<User, AxiosResponse<User>>(getMeUrl())
    return response.data
  },
})

export const clearCredentialsFx = createEffect(() => {
  window.localStorage.clear()
})

export const logoutQuery = createQuery({
  handler: async () => {
    const response = await instance.post(getLogoutUrl(), { refresh: getLocalRefreshToken() })

    return response.data
  },
})

export const saveCredentialsFx = createEffect<{ access: string; refresh: string }, void, Error>(
  (params) => {
    saveTokens(params.access, params.refresh)
  },
)

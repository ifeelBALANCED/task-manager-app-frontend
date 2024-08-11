import axios, { AxiosError } from 'axios'
import axiosRetry from 'axios-retry'
// eslint-disable-next-line boundaries/element-types
import { env } from '@/shared/config'

export const instance = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosRetry(instance, {
  retries: 1,
})

export const setToken = (token: string | null): void => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const saveTokens = (access: string, refresh: string): void => {
  setToken(access)
  localStorage.setItem('access', access)
  localStorage.setItem('refresh', refresh)
}

export const ABORT_URL = '/token/'
export const LOGIN_URL = '/login/'

export const getLocalAccessToken = () => {
  return window.localStorage.getItem('access')
}

export const getLocalRefreshToken = () => {
  return window.localStorage.getItem('refresh')
}

export const refreshToken = () => {
  return instance.post<{
    access: string
  }>('/refresh/', {
    refresh: getLocalRefreshToken(),
  })
}

instance.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config
    if (err.response) {
      // Access Token was expired
      if (
        err.response.status === 401 &&
        !originalConfig._retry &&
        // Don't refresh for login request or when hitting the abort URL
        originalConfig.url !== LOGIN_URL &&
        originalConfig.url !== ABORT_URL
      ) {
        originalConfig._retry = true
        try {
          const rs = await refreshToken()
          const { access } = rs.data
          window.localStorage.setItem('access', access)

          instance.defaults.headers.common.Authorization = `Bearer ${access}`
          return instance(originalConfig)
        } catch (_error) {
          if ((_error as AxiosError).response && (_error as AxiosError).response?.data) {
            return Promise.reject((_error as AxiosError)?.response?.data)
          }
          return Promise.reject(_error)
        }
      }
      // refresh token was expired
      if (
        (err.response.status === 403 || originalConfig.url === ABORT_URL) &&
        originalConfig.url !== LOGIN_URL &&
        err.response.data
      ) {
        console.warn(err.response.data)
        localStorage.removeItem('profile')

        return Promise.reject(err.response.data)
      }
    }
    return Promise.reject(err)
  },
)

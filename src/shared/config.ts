type EnvType = {
  NODE_ENV: string
  CI: boolean
  API_URL: string
  BASE_URL: string
}

export const env: EnvType = {
  NODE_ENV: import.meta.env.VITE_NODE_ENV,
  BASE_URL: import.meta.env.VITE_BASE_URL,
  CI: import.meta.env.VITE_CI === 'true',
  API_URL: import.meta.env.VITE_API_URL,
}

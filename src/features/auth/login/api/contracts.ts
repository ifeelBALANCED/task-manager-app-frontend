import { obj, str } from '@withease/contracts'
import { env } from '@/shared/config'

export const getLoginUrl = () => `${env.API_URL}/login/`

export const LoginDTO = obj({
  access: str,
  refresh: str,
})

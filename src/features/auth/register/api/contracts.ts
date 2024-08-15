import { obj, str } from '@withease/contracts'
import { env } from '@/shared/config'

export const getRegisterUrl = () => `${env.API_URL}/register/`

export const RegisterDTO = obj({
  nickname: str,
  email: str,
})

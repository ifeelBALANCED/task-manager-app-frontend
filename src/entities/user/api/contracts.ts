import { obj, str } from '@withease/contracts'
import { env } from '@/shared/config'

export const getMeUrl = () => `${env.API_URL}/user/me/`
export const getLogoutUrl = () => `${env.API_URL}/logout/`

export const UserDTO = obj({
  email: str,
  nickname: str,
  profile_picture: str,
  date_joined: str,
})

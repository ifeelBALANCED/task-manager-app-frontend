import { env } from '@/shared/config'

export const getResetPasswordUrl = () => `${env.API_URL}/reset-password/`

import { env } from '@/shared/config'

export const getForgotPasswordUrl = () => `${env.API_URL}/forgot-password/`

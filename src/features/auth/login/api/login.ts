import { createJsonQuery, declareParams } from '@farfetched/core'
import type { LoginFormValues } from '../types'
import { getLoginUrl, LoginDTO } from './contracts'

export const loginQuery = createJsonQuery({
  params: declareParams<LoginFormValues>(),
  request: {
    method: 'POST',
    url: getLoginUrl(),
  },
  response: {
    contract: LoginDTO,
  },
})

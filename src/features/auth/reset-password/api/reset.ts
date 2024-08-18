import { createJsonQuery, declareParams } from '@farfetched/core'
import { obj, str } from '@withease/contracts'
import { ResetPasswordQueryValues } from '../types'
import { getResetPasswordUrl } from './contracts'

export const resetPasswordQuery = createJsonQuery({
  params: declareParams<ResetPasswordQueryValues>(),
  request: {
    url: getResetPasswordUrl(),
    method: 'POST',
    body: (resetPasswordQuery) => ({
      new_password: resetPasswordQuery.new_password,
      uid: resetPasswordQuery.uid,
      token: resetPasswordQuery.token,
    }),
  },
  response: {
    contract: obj({ detail: str }),
  },
})

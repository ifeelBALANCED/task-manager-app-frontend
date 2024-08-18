import { createJsonQuery, declareParams } from '@farfetched/core'
import { obj, str } from '@withease/contracts'
import { ForgotPasswordFormValues } from '../types'
import { getForgotPasswordUrl } from './contracts'

export const forgotPasswordQuery = createJsonQuery({
  params: declareParams<ForgotPasswordFormValues>(),
  request: {
    url: getForgotPasswordUrl(),
    method: 'POST',
    body: (formValues) => ({ email: formValues.email }),
  },
  response: {
    contract: obj({
      detail: str,
    }),
  },
})

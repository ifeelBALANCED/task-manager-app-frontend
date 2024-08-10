import { createJsonQuery, declareParams } from '@farfetched/core'
import type { RegisterFormValues } from '../types'
import { getRegisterUrl, RegisterDTO } from './contracts'

export const registerQuery = createJsonQuery({
  params: declareParams<RegisterFormValues>(),
  request: {
    url: getRegisterUrl(),
    method: 'POST',
    body: (formValues) => formValues,
  },
  response: {
    contract: RegisterDTO,
  },
})

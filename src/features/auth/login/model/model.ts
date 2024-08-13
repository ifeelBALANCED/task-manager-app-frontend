import { InvalidDataError } from '@farfetched/core'
import { sample } from 'effector'
import { spread } from 'patronum'
import { userApi, userModel } from '@/entities/user'
import { redirectFx } from '@/shared/lib/router'
import { serializeErrors } from '@/shared/lib/serialize-errors'
import { loginQuery } from '../api'
import { loginForm } from './form'

export const $loginPending = loginQuery.$pending

sample({
  clock: loginForm.submit,
  source: loginForm.$values,
  filter: loginForm.$isValid,
  target: loginQuery.start,
})

sample({
  clock: loginQuery.finished.success,
  target: [loginForm.reset, redirectFx.prepend(() => '/dashboard'), userApi.getMeQuery.start],
})

sample({
  clock: loginQuery.finished.success,
  filter: (tokens) => Boolean(tokens?.result?.access && tokens?.result?.refresh),
  fn: (tokenPair) => ({
    token: tokenPair?.result?.access ?? '',
    refresh: tokenPair?.result?.refresh ?? '',
    credentials: tokenPair?.result,
  }),
  target: spread({
    token: userModel.$access,
    refresh: userModel.$refresh,
    credentials: userApi.saveCredentialsFx,
  }),
})

sample({
  clock: loginQuery.$error,
  filter: loginQuery.$failed,
  fn: (error) => serializeErrors((error as InvalidDataError)?.response),
  target: loginForm.addErrors,
})

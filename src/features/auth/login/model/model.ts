import { sample } from 'effector'
import { redirectFx } from '@/shared/lib/router'
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
  clock: loginQuery.$succeeded,
  target: redirectFx.prepend(() => '/dashboard'),
})

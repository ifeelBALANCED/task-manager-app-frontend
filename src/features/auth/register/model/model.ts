import { sample } from 'effector'
import { redirectFx } from '@/shared/lib/router'
import { registerQuery } from '../api'
import { registerForm } from './form'

export const $registerPending = registerQuery.$pending

sample({
  clock: registerForm.submit,
  source: registerForm.$values,
  filter: registerForm.$isValid,
  target: registerQuery.start,
})

sample({
  clock: [registerQuery.$succeeded, registerQuery.$finished, registerQuery.$data],
  target: redirectFx.prepend(() => '/'),
})

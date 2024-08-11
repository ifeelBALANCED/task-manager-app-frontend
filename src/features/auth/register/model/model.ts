import { InvalidDataError } from '@farfetched/core'
import { sample } from 'effector'
import { redirectFx } from '@/shared/lib/router'
import { serializeErrors } from '@/shared/lib/serialize-errors'
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
  clock: registerQuery.finished.success,
  target: [registerForm.reset, redirectFx.prepend(() => '/')],
})

sample({
  clock: registerQuery.$error,
  filter: registerQuery.$failed,
  fn: (error) => serializeErrors((error as InvalidDataError)?.response),
  target: registerForm.addErrors,
})

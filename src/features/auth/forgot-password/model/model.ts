import { InvalidDataError } from '@farfetched/core'
import { createEvent, createStore, sample } from 'effector'
import { serializeErrors } from '@/shared/lib/serialize-errors'
import { forgotPasswordQuery } from '../api'
import { forgotPasswordForm } from './form'

export const messageToEmailSent = createEvent<boolean>('sent message to email')
export const $forgotPasswordPending = forgotPasswordQuery.$pending
export const $isEmailSent = createStore(false)

sample({
  clock: forgotPasswordForm.submit,
  source: forgotPasswordForm.$values,
  filter: forgotPasswordForm.$isValid,
  target: forgotPasswordQuery.start,
})

sample({
  clock: messageToEmailSent,
  target: $isEmailSent,
})

sample({
  clock: forgotPasswordQuery.$succeeded,
  target: $isEmailSent,
})

sample({
  clock: forgotPasswordQuery.finished.failure,
  target: messageToEmailSent.prepend(() => false),
})

sample({
  clock: forgotPasswordQuery.$error,
  filter: forgotPasswordQuery.$failed,
  fn: (error) => {
    return serializeErrors((error as InvalidDataError)?.response)
  },
  target: forgotPasswordForm.addErrors,
})

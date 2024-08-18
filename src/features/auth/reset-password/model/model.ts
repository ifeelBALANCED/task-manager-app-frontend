import { InvalidDataError } from '@farfetched/core'
import { sample } from 'effector'
import { createGate } from 'effector-react'
import { redirectFx } from '@/shared/lib/router'
import { serializeErrors } from '@/shared/lib/serialize-errors'
import { resetPasswordQuery } from '../api'
import { resetPasswordForm } from './form'

export const $resetPasswordPending = resetPasswordQuery.$pending
export const ResetPasswordGate = createGate<{ uid: string; token: string }>(
  'gate for reset password',
)

sample({
  clock: resetPasswordForm.submit,
  source: {
    form: resetPasswordForm.$values,
    queryParams: ResetPasswordGate.state,
  },
  filter: resetPasswordForm.$isValid,
  fn: ({ form, queryParams }) => ({
    ...queryParams,
    new_password: form.new_password,
  }),
  target: resetPasswordQuery.start,
})

sample({
  clock: resetPasswordQuery.finished.success,
  target: [resetPasswordForm.reset, redirectFx.prepend(() => '/')],
})

sample({
  clock: resetPasswordQuery.$error,
  filter: resetPasswordQuery.$failed,
  fn: (error) => {
    return serializeErrors((error as InvalidDataError)?.response)
  },
  target: resetPasswordForm.addErrors,
})

sample({
  clock: resetPasswordForm.$values.updates,
  filter: resetPasswordForm.$values.map(
    ({ new_password, confirm_new_password }) =>
      Boolean(new_password) &&
      Boolean(confirm_new_password) &&
      new_password !== confirm_new_password,
  ),
  fn: () => ({
    rule: 'confirm_new_password',
    errorText: 'Passwords do not match',
  }),
  target: resetPasswordForm.fields.confirm_new_password.addError,
})

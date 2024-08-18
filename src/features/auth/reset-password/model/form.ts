import { createForm } from 'effector-forms'
import * as yup from 'yup'
import { createRule } from '@/shared/lib/create-rule'
import type { ResetPasswordFormValues } from '../types'

export const resetPasswordForm = createForm<ResetPasswordFormValues>({
  fields: {
    new_password: {
      init: '',
      rules: [
        createRule({
          schema: yup
            .string()
            .required('Password is required')
            .min(2, 'Password must be at least 2 characters'),
          name: 'password',
        }),
      ],
    },
    confirm_new_password: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().required('Confirm Password is required'),
          name: 'confirmPassword',
        }),
      ],
    },
  },
  validateOn: ['submit', 'change'],
})

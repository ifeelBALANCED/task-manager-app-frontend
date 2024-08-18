import { createForm } from 'effector-forms'
import * as yup from 'yup'
import { createRule } from '@/shared/lib/create-rule'
import type { ForgotPasswordFormValues } from '../types'

export const forgotPasswordForm = createForm<ForgotPasswordFormValues>({
  fields: {
    email: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().email('Invalid email format').required('Email is required'),
          name: 'email',
        }),
      ],
    },
  },
  validateOn: ['submit', 'change'],
})

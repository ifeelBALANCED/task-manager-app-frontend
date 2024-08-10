import { createForm } from 'effector-forms'
import * as yup from 'yup'
import { createRule } from '@/shared/lib/create-rule'
import type { LoginFormValues } from '../types'

export const loginForm = createForm<LoginFormValues>({
  fields: {
    email: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().required('Email is required'),
          name: 'required',
        }),
      ],
    },
    password: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().required('Password is required'),
          name: 'required',
        }),
      ],
    },
  },
  validateOn: ['submit', 'change'],
})

import { createForm } from 'effector-forms'
import * as yup from 'yup'
import { createRule } from '@/shared/lib/create-rule'
import type { RegisterFormValues } from '../types'

export const registerForm = createForm<RegisterFormValues>({
  fields: {
    email: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().email().required('Email is required'),
          name: 'required',
        }),
      ],
    },
    nickname: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().required('Nickname is required'),
          name: 'required',
        }),
        createRule({
          schema: yup.string().max(30, 'Email must be less than 30 characters'),
          name: 'min-length-30',
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

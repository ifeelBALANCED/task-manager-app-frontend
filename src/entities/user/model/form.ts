import { createForm } from 'effector-forms'
import * as yup from 'yup'
import { createRule } from '@/shared/lib/create-rule'
import type { UserProfile } from '../types'

export const updateUserProfileForm = createForm<UserProfile>({
  fields: {
    nickname: {
      init: '',
      rules: [
        createRule({
          schema: yup
            .string()
            .max(20, 'Nickname must be less than 20 characters')
            .required('Nickname is required'),
          name: 'nickname',
        }),
      ],
    },
    password: {
      init: '',
      rules: [
        createRule({
          schema: yup
            .string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
          name: 'password',
        }),
      ],
    },
    confirm_password: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().required('Confirm Password is required'),
          name: 'confirm_password',
        }),
      ],
    },
  },
  validateOn: ['submit', 'change'],
})

import { createForm } from 'effector-forms'
import * as yup from 'yup'
import { createRule } from '@/shared/lib/create-rule'
import type { CreateBoardFormValues } from '../types'

export const createTaskBoardForm = createForm<CreateBoardFormValues>({
  fields: {
    name: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().required('Email is required'),
          name: 'required',
        }),
        createRule({
          schema: yup.string().max(50, 'Max length is 50'),
          name: 'max-length',
        }),
      ],
    },
    description: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().max(255, 'Max length is 255'),
          name: 'max-length',
        }),
      ],
    },
  },
  validateOn: ['submit', 'change'],
})

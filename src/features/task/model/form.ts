import { createForm } from 'effector-forms'
import * as yup from 'yup'
import { createRule } from '@/shared/lib/create-rule'
import type { CreateTaskFormValues, UpdateTaskFormValues } from '../types'

export const createTaskForm = createForm<CreateTaskFormValues>({
  fields: {
    name: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().required('Name is required'),
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

export const updateTaskForm = createForm<UpdateTaskFormValues>({
  fields: {
    name: {
      init: '',
      rules: [
        createRule({
          schema: yup.string().required('Name is required'),
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
    status: {
      init: 'TODO',
      rules: [
        createRule({
          schema: yup
            .string()
            .oneOf(['TODO', 'IN_PROGRESS', 'DONE', 'POSTPONED'], 'Invalid status'),
          name: 'status',
        }),
      ],
    },
  },
  validateOn: ['submit', 'change'],
})

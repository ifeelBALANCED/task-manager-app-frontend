import { createForm } from 'effector-forms'
import * as yup from 'yup'
import { TaskBoard } from '@/entities/task-board/types'
import { createRule } from '@/shared/lib/create-rule'
import type { CreateBoardFormValues } from '../types'

export const createTaskBoardForm = createForm<CreateBoardFormValues>({
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

export const updateTaskBoardForm = createForm<Pick<TaskBoard, 'name' | 'description'>>({
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

import { createJsonMutation, declareParams } from '@farfetched/core'
import { taskApi } from '@/entities/task'
import { userModel } from '@/entities/user'
import type { CreateTaskFormValues } from '../types'

export const createTaskMutation = createJsonMutation({
  params: declareParams<CreateTaskFormValues>(),
  request: {
    headers: {
      'Content-Type': 'application/json',
      source: userModel.$access,
      fn: (_, access) => ({ Authorization: `Bearer ${access}` }),
    },
    url: taskApi.getCreateNewTaskUrl(),
    method: 'POST',
    body: (formValues) => formValues,
  },
  response: { contract: taskApi.CreateTaskDTO },
})

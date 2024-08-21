import { createJsonMutation, declareParams } from '@farfetched/core'
import { taskBoardsApi } from '@/entities/task-board'
import { userModel } from '@/entities/user'
import type { CreateBoardFormValues } from '../types'

export const createTaskBoardMutation = createJsonMutation({
  params: declareParams<CreateBoardFormValues>(),
  request: {
    headers: {
      'Content-Type': 'application/json',
      source: userModel.$access,
      fn: (_, access) => ({ Authorization: `Bearer ${access}` }),
    },
    url: taskBoardsApi.getTaskBoardsUrl(),
    method: 'POST',
    body: (formValues) => formValues,
  },
  response: { contract: taskBoardsApi.CreateTaskBoardDTO },
})

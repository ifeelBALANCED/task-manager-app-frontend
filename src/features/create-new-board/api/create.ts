import { createJsonMutation, declareParams } from '@farfetched/core'
import { debug } from 'patronum'
import { taskBoardsApi } from '@/entities/task-board'
import { userModel } from '@/entities/user'
import type { CreateBoardFormValues } from '../types'
import { CreateTaskBoardDTO } from './contracts'

debug(userModel.$access)

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
  response: { contract: CreateTaskBoardDTO },
})

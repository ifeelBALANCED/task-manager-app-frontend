import { createMutation } from '@farfetched/core'
import { taskApi } from '@/entities/task'
import { instance } from '@/shared/api'
import type { UpdateTaskFormValues } from '../types'

export const updateTaskMutation = createMutation({
  handler: async ({ id, ...updateDto }: UpdateTaskFormValues & { id: string }) => {
    const response = await instance.patch(taskApi.getDeleteTaskUrl(id), updateDto)

    return response.data
  },
})

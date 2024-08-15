import { createMutation } from '@farfetched/core'
import { instance } from '@/shared/api'
import { getDeleteTaskUrl } from './contracts'

export const deleteTaskMutation = createMutation({
  handler: async ({ id }: { id: string }) => {
    await instance.delete(getDeleteTaskUrl(id))
  },
})

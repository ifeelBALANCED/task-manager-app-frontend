import { createQuery } from '@farfetched/core'
import { instance } from '@/shared/api'
import { env } from '@/shared/config'
import type { Dashboard } from './contracts'

export const getDashboardUrl = () => `${env.API_URL}/api/tasks/dashboard/`

export const getDashboardQuery = createQuery({
  handler: async (): Promise<Dashboard> => {
    const response = await instance.get<Dashboard>(getDashboardUrl())

    return response.data
  },
})

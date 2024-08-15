import { obj, str } from '@withease/contracts'
import { env } from '@/shared/config'

const BASE_TASK_URL = `${env.API_URL}/api/tasks/`

export const getCreateNewTaskUrl = () => BASE_TASK_URL

export const getDeleteTaskUrl = (id: string) => `${BASE_TASK_URL}${id}/`

export const CreateTaskDTO = obj({
  name: str,
  description: str,
})

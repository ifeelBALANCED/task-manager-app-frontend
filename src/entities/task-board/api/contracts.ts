import { arr, obj, str } from '@withease/contracts'
import { env } from '@/shared/config'

export const getTaskBoardsUrl = () => `${env.API_URL}/api/task-boards/`
export const getTaskBoardDetailsUrl = (boardId: string) =>
  `${env.API_URL}/api/task-boards/${boardId}/`

export const TaskBoard = obj({
  board_uuid: str,
  name: str,
  description: str,
})

export const TaskBoardsDTO = arr(TaskBoard)

export const CreateTaskBoardDTO = obj({
  name: str,
  description: str,
})

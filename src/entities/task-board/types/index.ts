import { arr, num, obj, or, str, UnContract, val } from '@withease/contracts'

export const TaskContract = obj({
  task_uuid: str,
  name: str,
  description: str,
  status: or(val('TODO'), val('IN_PROGRESS'), val('DONE'), val('POSTPONED')),
  created_at: str,
  updated_at: str,
  postponed_to: str,
})

export const TaskBoardContact = obj({
  board_uuid: str,
  name: str,
  description: str,
  task_count: num,
  done_task_count: num,
  created_at: str,
  updated_at: str,
  tasks: arr(TaskContract),
})

export const TaskBoardsContract = arr(TaskBoardContact)

export const UpdateTaskBoardContract = obj({
  board_uuid: str,
  name: str,
  description: str,
})

export type UpdateTaskBoard = UnContract<typeof UpdateTaskBoardContract>
export type Task = UnContract<typeof TaskContract>
export type TaskBoard = UnContract<typeof TaskBoardContact>
export type TaskBoards = {
  count: number
  next: string | null
  previous: string | null
  results: UnContract<typeof TaskBoardsContract>
}

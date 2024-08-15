export type Task = {
  task_uuid: string
  name: string
  description: string | null
  status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'POSTPONED'
  created_at: string
  updated_at: string
  postponed_to: string | null
}

export type TaskBoard = {
  board_uuid: string
  name: string
  description: string
  task_count: number
  done_task_count: number
  created_at: string
  updated_at: string
  tasks: Task[]
}

export type TaskBoards = Array<TaskBoard>

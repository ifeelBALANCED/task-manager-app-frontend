import { sample } from 'effector'
import { taskBoardsApi, taskBoardsModel } from '@/entities/task-board'
import { createModalApi } from '@/shared/lib/modal'
import { createTaskMutation } from '../api'
import { createTaskForm } from './form'

export const $createTaskPending = createTaskMutation.$pending
export const createTaskModalApi = createModalApi()

sample({
  clock: createTaskForm.submit,
  source: [createTaskForm.$values, taskBoardsModel.TaskBoardDetailsGate.state] as const,
  filter: createTaskForm.$isValid,
  fn: ([createTask, params]) => ({ ...createTask, task_board_uuid: params.boardId }),
  target: createTaskMutation.start,
})

sample({
  clock: createTaskModalApi.modalClosed,
  target: createTaskForm.reset,
})

sample({
  clock: createTaskMutation.finished.success,
  source: taskBoardsModel.TaskBoardDetailsGate.state,
  filter: (params) => Boolean(params.boardId),
  fn: (params) => ({ boardId: params.boardId }),
  target: [
    createTaskModalApi.modalClosed,
    taskBoardsApi.taskBoardDetailsQuery.start,
    createTaskForm.reset,
  ],
})

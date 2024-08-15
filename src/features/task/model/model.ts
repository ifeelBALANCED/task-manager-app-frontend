import { sample } from 'effector'
import { taskApi } from '@/entities/task'
import { taskBoardsApi, taskBoardsModel } from '@/entities/task-board'
import { createTaskMutation, updateTaskMutation } from '../api'

sample({
  clock: [
    taskApi.deleteTaskMutation.finished.success,
    updateTaskMutation.finished.success,
    createTaskMutation.finished.success,
    taskBoardsApi.updateTaskBoardsQuery.finished.success,
  ],
  source: taskBoardsModel.TaskBoardDetailsGate.state,
  filter: (params) => Boolean(params.boardId),
  fn: (params) => ({ boardId: params.boardId }),
  target: taskBoardsApi.taskBoardDetailsQuery.start,
})

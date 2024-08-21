import { sample } from 'effector'
import { taskBoardsApi, taskBoardsModel } from '@/entities/task-board'
import { createTaskBoardMutation } from '../api'

sample({
  clock: [
    taskBoardsModel.TaskBoardsGate.open,
    taskBoardsApi.deleteBoardDetailsQuery.finished.success,
    createTaskBoardMutation.finished.success,
  ],
  target: taskBoardsApi.taskBoardsQuery.start,
})

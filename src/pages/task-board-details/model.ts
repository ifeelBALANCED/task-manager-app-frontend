import { sample } from 'effector'
import { createNewTaskApi } from '@/features/task'
import { taskApi } from '@/entities/task'
import { taskBoardsApi, taskBoardsModel } from '@/entities/task-board'

sample({
  clock: [
    taskApi.deleteTaskMutation.finished.success,
    createNewTaskApi.updateTaskMutation.finished.success,
    createNewTaskApi.createTaskMutation.finished.success,
    taskBoardsApi.updateTaskBoardsQuery.finished.success,
  ],
  source: taskBoardsModel.TaskBoardDetailsGate.state,
  filter: (params) => Boolean(params.boardId),
  fn: (params) => ({ boardId: params.boardId }),
  target: taskBoardsApi.taskBoardDetailsQuery.start,
})

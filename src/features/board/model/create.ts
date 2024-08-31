import { sample } from 'effector'
import { taskBoardsApi, taskBoardsModel } from '@/entities/task-board'
import { createModalApi } from '@/shared/lib/modal'
import { createTaskBoardMutation } from '../api'
import { createTaskBoardForm } from './form'

export const $createTaskBoardPending = createTaskBoardMutation.$pending
export const createTaskBoardModalApi = createModalApi()

sample({
  clock: createTaskBoardForm.submit,
  source: createTaskBoardForm.$values,
  filter: createTaskBoardForm.$isValid,
  target: createTaskBoardMutation.start,
})

sample({
  clock: createTaskBoardModalApi.modalClosed,
  target: createTaskBoardForm.reset,
})

sample({
  clock: createTaskBoardMutation.finished.success,
  source: [
    taskBoardsModel.taskBoardsPagination.$activePage,
    taskBoardsModel.taskBoardsPagination.$itemsPerPage,
  ] as const,
  fn: ([page, pageSize]) => ({ page, pageSize }),
  target: [
    createTaskBoardModalApi.modalClosed,
    taskBoardsApi.taskBoardsQuery.start,
    createTaskBoardForm.reset,
  ],
})

import { createEvent, createStore, sample } from 'effector'
import { createNewTaskBoardModel } from '@/features/board'
import { taskBoardsApi, taskBoardsModel, taskBoardsTypes } from '@/entities/task-board'
import { createModalApi } from '@/shared/lib/modal'
import { updateTaskBoardForm } from './form'

export const $updateTaskBoardPending = taskBoardsApi.updateTaskBoardsQuery.$pending
export const updateTaskBoardModalApi = createModalApi()
export const $boardDetailsForEdit = createStore<Pick<
  taskBoardsTypes.Task,
  'name' | 'description'
> | null>(null)
export const boardDetailsForEditSelected = createEvent<Pick<
  taskBoardsTypes.Task,
  'name' | 'description'
> | null>('select board details for edit')

sample({
  clock: boardDetailsForEditSelected,
  target: $boardDetailsForEdit,
})

sample({
  clock: $boardDetailsForEdit,
  filter: (details) => details !== null,
  fn: (details) => ({ name: details?.name ?? '', description: details?.description ?? '' }),
  target: [updateTaskBoardModalApi.modalOpened, updateTaskBoardForm.setInitialForm],
})

sample({
  clock: updateTaskBoardModalApi.modalClosed,
  target: $boardDetailsForEdit.reinit,
})

sample({
  clock: createNewTaskBoardModel.updateTaskBoardForm.submit,
  source: [
    createNewTaskBoardModel.updateTaskBoardForm.$values,
    taskBoardsModel.TaskBoardDetailsGate.state,
  ] as const,
  filter: createNewTaskBoardModel.updateTaskBoardForm.$isValid,
  fn: ([form, { boardId }]) => ({
    ...form,
    board_uuid: boardId ?? '',
  }),
  target: taskBoardsApi.updateTaskBoardsQuery.start,
})

sample({
  clock: taskBoardsApi.updateTaskBoardsQuery.finished.success,
  target: [createNewTaskBoardModel.updateTaskBoardForm.reset, updateTaskBoardModalApi.modalClosed],
})

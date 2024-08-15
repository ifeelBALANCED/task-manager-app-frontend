import { createEvent, restore, sample } from 'effector'
import { taskBoardsTypes } from '@/entities/task-board'
import { createModalApi } from '@/shared/lib/modal'
import { updateTaskMutation } from '../api'
import { updateTaskForm } from './form'

export const updateTaskModalApi = createModalApi()
export const taskForEditSelected = createEvent<taskBoardsTypes.Task>('select task for edit')
export const $updateTaskPending = updateTaskMutation.$pending
export const $taskToEdit = restore<taskBoardsTypes.Task | null>(taskForEditSelected, null)

sample({
  clock: $taskToEdit,
  filter: (task) => task !== null,
  fn: (task) => ({
    name: task?.name ?? '',
    description: task?.description ?? '',
    status: task?.status ?? 'TODO',
  }),
  target: [updateTaskModalApi.modalOpened, updateTaskForm.setInitialForm],
})

sample({
  clock: updateTaskForm.submit,
  source: [updateTaskForm.$values, $taskToEdit] as const,
  filter: updateTaskForm.$isValid,
  fn: ([values, task]) => ({
    ...values,
    id: task?.task_uuid ?? '',
  }),
  target: [updateTaskForm.reset, updateTaskModalApi.modalClosed, updateTaskMutation.start],
})

sample({
  clock: updateTaskModalApi.modalClosed,
  target: [updateTaskForm.reset, $taskToEdit.reinit],
})

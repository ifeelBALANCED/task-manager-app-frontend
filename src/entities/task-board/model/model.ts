import { keepFresh } from '@farfetched/core'
import { createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { taskBoardDetailsQuery, taskBoardsQuery } from '../api'

export const TaskBoardsGate = createGate<never>()
export const TaskBoardDetailsGate = createGate<{ boardId: string }>()

export const taskViewModeToggled = createEvent()

export const $taskBoards = taskBoardsQuery.$data
export const $taskBoardDetail = taskBoardDetailsQuery.$data
export const $taskBoardsPending = taskBoardsQuery.$pending
export const $taskBoardDetailsPending = taskBoardDetailsQuery.$pending
export const $taskViewMode = createStore<'grid' | 'column'>('grid')

sample({
  clock: TaskBoardsGate.open,
  target: taskBoardsQuery.start,
})

sample({
  clock: taskViewModeToggled,
  source: $taskViewMode,
  fn: (viewMode) => (viewMode === 'grid' ? 'column' : 'grid'),
  target: $taskViewMode,
})

sample({
  clock: TaskBoardDetailsGate.state,
  filter: (params) => Boolean(params.boardId),
  fn: ({ boardId }) => ({ boardId }),
  target: taskBoardDetailsQuery.start,
})

keepFresh(taskBoardsQuery, {
  automatically: true,
})

keepFresh(taskBoardDetailsQuery, {
  automatically: true,
})

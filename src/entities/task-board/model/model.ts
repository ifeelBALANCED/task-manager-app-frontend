import { keepFresh } from '@farfetched/core'
import { createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { not } from 'patronum'
import { redirectFx } from '@/shared/lib/router'
import { taskBoardDetailsQuery, taskBoardsQuery } from '../api'
import { isValidUUID } from '../lib'

export const TaskBoardsGate = createGate<never>()
export const TaskBoardDetailsGate = createGate<{ boardId: string }>()

export const taskViewModeToggled = createEvent()

export const $taskBoards = taskBoardsQuery.$data
export const $taskBoardDetail = taskBoardDetailsQuery.$data
export const $taskBoardsPending = taskBoardsQuery.$pending
export const $taskBoardDetailsPending = taskBoardDetailsQuery.$pending
export const $taskViewMode = createStore<'grid' | 'column'>('grid')
export const $taskBoardDetailsValid = TaskBoardDetailsGate.state.map(
  ({ boardId }) => Boolean(boardId) && isValidUUID(boardId),
)

sample({
  clock: taskViewModeToggled,
  source: $taskViewMode,
  fn: (viewMode) => (viewMode === 'grid' ? 'column' : 'grid'),
  target: $taskViewMode,
})

sample({
  clock: TaskBoardDetailsGate.state,
  filter: $taskBoardDetailsValid,
  fn: ({ boardId }) => ({ boardId }),
  target: taskBoardDetailsQuery.start,
  skipVoid: false,
})

sample({
  clock: TaskBoardDetailsGate.state.map(({ boardId }) => boardId),
  filter: not($taskBoardDetailsValid),
  target: redirectFx.prepend(() => '/task-boards'),
})

keepFresh(taskBoardsQuery, {
  automatically: true,
})

keepFresh(taskBoardDetailsQuery, {
  automatically: true,
})

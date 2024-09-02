import { keepFresh } from '@farfetched/core'
import { createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'
import { not } from 'patronum'
import { TaskBoards } from '@/entities/task-board/types'
import { createPagination } from '@/shared/lib/create-pagination'
import { redirectFx } from '@/shared/lib/router'
import { deleteBoardDetailsQuery, taskBoardDetailsQuery, taskBoardsQuery } from '../api'
import { isValidUUID } from '../lib'

export const TaskBoardsGate = createGate<never>()
export const TaskBoardDetailsGate = createGate<{ boardId: string }>()

export const taskViewModeToggled = createEvent()
export const $taskBoards = createStore<TaskBoards['results']>([])
export const $taskBoardDetail = taskBoardDetailsQuery.$data
export const $taskBoardsPending = taskBoardsQuery.$pending
export const $taskBoardDetailsPending = taskBoardDetailsQuery.$pending
export const $taskViewMode = createStore<'grid' | 'column'>('grid')
export const $taskBoardDetailsValid = TaskBoardDetailsGate.state.map(
  ({ boardId }) => Boolean(boardId) && isValidUUID(boardId),
)

export const taskBoardsPagination = createPagination(
  taskBoardsQuery.$data.map((taskBoards) => taskBoards?.count ?? 0),
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

sample({
  clock: taskBoardsQuery.finished.success,
  source: taskBoardsQuery.$data,
  filter: Boolean,
  fn: (taskBoards) => taskBoards?.results ?? [],
  target: $taskBoards,
})

sample({
  clock: [
    TaskBoardsGate.open,
    deleteBoardDetailsQuery.finished.success,
    taskBoardsPagination.setItemsPerPage,
    taskBoardsPagination.activePageSet,
  ],
  source: [taskBoardsPagination.$activePage, taskBoardsPagination.$itemsPerPage] as const,
  fn: ([page, pageSize]) => ({ page, pageSize }),
  target: taskBoardsQuery.start,
})

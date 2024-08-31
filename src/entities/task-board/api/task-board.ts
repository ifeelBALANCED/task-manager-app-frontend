import { createQuery } from '@farfetched/core'
import { instance } from '@/shared/api'
import type { TaskBoard, TaskBoards, UpdateTaskBoard } from '../types'
import { getTaskBoardDetailsUrl, getTaskBoardsUrl } from './contracts'

export const taskBoardsQuery = createQuery({
  handler: async ({ page, pageSize }: { page: number; pageSize: number }): Promise<TaskBoards> => {
    const response = await instance.get<TaskBoards>(getTaskBoardsUrl(), {
      params: {
        page,
        pageSize,
      },
    })

    return response.data
  },
})

export const taskBoardDetailsQuery = createQuery({
  handler: async ({ boardId }: { boardId: string }): Promise<TaskBoard> => {
    const response = await instance.get<TaskBoard>(getTaskBoardDetailsUrl(boardId))

    return response.data
  },
})

export const deleteBoardDetailsQuery = createQuery({
  handler: async ({ id }: { id: string }) => {
    await instance.delete(getTaskBoardDetailsUrl(id))
  },
})

export const updateTaskBoardsQuery = createQuery({
  handler: async (updateTaskBoardDto: UpdateTaskBoard): Promise<TaskBoard> => {
    const response = await instance.patch<TaskBoard>(
      `${getTaskBoardsUrl()}${updateTaskBoardDto.board_uuid}/`,
      updateTaskBoardDto,
    )

    return response.data
  },
})

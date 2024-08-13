import { createQuery } from '@farfetched/core'
import { AxiosResponse } from 'axios'
import { instance } from '@/shared/api'
import { TaskBoard, TaskBoards } from '../types'
import { getTaskBoardDetailsUrl, getTaskBoardsUrl } from './contracts'

export const taskBoardsQuery = createQuery({
  handler: async (): Promise<TaskBoards> => {
    const response = await instance.get<TaskBoards, AxiosResponse<TaskBoards>>(getTaskBoardsUrl())

    return response.data
  },
})

export const taskBoardDetailsQuery = createQuery({
  handler: async ({ boardId }: { boardId: string }): Promise<TaskBoard> => {
    const response = await instance.get<TaskBoard, AxiosResponse<TaskBoard>>(
      getTaskBoardDetailsUrl(boardId),
    )

    return response.data
  },
})

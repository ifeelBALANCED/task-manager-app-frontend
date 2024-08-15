import { UnContract } from '@withease/contracts'
import { taskBoardsApi } from '@/entities/task-board'

export type CreateBoardFormValues = UnContract<typeof taskBoardsApi.CreateTaskBoardDTO>

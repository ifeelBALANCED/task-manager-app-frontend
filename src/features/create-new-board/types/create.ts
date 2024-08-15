import { UnContract } from '@withease/contracts'
import { CreateTaskBoardDTO } from '../api'

export type CreateBoardFormValues = UnContract<typeof CreateTaskBoardDTO>

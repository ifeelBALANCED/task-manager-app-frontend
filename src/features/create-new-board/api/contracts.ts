import { obj, str } from '@withease/contracts'

export const CreateTaskBoardDTO = obj({
  name: str,
  description: str,
})

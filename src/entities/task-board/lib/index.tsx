import { IconCheck, IconClock, IconEyePause, IconList, IconX } from '@tabler/icons-react'

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'TODO':
      return <IconList size={20} color="gray" />
    case 'IN_PROGRESS':
      return <IconClock size={20} color="blue" />
    case 'DONE':
      return <IconCheck size={20} color="green" />
    case 'POSTPONED':
      return <IconEyePause size={20} color="orange" />
    default:
      return <IconX size={20} color="red" />
  }
}

import {
  IconAlarmSnooze,
  IconAlertCircle,
  IconCircleCheck,
  IconCircleDashed,
  IconClockPlay,
} from '@tabler/icons-react'

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'TODO':
      return <IconCircleDashed size={20} stroke={1.5} color="#6B7280" />
    case 'IN_PROGRESS':
      return <IconClockPlay size={20} stroke={1.5} color="#3B82F6" />
    case 'DONE':
      return <IconCircleCheck size={20} stroke={1.5} color="#10B981" />
    case 'POSTPONED':
      return <IconAlarmSnooze size={20} stroke={1.5} color="#F59E0B" />
    default:
      return <IconAlertCircle size={20} stroke={1.5} color="#DC2626" />
  }
}

export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

  return uuidRegex.test(uuid)
}

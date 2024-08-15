import { Card, Group, Text, Tooltip } from '@mantine/core'
import dayjs from 'dayjs'
import { getStatusIcon } from '../../lib'
import { Task } from '../../types'

interface TaskCardProps {
  task: Task
}

export const TaskCard = ({ task }: TaskCardProps) => (
  <Card shadow="sm" padding="md" className="mb-2">
    <Group align="center">
      <Tooltip label={task.status} withArrow>
        {getStatusIcon(task.status)}
      </Tooltip>
      <div>
        <Text fw={500} size="md">
          {task.name}
        </Text>
        <Text size="sm" c="dimmed">
          {task.description || 'No description'}
        </Text>
        <Text size="xs" c="dimmed">
          Created: {dayjs(task.created_at).format('MMM D, YYYY')}
        </Text>
      </div>
    </Group>
  </Card>
)

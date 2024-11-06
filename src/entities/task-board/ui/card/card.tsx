import { ActionIcon, Badge, Button, Card, Modal, Text, Tooltip } from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { getStatusColor, getStatusIcon } from '../../lib'
import { Task } from '../../types'

interface TaskCardProps {
  task: Task
  onDelete: VoidFunction
  onEdit: VoidFunction
}

export const TaskCard = ({ task, onDelete, onEdit }: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useToggle([false, true])

  const handleDelete = () => {
    setIsModalOpen(false)
    onDelete()
  }

  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="mb-4 hover:shadow-md transition-all duration-200"
        data-testid={`task-card-${task.task_uuid}`}
        data-card-id={task.task_uuid}
        aria-label={`Task Card: ${task.name}`}
      >
        <Card.Section withBorder inheritPadding py="md">
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-2">
              <Badge
                color={getStatusColor(task.status)}
                variant="light"
                size="lg"
                radius="sm"
                leftSection={getStatusIcon(task.status)}
                aria-label={`Task status: ${task.status}`}
                data-testid={`task-status-badge-${task.task_uuid}`}
              >
                {task.status}
              </Badge>
              <Text
                fw={700}
                size="lg"
                className="line-clamp-1"
                aria-label={`Task name: ${task.name}`}
                data-testid={`task-name-${task.task_uuid}`}
              >
                {task.name}
              </Text>
            </div>
            <div className="flex space-x-1">
              <Tooltip label="Edit task" withArrow position="top">
                <ActionIcon
                  color="blue"
                  variant="light"
                  onClick={onEdit}
                  radius="md"
                  size="lg"
                  aria-label="Edit task"
                  data-testid={`edit-task-button-${task.task_uuid}`}
                >
                  <IconEdit size={18} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete task" withArrow position="top">
                <ActionIcon
                  color="red"
                  variant="light"
                  onClick={() => setIsModalOpen(true)}
                  radius="md"
                  size="lg"
                  aria-label="Delete task"
                  data-testid={`delete-task-button-${task.task_uuid}`}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Tooltip>
            </div>
          </div>
        </Card.Section>

        <Text
          mt="md"
          size="sm"
          c="dimmed"
          className="line-clamp-3"
          aria-label={`Task description: ${task.description || 'No description'}`}
          data-testid={`task-description-${task.task_uuid}`}
        >
          {task.description || 'No description'}
        </Text>

        <div className="flex justify-between mt-3" aria-label="Task dates">
          <Text size="xs" c="dimmed" data-testid={`task-created-date-${task.task_uuid}`}>
            Created: {dayjs(task.created_at).format('MMM D, YYYY')}
          </Text>
          <Text size="xs" c="dimmed" data-testid={`task-updated-date-${task.task_uuid}`}>
            Updated: {dayjs(task.updated_at).format('MMM D, YYYY')}
          </Text>
        </div>
      </Card>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <Text size="lg" fw={700} id="confirm-deletion-title">
            Confirm Deletion
          </Text>
        }
        centered
        aria-labelledby="confirm-deletion-title"
      >
        <Text
          size="sm"
          mb="lg"
          aria-describedby="confirm-deletion-description"
          id="confirm-deletion-description"
        >
          Are you sure you want to delete this task? This action cannot be undone.
        </Text>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsModalOpen(false)}
            aria-label="Cancel task deletion"
            data-testid="cancel-delete-button"
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={handleDelete}
            aria-label="Confirm task deletion"
            data-testid="confirm-delete-button"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  )
}

import { ActionIcon, Badge, Button, Card, Modal, Text, Tooltip } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { useState } from 'react'
import { getStatusIcon } from '../../lib'
import { Task } from '../../types'

interface TaskCardProps {
  task: Task
  onDelete: VoidFunction
  onEdit: VoidFunction
}

const STATUS_COLORS = {
  TODO: 'gray',
  IN_PROGRESS: 'blue',
  DONE: 'green',
  POSTPONED: 'orange',
  DEFAULT: 'red',
} as const

const getStatusColor = (status: keyof typeof STATUS_COLORS) =>
  STATUS_COLORS[status] || STATUS_COLORS.DEFAULT

export const TaskCard = ({ task, onDelete, onEdit }: TaskCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
              >
                {task.status}
              </Badge>
              <Text fw={700} size="lg" className="line-clamp-1">
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
                >
                  <IconTrash size={18} />
                </ActionIcon>
              </Tooltip>
            </div>
          </div>
        </Card.Section>

        <Text mt="md" size="sm" c="dimmed" className="line-clamp-3">
          {task.description || 'No description'}
        </Text>

        <div className="flex justify-between mt-3">
          <Text size="xs" c="dimmed">
            Created: {dayjs(task.created_at).format('MMM D, YYYY')}
          </Text>
          <Text size="xs" c="dimmed">
            Updated: {dayjs(task.updated_at).format('MMM D, YYYY')}
          </Text>
        </div>

        {task.postponed_to && (
          <Text size="xs" c="dimmed" mt="2">
            Postponed to: {dayjs(task.postponed_to).format('MMM D, YYYY')}
          </Text>
        )}
      </Card>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          <Text size="lg" fw={700}>
            Confirm Deletion
          </Text>
        }
        centered
      >
        <Text size="sm" mb="lg">
          Are you sure you want to delete this task? This action cannot be undone.
        </Text>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </>
  )
}

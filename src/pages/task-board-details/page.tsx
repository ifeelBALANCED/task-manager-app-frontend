import {
  ActionIcon,
  Badge,
  Card,
  Divider,
  Group,
  Loader,
  SimpleGrid,
  Text,
  Title,
  Tooltip,
} from '@mantine/core'
import { IconEdit } from '@tabler/icons-react'
import dayjs from 'dayjs'
import { useGate, useUnit } from 'effector-react'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { createNewTaskBoardModel, UpdateTaskBoardModal } from '@/features/board'
import { CreateNewTaskButton, createNewTaskModel, UpdateTaskModal } from '@/features/task'
import { taskApi } from '@/entities/task'
import { taskBoardsModel, taskBoardsTypes, TaskCard } from '@/entities/task-board'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import './model'

export const TaskBoardDetailsPage = () => {
  const { boardId } = useParams()

  useGate(taskBoardsModel.TaskBoardDetailsGate, { boardId: boardId as string })

  const { taskBoardDetail, loading, onDelete, onEdit, onBoardEdit } = useUnit({
    taskBoardDetail: taskBoardsModel.$taskBoardDetail,
    loading: taskBoardsModel.$taskBoardDetailsPending,
    onDelete: taskApi.deleteTaskMutation.start,
    onEdit: createNewTaskModel.taskForEditSelected,
    onBoardEdit: createNewTaskBoardModel.boardDetailsForEditSelected,
  })

  const breadcrumbItems = [
    { title: 'Boards', path: '/task-boards' },
    { title: taskBoardDetail?.name || 'Board Details', path: `/task-boards/${boardId}` },
  ]

  const onTaskDelete = useCallback((taskId: string) => onDelete({ id: taskId }), [onDelete])

  const onTaskEdit = useCallback((task: taskBoardsTypes.Task) => onEdit(task), [onEdit])

  return (
    <div className="container mx-auto px-4">
      <Breadcrumbs items={breadcrumbItems} data-testid="breadcrumbs" aria-label="Breadcrumbs" />

      {loading ? (
        <div className="flex justify-center items-center w-full h-full" aria-live="polite">
          <Loader size={30} aria-label="Loading" />
        </div>
      ) : (
        <Card
          shadow="sm"
          padding="lg"
          className="mt-4"
          data-testid="task-board-card"
          aria-label="Task Board Card"
        >
          <Group p="apart" className="mb-4 justify-between" aria-label="Task Board Header">
            <Group>
              <Tooltip label={taskBoardDetail?.name} withArrow>
                <Title
                  order={2}
                  className="break-words truncate max-w-xs cursor-pointer"
                  aria-label="Task Board Name"
                  data-testid="task-board-name"
                >
                  {taskBoardDetail?.name}
                </Title>
              </Tooltip>
              <Tooltip label="Edit task board" withArrow position="top">
                <ActionIcon
                  color="blue"
                  variant="light"
                  onClick={() => onBoardEdit(taskBoardDetail)}
                  radius="md"
                  size="lg"
                  aria-label="Edit Task Board"
                  data-testid="edit-task-board-button"
                >
                  <IconEdit size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
            <CreateNewTaskButton />
          </Group>
          <Text
            size="sm"
            c="dimmed"
            className="mb-4 break-words"
            aria-label="Task Board Description"
            data-testid="task-board-description"
          >
            {taskBoardDetail?.description}
          </Text>
          <Group p="apart" className="mb-4" aria-label="Task Board Statistics">
            <Badge
              color="blue"
              variant="light"
              data-testid="undone-tasks-badge"
              aria-label="Undone Tasks Badge"
            >
              {taskBoardDetail && taskBoardDetail?.task_count > 0
                ? `${taskBoardDetail.task_count - taskBoardDetail.done_task_count} Undone`
                : 'Empty'}
            </Badge>
            <Badge
              color="green"
              variant="light"
              data-testid="done-tasks-badge"
              aria-label="Done Tasks Badge"
            >
              {taskBoardDetail && taskBoardDetail?.done_task_count > 0
                ? `${taskBoardDetail.done_task_count} Done`
                : 'No Done Tasks'}
            </Badge>
            <Text
              size="xs"
              c="dimmed"
              aria-label="Task Board Created Date"
              data-testid="created-date"
            >
              Created: {dayjs(taskBoardDetail?.created_at).format('MMM D, YYYY')}
            </Text>
          </Group>
          <Divider my="sm" aria-label="Divider" />
          {taskBoardDetail?.tasks.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-full"
              aria-label="No Tasks Message"
            >
              <Text size="lg" c="dimmed" data-testid="no-tasks-message">
                No tasks available
              </Text>
            </div>
          ) : (
            <SimpleGrid cols={1} data-testid="task-grid" aria-label="Task Grid">
              {taskBoardDetail?.tasks.map((task) => (
                <TaskCard
                  key={task.task_uuid}
                  task={task}
                  onDelete={() => onTaskDelete(task?.task_uuid)}
                  onEdit={() => onTaskEdit(task)}
                />
              ))}
            </SimpleGrid>
          )}
        </Card>
      )}
      <UpdateTaskModal />
      <UpdateTaskBoardModal />
    </div>
  )
}

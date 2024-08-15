import { Badge, Card, Divider, Group, Loader, SimpleGrid, Text, Title } from '@mantine/core'
import dayjs from 'dayjs'
import { useGate } from 'effector-react'
import { useUnit } from 'effector-react/effector-react.umd'
import { useParams } from 'react-router-dom'
import { taskBoardsModel, TaskCard } from '@/entities/task-board'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'

export const TaskBoardDetailsPage = () => {
  const { boardId } = useParams()

  useGate(taskBoardsModel.TaskBoardDetailsGate, { boardId: boardId as string })

  const { taskBoardDetail, loading } = useUnit({
    taskBoardDetail: taskBoardsModel.$taskBoardDetail,
    loading: taskBoardsModel.$taskBoardDetailsPending,
  })

  const breadcrumbItems = [
    { title: 'Boards', path: '/task-boards' },
    { title: taskBoardDetail?.name || 'Board Details', path: `/task-boards/${boardId}` },
  ]

  return (
    <div className="container mx-auto px-4">
      <Breadcrumbs items={breadcrumbItems} />

      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <Loader size={30} />
        </div>
      ) : (
        <Card shadow="sm" padding="lg" className="mt-4">
          <Title order={2} className="mb-2 break-words">
            {taskBoardDetail?.name}
          </Title>
          <Text size="sm" c="dimmed" className="mb-4 break-words">
            {taskBoardDetail?.description}
          </Text>
          <Group p="apart" className="mb-4">
            <Badge color="blue" variant="light">
              {taskBoardDetail && taskBoardDetail?.task_count > 0
                ? `${taskBoardDetail.task_count - taskBoardDetail.done_task_count} Undone`
                : 'Empty'}
            </Badge>
            <Badge color="green" variant="light">
              {taskBoardDetail && taskBoardDetail?.done_task_count > 0
                ? `${taskBoardDetail.done_task_count} Done`
                : 'No Done Tasks'}
            </Badge>
            <Text size="xs" c="dimmed">
              Created: {dayjs(taskBoardDetail?.created_at).format('MMM D, YYYY')}
            </Text>
          </Group>
          <Divider my="sm" />
          <SimpleGrid cols={1}>
            {taskBoardDetail?.tasks.map((task) => <TaskCard key={task.task_uuid} task={task} />)}
          </SimpleGrid>
        </Card>
      )}
    </div>
  )
}

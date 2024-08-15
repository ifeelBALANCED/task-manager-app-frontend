import { Badge, Button, Card, Grid, Group, Loader, Text, Tooltip } from '@mantine/core'
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react'
import cn from 'classnames'
import dayjs from 'dayjs'
import { useGate, useUnit } from 'effector-react'
import { Link } from 'react-router-dom'
import { CreateNewTaskBoardButton } from '@/features/create-new-board'
import { taskBoardsModel } from '@/entities/task-board'

export const TaskBoardsPage = () => {
  useGate(taskBoardsModel.TaskBoardsGate)

  const { taskBoards, loading, viewMode, viewModeToggled } = useUnit({
    taskBoards: taskBoardsModel.$taskBoards,
    loading: taskBoardsModel.$taskBoardsPending,
    viewMode: taskBoardsModel.$taskViewMode,
    viewModeToggled: taskBoardsModel.taskViewModeToggled,
  })

  return (
    <div className="p-4">
      <Group align="center" justify="space-between" mb="md" className="mb-4">
        <CreateNewTaskBoardButton />
        {taskBoards && taskBoards?.length > 0 && (
          <Group>
            <Tooltip label="Grid View" withArrow>
              <Button
                onClick={viewModeToggled}
                disabled={viewMode === 'grid'}
                className={cn(
                  'p-2 rounded-full',
                  {
                    'bg-blue-500 text-white': viewMode === 'grid',
                    'bg-white text-blue-500 border border-blue-500': viewMode !== 'grid',
                  },
                  'hover:bg-blue-600 hover:text-white',
                )}
              >
                <IconLayoutGrid size={20} />
              </Button>
            </Tooltip>
            <Tooltip label="List View" withArrow>
              <Button
                onClick={viewModeToggled}
                disabled={viewMode === 'column'}
                className={cn(
                  'p-2 rounded-full',
                  {
                    'bg-blue-500 text-white': viewMode === 'column',
                    'bg-white text-blue-500 border border-blue-500': viewMode !== 'column',
                  },
                  'hover:bg-blue-600 hover:text-white',
                )}
              >
                <IconLayoutList size={20} />
              </Button>
            </Tooltip>
          </Group>
        )}
      </Group>
      {loading ? (
        <div className="flex justify-center items-center w-full h-64">
          <Loader size={30} />
        </div>
      ) : taskBoards?.length ? (
        <Grid>
          {taskBoards.map((board) => (
            <Grid.Col span={viewMode === 'grid' ? 4 : 12} key={board.board_uuid}>
              <Link to={`/task-boards/${board.board_uuid}`} className="no-underline">
                <Card
                  shadow="sm"
                  padding="lg"
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300 rounded-lg"
                >
                  <Text fw={500} size="lg" className="mb-2 break-words">
                    {board.name}
                  </Text>
                  <Text size="sm" c="dimmed" className="mb-2 break-words">
                    {board.description}
                  </Text>
                  <Group p="apart" className="mb-2">
                    <Badge color="blue" variant="light">
                      {board.task_count > 0
                        ? `${board.task_count - board.done_task_count} Undone`
                        : 'Empty'}
                    </Badge>
                    <Badge color="green" variant="light">
                      {board.done_task_count > 0
                        ? `${board.done_task_count} Done`
                        : 'No Done Tasks'}
                    </Badge>
                    <Text size="xs" c="dimmed">
                      Created: {dayjs(board.created_at).format('MMM D, YYYY')}
                    </Text>
                  </Group>
                </Card>
              </Link>
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Card shadow="sm" padding="xl" className="text-center">
          <Text size="xl" fw={500} className="mb-4">
            No Task Boards Found
          </Text>
          <Text size="sm" c="dimmed">
            Get started by creating your first task board!
          </Text>
        </Card>
      )}
    </div>
  )
}

import { Button, Card, Grid, Group, Loader, Text } from '@mantine/core'
import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react'
import cn from 'classnames'
import { useGate, useUnit } from 'effector-react'
import { Link } from 'react-router-dom'
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
      <Group align="center" justify="end" mb="md" className="mb-4">
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
      </Group>
      <Grid>
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <Loader size={30} />
          </div>
        ) : (
          taskBoards?.map((board) => (
            <Grid.Col span={viewMode === 'grid' ? 4 : 12} key={board.board_uuid}>
              <Link to={`/task-boards/${board.board_uuid}`} className="no-underline">
                <Card
                  shadow="sm"
                  padding="lg"
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300 rounded-lg"
                >
                  <Text fw={500} size="lg" className="mb-2">
                    {board.name}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {board.description}
                  </Text>
                </Card>
              </Link>
            </Grid.Col>
          ))
        )}
      </Grid>
    </div>
  )
}

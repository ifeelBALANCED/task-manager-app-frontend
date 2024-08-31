import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Loader,
  Pagination,
  Select,
  Text,
  Tooltip,
} from '@mantine/core'
import { IconCheck, IconLayoutGrid, IconLayoutList, IconTrash, IconX } from '@tabler/icons-react'
import cn from 'classnames'
import dayjs from 'dayjs'
import { useGate, useUnit } from 'effector-react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateNewTaskBoardButton } from '@/features/board'
import { taskBoardsApi, taskBoardsModel } from '@/entities/task-board'

export const TaskBoardsPage = () => {
  useGate(taskBoardsModel.TaskBoardsGate)
  const navigate = useNavigate()

  const {
    taskBoards,
    loading,
    viewMode,
    viewModeToggled,
    deleteTaskBoard,
    paginatedTaskBoards,
    totalPages,
    activePage,
    itemsPerPage,
    setItemsPerPage,
    setActivePage,
    changePage,
  } = useUnit({
    taskBoards: taskBoardsModel.$taskBoards,
    loading: taskBoardsModel.$taskBoardsPending,
    viewMode: taskBoardsModel.$taskViewMode,
    viewModeToggled: taskBoardsModel.taskViewModeToggled,
    deleteTaskBoard: taskBoardsApi.deleteBoardDetailsQuery.start,
    changePage: taskBoardsModel.taskBoardsPagination.changePage,
    totalPages: taskBoardsModel.taskBoardsPagination.$totalPages,
    paginatedTaskBoards: taskBoardsModel.$taskBoards,
    activePage: taskBoardsModel.taskBoardsPagination.$activePage,
    itemsPerPage: taskBoardsModel.taskBoardsPagination.$itemsPerPage,
    setItemsPerPage: taskBoardsModel.taskBoardsPagination.setItemsPerPage,
    setActivePage: taskBoardsModel.taskBoardsPagination.activePageSet,
  })

  const onTaskBoardDelete = useCallback(
    (boardId: string) => {
      deleteTaskBoard({ id: boardId })
    },
    [deleteTaskBoard],
  )

  const handlePageChange = useCallback(
    (newPage: number) => {
      setActivePage(newPage)
    },
    [setActivePage],
  )

  const handleItemsPerPageChange = useCallback(
    (value: string | null) => {
      if (!value) return

      setItemsPerPage(parseInt(value, 10))
    },
    [setItemsPerPage],
  )

  return (
    <div className="p-4">
      <Group align="center" justify="space-between" mb="md" className="mb-4">
        <CreateNewTaskBoardButton
          aria-label="Create new task board"
          data-testid="create-new-task-board-button"
        />
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
                aria-label="Switch to grid view"
                data-testid="grid-view-button"
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
                aria-label="Switch to list view"
                data-testid="list-view-button"
              >
                <IconLayoutList size={20} />
              </Button>
            </Tooltip>
          </Group>
        )}
      </Group>
      {loading ? (
        <div className="flex justify-center items-center w-full h-64" aria-live="polite">
          <Loader size={30} />
        </div>
      ) : paginatedTaskBoards?.length ? (
        <>
          <Grid>
            {paginatedTaskBoards.map((board) => (
              <Grid.Col
                span={viewMode === 'grid' ? { xs: 12, sm: 6, md: 4 } : 12}
                key={board.board_uuid}
                data-testid={`task-board-card-${board.board_uuid}`}
              >
                <Card
                  shadow="sm"
                  padding="lg"
                  className="cursor-pointer hover:shadow-lg transition-shadow duration-300 rounded-lg"
                  onClick={() => {
                    navigate(`/task-boards/${board.board_uuid}`)
                  }}
                  aria-label={`Task board: ${board.name}`}
                >
                  <Group p="apart" align="center" justify="space-between">
                    <Text
                      fw={500}
                      size="lg"
                      className="mb-2 truncate max-w-[60%]"
                      aria-label={`Task board name: ${board.name}`}
                      data-testid={`task-board-name-${board.board_uuid}`}
                    >
                      {board.name}
                    </Text>
                    <Tooltip label="Delete Board" withArrow>
                      <Button
                        variant="subtle"
                        color="red"
                        className="p-2 rounded-full hover:bg-red-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          onTaskBoardDelete(board.board_uuid)
                        }}
                        aria-label={`Delete task board: ${board.name}`}
                        data-testid={`delete-task-board-button-${board.board_uuid}`}
                      >
                        <IconTrash size={20} />
                      </Button>
                    </Tooltip>
                  </Group>
                  <Text
                    size="sm"
                    c="dimmed"
                    className="mb-2 break-words"
                    aria-label={`Task board description: ${board.description}`}
                    data-testid={`task-board-description-${board.board_uuid}`}
                  >
                    {board.description}
                  </Text>
                  <Group p="apart" className="mb-2">
                    <Badge color="blue" variant="light">
                      {board.task_count > 0 ? (
                        <div className="flex items-center">
                          <IconX size={14} className="mr-2" />
                          {board.task_count - board.done_task_count} Undone
                        </div>
                      ) : (
                        'Empty'
                      )}
                    </Badge>
                    <Badge color="green" variant="light">
                      {board.done_task_count > 0 ? (
                        <>
                          <IconCheck size={14} className="mr-2" />
                          {board.done_task_count} Done
                        </>
                      ) : (
                        'No Done Tasks'
                      )}
                    </Badge>
                    <Text size="xs" c="dimmed">
                      Created: {dayjs(board.created_at).format('MMM D, YYYY')}
                    </Text>
                  </Group>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
          <Group p="apart" align="center" mt="xl" className="flex items-center gap-x-2">
            <Pagination
              total={totalPages}
              value={activePage}
              onChange={handlePageChange}
              onPreviousPage={() => changePage('previous')}
              onNextPage={() => changePage('next')}
              size="sm"
              radius="md"
              withEdges
              aria-label="Navigate task board pages"
            />
            <Tooltip label="Select number of items to display per page" withArrow>
              <Select
                className="w-[75px]"
                value={itemsPerPage.toString()}
                onChange={handleItemsPerPageChange}
                data={taskBoardsModel.taskBoardsPagination.itemsPerPageOptions}
                aria-label="Select items per page"
                data-testid="items-per-page-select"
                size="sm"
                radius="md"
              />
            </Tooltip>
          </Group>
        </>
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

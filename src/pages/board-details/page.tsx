import { Container, List } from '@mantine/core'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BoardHeader } from '@/shared/ui/border-header'
import { Task, Type } from '@/shared/ui/task'

const tasks = [
  { id: '1', name: 'Task 1', type: Type.ToDo, icon: 'person' },
  { id: '2', name: 'Task 2', type: Type.Completed, description: 'hello', icon: 'books' },
  { id: '3', name: 'Task 3', type: Type.WontDo, icon: 'time' },
  { id: '4', name: 'Task 4', type: Type.InProgress, icon: 'coffee' },
]

const boardDetails = {
  name: 'My first Board',
  description: 'here is my first board for tasks',
}

export const BoardDetailsPage = () => {
  const { boardId } = useParams()

  useEffect(() => {
    //TODO: get board details
    console.log('having board ', boardId)
  }, [boardId])

  return (
    <Container size="xl">
      <BoardHeader boardInfo={boardDetails} onEdit={() => console.log('edit board ', boardId)} />
      <List listStyleType="none" spacing={20}>
        {tasks.map((task) => (
          <List.Item key={task.id} className="w-full">
            <Task details={task} />
          </List.Item>
        ))}
      </List>
    </Container>
  )
}

import { Container, List } from '@mantine/core'
import { Task, Type } from '@/shared/ui/task'

const tasks = [
  { id: '1', name: 'Task 1', type: Type.ToDo, icon: 'person' },
  { id: '2', name: 'Task 2', type: Type.Completed, description: 'hello', icon: 'books' },
  { id: '3', name: 'Task 3', type: Type.WontDo, icon: 'time' },
  { id: '4', name: 'Task 4', type: Type.InProgress, icon: 'coffee' },
]

export const BoardDetailsPage = () => {
  return (
    <Container size="xl">
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

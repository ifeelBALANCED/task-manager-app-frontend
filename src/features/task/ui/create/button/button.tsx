import { Button, Modal } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useUnit } from 'effector-react'
import { createTaskModalApi } from '../../../model'
import { CreateNewTaskForm } from '../form'

export const CreateNewTaskButton = () => {
  const { opened, open, close } = useUnit({
    opened: createTaskModalApi.$modal,
    open: createTaskModalApi.modalOpened,
    close: createTaskModalApi.modalClosed,
  })

  return (
    <>
      <Button
        variant="outline"
        aria-haspopup="dialog"
        color="blue"
        onClick={open}
        leftSection={<IconPlus size={16} />}
      >
        Create New Task
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Create New Task"
        centered
        classNames={{
          title: 'text-task-title text-center text-sapphire font-bold',
        }}
      >
        <CreateNewTaskForm />
      </Modal>
    </>
  )
}

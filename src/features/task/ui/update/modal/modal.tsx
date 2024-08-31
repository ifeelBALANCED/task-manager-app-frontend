import { Modal } from '@mantine/core'
import { useUnit } from 'effector-react'
import { updateTaskModalApi } from '../../../model'
import { UpdateTaskForm } from '../form'

export const UpdateTaskModal = () => {
  const { opened, close } = useUnit({
    opened: updateTaskModalApi.$modal,
    open: updateTaskModalApi.modalOpened,
    close: updateTaskModalApi.modalClosed,
  })

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Update Task"
      centered
      aria-labelledby="update-task-modal-title"
      aria-modal="true"
      classNames={{
        title: 'text-task-title text-center text-sapphire font-bold',
      }}
      data-testid="update-task-modal"
    >
      <h1 id="update-task-modal-title" className="sr-only">
        Update Task
      </h1>
      <UpdateTaskForm />
    </Modal>
  )
}

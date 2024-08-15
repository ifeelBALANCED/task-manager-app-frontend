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
      classNames={{
        title: 'text-task-title text-center text-sapphire font-bold',
      }}
    >
      <UpdateTaskForm />
    </Modal>
  )
}

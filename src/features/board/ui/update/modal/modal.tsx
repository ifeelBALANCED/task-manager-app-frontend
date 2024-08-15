import { Modal } from '@mantine/core'
import { useUnit } from 'effector-react'
import { updateTaskBoardModalApi } from '../../../model'
import { UpdateTaskBoardForm } from '../form'

export const UpdateTaskBoardModal = () => {
  const { opened, close } = useUnit({
    opened: updateTaskBoardModalApi.$modal,
    open: updateTaskBoardModalApi.modalOpened,
    close: updateTaskBoardModalApi.modalClosed,
  })

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Update Task Board"
      centered
      classNames={{
        title: 'text-task-title text-center text-sapphire font-bold',
      }}
    >
      <UpdateTaskBoardForm />
    </Modal>
  )
}

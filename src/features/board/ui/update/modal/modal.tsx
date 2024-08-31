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
      aria-labelledby="update-task-board-modal-title"
      aria-describedby="update-task-board-modal-description"
      data-testid="update-task-board-modal"
    >
      <div id="update-task-board-modal-title" className="sr-only">
        Update Task Board
      </div>
      <div id="update-task-board-modal-description" className="sr-only">
        A form to update the task board details.
      </div>
      <UpdateTaskBoardForm />
    </Modal>
  )
}

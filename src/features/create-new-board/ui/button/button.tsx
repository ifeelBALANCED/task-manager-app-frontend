import { Button, Modal } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useUnit } from 'effector-react'
import { createNewTaskBoardModel } from '@/features/create-new-board'
import { CreateNewTaskBoardForm } from '../form'

export const CreateNewTaskBoardButton = () => {
  const { opened, open, close } = useUnit({
    opened: createNewTaskBoardModel.createTaskBoardModalApi.$modal,
    open: createNewTaskBoardModel.createTaskBoardModalApi.modalOpened,
    close: createNewTaskBoardModel.createTaskBoardModalApi.modalClosed,
  })

  return (
    <>
      <Button
        leftSection={<IconPlus size={16} />}
        color="blue"
        onClick={open}
        className="hover:bg-blue-600 transition-colors duration-300 w-fit"
        aria-haspopup="dialog"
      >
        Create New Board
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title="Create New Task Board"
        centered
        classNames={{
          title: 'text-task-title text-center text-sapphire',
        }}
      >
        <CreateNewTaskBoardForm />
      </Modal>
    </>
  )
}

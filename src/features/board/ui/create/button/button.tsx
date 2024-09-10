import { Button, Modal } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useUnit } from 'effector-react'
import { createTaskBoardModalApi } from '../../../model'
import { CreateNewTaskBoardForm } from '../form'

export const CreateNewTaskBoardButton = () => {
  const { opened, open, close } = useUnit({
    opened: createTaskBoardModalApi.$modal,
    open: createTaskBoardModalApi.modalOpened,
    close: createTaskBoardModalApi.modalClosed,
  })

  return (
    <>
      <Button
        aria-label="Create new task board"
        data-testid="create-new-task-board-button"
        data-open={opened}
        data-state={opened ? 'opened' : 'closed'}
        data-action="open-modal"
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
          title: 'text-task-title text-center text-sapphire font-bold',
        }}
        id="create-new-task-board-modal"
      >
        <CreateNewTaskBoardForm />
      </Modal>
    </>
  )
}

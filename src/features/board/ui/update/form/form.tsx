import { Box, Button, LoadingOverlay, Textarea, TextInput } from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { FormEventHandler } from 'react'
import { createNewTaskBoardModel } from '@/features/board'

export const UpdateTaskBoardForm = () => {
  const { pending } = useUnit({ pending: createNewTaskBoardModel.$updateTaskBoardPending })
  const { fields, hasError, errorText, submit, isValid } = useForm(
    createNewTaskBoardModel.updateTaskBoardForm,
  )

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit} aria-live="polite" data-testid="update-task-board-form">
      <Box pos="relative">
        <LoadingOverlay visible={pending} loaderProps={{ children: 'Updating task board...' }} />
        <TextInput
          label="Name"
          placeholder="Enter a name for your task board"
          required
          classNames={{
            input: 'focus:border-sapphire',
            label: 'text-sapphire font-medium',
          }}
          value={fields.name.value}
          onChange={(e) => fields.name.onChange(e.target.value)}
          error={hasError('name') ? errorText('name') : null}
          aria-invalid={hasError('name') ? 'true' : 'false'}
          aria-describedby={hasError('name') ? 'name-error' : undefined}
          data-testid="task-board-name-input"
        />
        <Textarea
          label="Description"
          placeholder="Enter a description for your task board"
          mt="md"
          classNames={{
            input: 'focus:border-sapphire',
            label: 'text-sapphire font-medium',
          }}
          value={fields.description.value}
          onChange={(e) => fields.description.onChange(e.target.value)}
          error={hasError('description') ? errorText('description') : null}
          aria-invalid={hasError('description') ? 'true' : 'false'}
          aria-describedby={hasError('description') ? 'description-error' : undefined}
          minRows={3}
          data-testid="task-board-description-textarea"
        />
      </Box>
      <Button
        type="submit"
        mt="xl"
        fullWidth={false}
        className="bg-sapphire hover:bg-sapphire-600 text-white transition-colors duration-300 block ml-auto"
        disabled={!isValid}
        loading={pending}
        loaderProps={{ type: 'dots' }}
        data-testid="update-task-board-submit-button"
      >
        Update
      </Button>
    </form>
  )
}

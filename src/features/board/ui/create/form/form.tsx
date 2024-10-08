import { Box, Button, LoadingOverlay, Textarea, TextInput } from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { FormEventHandler } from 'react'
import { $createTaskBoardPending, createTaskBoardForm } from '../../../model'

export const CreateNewTaskBoardForm = () => {
  const { pending } = useUnit({ pending: $createTaskBoardPending })
  const { fields, hasError, errorText, submit, isValid } = useForm(createTaskBoardForm)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit} aria-live="polite" data-testid="create-task-board-form">
      <Box pos="relative">
        <LoadingOverlay visible={pending} loaderProps={{ children: 'Creating board...' }} />
        <TextInput
          label="Name"
          placeholder="Enter a name for your board"
          required
          classNames={{
            input: 'focus:border-sapphire',
            label: 'text-sapphire font-medium',
          }}
          value={fields.name.value}
          onChange={(e) => fields.name.onChange(e.target.value)}
          error={hasError('name') ? errorText('name') : null}
          aria-label="Board Name"
          data-testid="board-name-input"
          aria-invalid={hasError('name')}
          aria-errormessage={errorText('name')}
        />
        <Textarea
          label="Description"
          placeholder="Enter a description for your board"
          mt="md"
          classNames={{
            input: 'focus:border-sapphire',
            label: 'text-sapphire font-medium',
          }}
          value={fields.description.value}
          onChange={(e) => fields.description.onChange(e.target.value)}
          error={hasError('description') ? errorText('description') : null}
          aria-label="Board Description"
          data-testid="board-description-textarea"
          aria-invalid={hasError('description')}
          aria-errormessage={errorText('description')}
          minRows={3}
        />
      </Box>
      <Button
        type="submit"
        fullWidth={false}
        mt="xl"
        className="block ml-auto bg-sapphire hover:bg-sapphire-600 text-white transition-colors duration-300"
        disabled={!isValid}
        loading={pending}
        loaderProps={{ type: 'dots' }}
        aria-label="Create Board"
        data-testid="create-board-form-button"
      >
        Create
      </Button>
    </form>
  )
}

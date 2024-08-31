import { Box, Button, LoadingOverlay, Select, Textarea, TextInput } from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { FormEventHandler } from 'react'
import { $updateTaskPending, updateTaskForm } from '../../../model'

export const UpdateTaskForm = () => {
  const { pending } = useUnit({ pending: $updateTaskPending })
  const { fields, hasError, errorText, submit, isValid } = useForm(updateTaskForm)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit} aria-live="polite" data-testid="update-task-form">
      <Box pos="relative">
        <LoadingOverlay visible={pending} loaderProps={{ children: 'Updating task...' }} />
        <TextInput
          label="Name"
          placeholder="Enter a name for your task"
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
          data-testid="task-name-input"
        />
        <Textarea
          label="Description"
          placeholder="Enter a description for your task"
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
          data-testid="task-description-input"
        />
        <Select
          label="Status"
          placeholder="Select status"
          data={[
            { value: 'TODO', label: 'To Do' },
            { value: 'IN_PROGRESS', label: 'In Progress' },
            { value: 'DONE', label: 'Done' },
            { value: 'POSTPONED', label: 'Postponed' },
          ]}
          value={fields.status.value}
          onChange={(value) => fields.status.onChange(value as string)}
          error={hasError('status') ? errorText('status') : null}
          aria-invalid={hasError('status') ? 'true' : 'false'}
          aria-describedby={hasError('status') ? 'status-error' : undefined}
          mt="md"
          data-testid="task-status-select"
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
        data-testid="update-task-submit-button"
      >
        Update
      </Button>
    </form>
  )
}

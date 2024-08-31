import { Button, Paper, TextInput } from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { FormEventHandler } from 'react'
import { $forgotPasswordPending, forgotPasswordForm } from '../../model'

export const ForgotPasswordForm = () => {
  const { pending } = useUnit({ pending: $forgotPasswordPending })
  const { fields, hasError, errorText, submit, isValid } = useForm(forgotPasswordForm)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit} data-testid="forgot-password-form">
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          classNames={{
            label: 'text-sapphire',
            input: 'text-black',
          }}
          aria-required="true"
          value={fields.email.value}
          onChange={(e) => fields.email.onChange(e.target.value)}
          error={hasError('email') ? errorText('email') : null}
          data-testid="email-input"
          aria-invalid={hasError('email')}
          aria-errormessage={errorText('email')}
        />
        <Button
          type="submit"
          fullWidth
          mt="md"
          className="bg-sapphire text-white"
          aria-label="Forgot password"
          loading={pending}
          disabled={!isValid}
          loaderProps={{ type: 'dots' }}
          data-testid="forgot-password-submit-button"
        >
          Forgot password
        </Button>
      </Paper>
    </form>
  )
}

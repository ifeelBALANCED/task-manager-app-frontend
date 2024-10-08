import { Button, Paper, PasswordInput } from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { FormEventHandler } from 'react'
import { $resetPasswordPending, resetPasswordForm } from '../../model'

export const ResetPasswordForm = () => {
  const { pending } = useUnit({ pending: $resetPasswordPending })
  const { fields, hasError, errorText, submit, isValid } = useForm(resetPasswordForm)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit} data-testid="reset-password-form">
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
          required
          classNames={{
            label: 'text-sapphire',
            input: 'text-black',
          }}
          aria-required="true"
          value={fields.new_password.value}
          onChange={(e) => fields.new_password.onChange(e.target.value)}
          error={hasError('new_password') ? errorText('new_password') : null}
          data-testid="new-password-input"
          aria-invalid={hasError('new_password')}
          aria-errormessage={errorText('new_password')}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your new password"
          required
          mt="md"
          classNames={{
            label: 'text-sapphire',
            input: 'text-black',
          }}
          aria-required="true"
          value={fields.confirm_new_password.value}
          onChange={(e) => fields.confirm_new_password.onChange(e.target.value)}
          error={hasError('confirm_new_password') ? errorText('confirm_new_password') : null}
          data-testid="confirm-password-input"
          aria-invalid={hasError('confirm_new_password')}
          aria-errormessage={errorText('confirm_new_password')}
        />
        <Button
          type="submit"
          fullWidth
          mt="md"
          className="bg-sapphire text-white"
          aria-label="Reset password"
          loading={pending}
          disabled={!isValid}
          loaderProps={{ type: 'dots' }}
          data-testid="reset-password-submit-button"
        >
          Reset password
        </Button>
      </Paper>
    </form>
  )
}

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
    <form onSubmit={handleSubmit}>
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
        />
        <Button
          type="submit"
          fullWidth
          mt="md"
          className="bg-sapphire text-white"
          aria-label="Sign in"
          loading={pending}
          disabled={!isValid}
          loaderProps={{ type: 'dots' }}
        >
          Forgot password
        </Button>
      </Paper>
    </form>
  )
}

import { Anchor, Button, Checkbox, Group, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { FormEventHandler } from 'react'
import { $loginPending, loginForm } from '../../model'

export const LoginForm = () => {
  const { pending } = useUnit({ pending: $loginPending })
  const { fields, hasError, errorText, submit, isValid } = useForm(loginForm)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Email"
        placeholder="you@mantine.dev"
        required
        className="text-smoke"
        aria-required="true"
        value={fields.email.value}
        onChange={(e) => fields.email.onChange(e.target.value)}
        error={hasError('email') ? errorText('email') : null}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required
        mt="md"
        className="text-smoke"
        aria-required="true"
        value={fields.password.value}
        onChange={(e) => fields.password.onChange(e.target.value)}
        error={hasError('password') ? errorText('password') : null}
      />
      <Group justify="space-between" mt="lg">
        <Checkbox label="Remember me" className="text-smoke" aria-label="Remember me" />
        <Anchor component="button" size="sm" className="text-sapphire" aria-label="Forgot password">
          Forgot password?
        </Anchor>
      </Group>
      <Button
        fullWidth
        mt="xl"
        className="bg-sapphire text-white"
        aria-label="Sign in"
        loading={pending}
        disabled={!isValid}
        loaderProps={{ type: 'dots' }}
      >
        Sign in
      </Button>
    </form>
  )
}

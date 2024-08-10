import { Anchor, Button, Group, PasswordInput, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { FormEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { $registerPending, registerForm } from '../../model'

export const RegisterForm = () => {
  const { pending } = useUnit({ pending: $registerPending })
  const { fields, hasError, errorText, submit, isValid } = useForm(registerForm)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Nickname"
          placeholder="Your nickname"
          radius="md"
          className="text-smoke"
          aria-label="Nickname"
          value={fields.nickname.value}
          onChange={(e) => fields.nickname.onChange(e.target.value)}
          error={hasError('nickname') ? errorText('nickname') : null}
        />
        <TextInput
          required
          label="Email"
          placeholder="hello@mantine.dev"
          radius="md"
          className="text-smoke"
          aria-required="true"
          aria-label="Email"
          value={fields.email.value}
          onChange={(e) => fields.email.onChange(e.target.value)}
          error={hasError('email') ? errorText('email') : null}
        />
        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          radius="md"
          className="text-smoke"
          aria-required="true"
          aria-label="Password"
          value={fields.password.value}
          onChange={(e) => fields.password.onChange(e.target.value)}
          error={hasError('password') ? errorText('password') : null}
        />
      </Stack>

      <Group justify="space-between" mt="xl">
        <Text c="dimmed" size="sm" ta="center" mt={5} className="text-steel">
          Already have an account?{' '}
          <Anchor size="sm" component={Link} to="/" className="text-sapphire" aria-label="Login">
            Login
          </Anchor>
        </Text>
        <Button
          type="submit"
          radius="xl"
          className="bg-sapphire text-white"
          aria-label="Register"
          loading={pending}
          disabled={!isValid}
          loaderProps={{ type: 'dots' }}
        >
          Register
        </Button>
      </Group>
    </form>
  )
}

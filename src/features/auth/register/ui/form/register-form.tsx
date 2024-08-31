import {
  Anchor,
  Box,
  Button,
  Group,
  LoadingOverlay,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { FormEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { $registerPending, registerForm } from '../../model'

export const RegisterForm = () => {
  const { pending } = useUnit({ pending: $registerPending })
  const { fields, hasError, errorText, submit, isValid, reset } = useForm(registerForm)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit} data-testid="register-form">
      <Box pos="relative">
        <LoadingOverlay
          visible={pending}
          loaderProps={{ children: 'Redirecting...' }}
          data-testid="loading-overlay"
        />
        <Stack>
          <TextInput
            label="Nickname"
            placeholder="Your nickname"
            radius="md"
            classNames={{
              label: 'text-sapphire',
              input: 'text-black',
            }}
            aria-label="Nickname"
            value={fields.nickname.value}
            onChange={(e) => fields.nickname.onChange(e.target.value)}
            error={hasError('nickname') ? errorText('nickname') : null}
            data-testid="nickname-input"
            aria-invalid={hasError('nickname')}
            aria-errormessage={errorText('nickname')}
          />
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            radius="md"
            classNames={{
              label: 'text-sapphire',
              input: 'text-black',
            }}
            aria-required="true"
            aria-label="Email"
            value={fields.email.value}
            onChange={(e) => fields.email.onChange(e.target.value)}
            error={hasError('email') ? errorText('email') : null}
            data-testid="email-input"
            aria-invalid={hasError('email')}
            aria-errormessage={errorText('email')}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            radius="md"
            classNames={{
              label: 'text-sapphire',
              input: 'text-black',
            }}
            aria-required="true"
            aria-label="Password"
            value={fields.password.value}
            onChange={(e) => fields.password.onChange(e.target.value)}
            error={hasError('password') ? errorText('password') : null}
            data-testid="password-input"
            aria-invalid={hasError('password')}
            aria-errormessage={errorText('password')}
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Text c="dimmed" size="sm" ta="center" mt={5} className="text-steel">
            Already have an account?{' '}
            <Anchor
              size="sm"
              component={Link}
              onClick={() => reset()}
              to="/"
              className="text-sapphire"
              aria-label="Login"
              data-testid="login-link"
            >
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
            data-testid="register-submit-button"
          >
            Register
          </Button>
        </Group>
      </Box>
    </form>
  )
}

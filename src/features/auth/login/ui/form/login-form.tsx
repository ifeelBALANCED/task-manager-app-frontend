import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { FormEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { $loginPending, loginForm } from '../../model'

export const LoginForm = () => {
  const { pending } = useUnit({ pending: $loginPending })
  const { fields, hasError, errorText, submit, isValid, reset } = useForm(loginForm)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    submit()
  }

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <Box pos="relative">
        <LoadingOverlay
          visible={pending}
          loaderProps={{ children: 'Redirecting...' }}
          data-testid="loading-overlay"
        />
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
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          classNames={{
            label: 'text-sapphire',
            input: 'text-black',
          }}
          aria-required="true"
          value={fields.password.value}
          onChange={(e) => fields.password.onChange(e.target.value)}
          error={hasError('password') ? errorText('password') : null}
          data-testid="password-input"
          aria-invalid={hasError('password')}
          aria-errormessage={errorText('password')}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox
            label="Remember me"
            className="text-sapphire font-normal"
            aria-label="Remember me"
            data-testid="remember-me-checkbox"
          />
          <Anchor
            component={Link}
            size="sm"
            onClick={() => reset()}
            to="/forgot-password"
            className="text-sapphire"
            aria-label="Forgot password"
            data-testid="forgot-password-link"
          >
            Forgot password?
          </Anchor>
        </Group>
      </Box>
      <Button
        type="submit"
        fullWidth
        mt="xl"
        className="bg-sapphire text-white"
        aria-label="Sign in"
        loading={pending}
        disabled={!isValid}
        loaderProps={{ type: 'dots' }}
        data-testid="login-submit-button"
      >
        Sign in
      </Button>
    </form>
  )
}

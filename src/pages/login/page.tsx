import { Anchor, Container, Flex, Paper, Text, Title } from '@mantine/core'
import { useForm } from 'effector-forms'
import { Link } from 'react-router-dom'
import { LoginForm, loginModel } from '@/features/auth/login'

export const LoginPage = () => {
  const { reset } = useForm(loginModel.loginForm)

  return (
    <Flex
      justify="center"
      align="center"
      className="min-h-screen"
      role="main"
      aria-labelledby="login-title"
      aria-label="Login Page"
      data-testid="login-page"
    >
      <Container
        my={40}
        className="min-w-[420px]"
        aria-label="Login Form Container"
        data-testid="login-container"
      >
        <Title
          id="login-title"
          ta="center"
          className="font-extrabold text-sapphire"
          aria-label="Login Title: Welcome Back"
          data-testid="login-title"
        >
          Welcome back!
        </Title>
        <Text
          c="dimmed"
          size="sm"
          ta="center"
          mt={5}
          className="text-steel"
          aria-label="Subtitle: Create an account link"
          data-testid="login-subtitle"
        >
          Do not have an account yet?{' '}
          <Anchor
            size="sm"
            component={Link}
            to="/register"
            onClick={() => reset()}
            className="text-sapphire"
            aria-label="Link: Create account"
            data-testid="create-account-link"
          >
            Create account
          </Anchor>
        </Text>

        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={20}
          radius="md"
          aria-label="Login Form Paper"
          data-testid="login-paper"
        >
          <LoginForm />
        </Paper>
      </Container>
    </Flex>
  )
}

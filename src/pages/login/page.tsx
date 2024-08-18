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
      className="min-h-screen bg-cloud"
      role="main"
      aria-labelledby="login-title"
    >
      <Container my={40} className="min-w-[420px]">
        <Title id="login-title" ta="center" className="font-extrabold text-sapphire">
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5} className="text-steel">
          Do not have an account yet?{' '}
          <Anchor
            size="sm"
            component={Link}
            to="/register"
            onClick={() => reset()}
            className="text-sapphire"
            aria-label="Create account"
          >
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={20} radius="md" className="bg-white">
          <LoginForm />
        </Paper>
      </Container>
    </Flex>
  )
}

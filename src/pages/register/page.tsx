import { Container, Flex, Paper, Title } from '@mantine/core'
import { RegisterForm } from '@/features/auth/register'

export const RegisterPage = () => {
  return (
    <Flex
      justify="center"
      align="center"
      className="min-h-screen bg-cloud"
      role="main"
      aria-labelledby="register-title"
      aria-label="Register Page"
      data-testid="register-page"
    >
      <Container
        my={40}
        className="min-w-[420px]"
        aria-label="Register Form Container"
        data-testid="register-container"
      >
        <Title
          id="register-title"
          ta="center"
          className="font-extrabold text-sapphire"
          aria-label="Register Title: Create an account"
          data-testid="register-title"
        >
          Create an account
        </Title>

        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={20}
          radius="md"
          className="bg-white"
          aria-label="Register Form Paper"
          data-testid="register-paper"
        >
          <RegisterForm />
        </Paper>
      </Container>
    </Flex>
  )
}

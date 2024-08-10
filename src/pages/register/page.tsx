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
    >
      <Container my={40} className="min-w-[420px]">
        <Title id="register-title" ta="center" className="font-extrabold text-sapphire">
          Create an account
        </Title>

        <Paper withBorder shadow="md" p={30} mt={20} radius="md" className="bg-white">
          <RegisterForm />
        </Paper>
      </Container>
    </Flex>
  )
}

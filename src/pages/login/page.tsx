import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { Link } from 'react-router-dom'

export const LoginPage = () => {
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
            className="text-sapphire"
            aria-label="Create account"
          >
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={20} radius="md" className="bg-white">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            className="text-smoke"
            aria-required="true"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            className="text-smoke"
            aria-required="true"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" className="text-smoke" aria-label="Remember me" />
            <Anchor
              component="button"
              size="sm"
              className="text-sapphire"
              aria-label="Forgot password"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" className="bg-sapphire text-white" aria-label="Sign in">
            Sign in
          </Button>
        </Paper>
      </Container>
    </Flex>
  )
}

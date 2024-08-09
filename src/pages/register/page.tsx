import {
  Anchor,
  Button,
  Container,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { Link } from 'react-router-dom'

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
          <form>
            <Stack>
              <TextInput
                label="Nickname"
                placeholder="Your nickname"
                radius="md"
                className="text-smoke"
                aria-label="Nickname"
              />
              <TextInput
                required
                label="Email"
                placeholder="hello@mantine.dev"
                radius="md"
                className="text-smoke"
                aria-required="true"
                aria-label="Email"
              />
              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                radius="md"
                className="text-smoke"
                aria-required="true"
                aria-label="Password"
              />
            </Stack>

            <Group justify="space-between" mt="xl">
              <Text c="dimmed" size="sm" ta="center" mt={5} className="text-steel">
                Already have an account?{' '}
                <Anchor
                  size="sm"
                  component={Link}
                  to="/"
                  className="text-sapphire"
                  aria-label="Login"
                >
                  Login
                </Anchor>
              </Text>
              <Button
                type="submit"
                radius="xl"
                className="bg-sapphire text-white"
                aria-label="Register"
              >
                Register
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Flex>
  )
}

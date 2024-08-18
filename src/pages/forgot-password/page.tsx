import { Box, Container, Flex, LoadingOverlay, Text, ThemeIcon, Title } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import { useUnit } from 'effector-react'
import { Link } from 'react-router-dom'
import { ForgotPasswordForm, forgotPasswordModel } from '@/features/auth/forgot-password'

export const ForgotPasswordPage = () => {
  const { isEmailSent, sentMessageToEmail, resetForm, pending } = useUnit({
    isEmailSent: forgotPasswordModel.$isEmailSent,
    sentMessageToEmail: forgotPasswordModel.messageToEmailSent,
    resetForm: forgotPasswordModel.forgotPasswordForm.reset,
    pending: forgotPasswordModel.$forgotPasswordPending,
  })

  return (
    <Flex
      justify="center"
      align="center"
      className="min-h-screen bg-cloud"
      role="main"
      aria-labelledby="forgot-password-title"
    >
      <Container size="xs">
        <Box pos="relative">
          <LoadingOverlay visible={pending} loaderProps={{ children: 'Redirecting...' }} />
          {!isEmailSent ? (
            <>
              <Title
                id="forgot-password-title"
                ta="center"
                className="font-extrabold text-sapphire"
              >
                Forgot your password?
              </Title>
              <Text c="dimmed" size="sm" ta="center" mt={5} className="text-steel">
                Enter your email to get a reset link
              </Text>
              <ForgotPasswordForm />
              <Text c="dimmed" size="sm" ta="center" mt="md">
                Remembered your password?{' '}
                <Link
                  to="/"
                  onClick={resetForm}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Back to Login
                </Link>
              </Text>
            </>
          ) : (
            <>
              <Flex direction="column" align="center" mt={30}>
                <ThemeIcon size={80} radius={100} variant="light" color="teal">
                  <IconCheck size={36} stroke={1.5} />
                </ThemeIcon>
                <Title order={2} ta="center" mt="md">
                  Check your email
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt="sm">
                  We&apos;ve sent a password reset link to your email address
                </Text>
                <Text size="xs" ta="center" mt={20}>
                  Didn&apos;t receive the email? Check your spam folder or
                  <Text
                    component="span"
                    className="cursor-pointer ml-1 text-blue-500 hover:underline"
                    onClick={() => sentMessageToEmail(false)}
                  >
                    try another email address
                  </Text>
                </Text>
              </Flex>
            </>
          )}
        </Box>
      </Container>
    </Flex>
  )
}

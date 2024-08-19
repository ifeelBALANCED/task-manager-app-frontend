import { Box, Container, Flex, LoadingOverlay, Text, Title } from '@mantine/core'
import { useGate, useUnit } from 'effector-react'
import { Link, useLocation } from 'react-router-dom'
import { ResetPasswordForm, resetPasswordModel } from '@/features/auth/reset-password'

export const ResetPasswordPage = () => {
  const { pending } = useUnit({ pending: resetPasswordModel.$resetPasswordPending })
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const uid = queryParams.get('uid') || ''
  const token = queryParams.get('token') || ''

  useGate(resetPasswordModel.ResetPasswordGate, { uid, token })

  const { resetForm } = useUnit({
    resetForm: resetPasswordModel.resetPasswordForm.reset,
  })

  return (
    <Flex
      justify="center"
      align="center"
      className="min-h-screen bg-cloud"
      role="main"
      aria-labelledby="reset-password-title"
    >
      <Container size="xs">
        <Title id="reset-password-title" ta="center" className="font-extrabold text-sapphire">
          Reset Your Password
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5} className="text-steel">
          Please enter your new password below to reset it.
        </Text>
        <Box pos="relative">
          <LoadingOverlay
            visible={pending}
            loaderProps={{ children: pending ? 'Processing your request...' : '' }}
          />
          <ResetPasswordForm />
          <Text c="dimmed" size="sm" ta="center" mt="md">
            Remembered your password?
            <Link
              to="/"
              onClick={resetForm}
              className="ml-1 text-blue-500 hover:underline font-medium"
            >
              Back to Login
            </Link>
          </Text>
        </Box>
      </Container>
    </Flex>
  )
}

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
      className="min-h-screen"
      role="main"
      aria-labelledby="reset-password-title"
      data-testid="reset-password-page"
    >
      <Container
        size="xs"
        aria-label="Reset Password Container"
        data-testid="reset-password-container"
      >
        <Title
          id="reset-password-title"
          ta="center"
          className="font-extrabold text-sapphire"
          aria-label="Reset Password Title"
          data-testid="reset-password-title"
        >
          Reset Your Password
        </Title>
        <Text
          c="dimmed"
          size="sm"
          ta="center"
          mt={5}
          className="text-steel"
          aria-label="Reset Password Instruction"
          data-testid="reset-password-instruction"
        >
          Please enter your new password below to reset it.
        </Text>
        <Box
          pos="relative"
          aria-label="Reset Password Form Box"
          data-testid="reset-password-form-box"
        >
          <LoadingOverlay
            visible={pending}
            loaderProps={{ children: pending ? 'Processing your request...' : '' }}
            aria-label="Loading Overlay"
            data-testid="loading-overlay"
          />
          <ResetPasswordForm />
          <Text
            c="dimmed"
            size="sm"
            ta="center"
            mt="md"
            aria-label="Back to Login Option"
            data-testid="back-to-login-option"
          >
            Remembered your password?
            <Link
              to="/"
              onClick={resetForm}
              className="ml-1 text-blue-500 hover:underline font-medium"
              aria-label="Back to Login Link"
              data-testid="back-to-login-link"
            >
              Back to Login
            </Link>
          </Text>
        </Box>
      </Container>
    </Flex>
  )
}

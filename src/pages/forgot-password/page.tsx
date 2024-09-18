import { Box, Container, Flex, LoadingOverlay, Text, ThemeIcon, Title } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { Link } from 'react-router-dom'
import { ForgotPasswordForm, forgotPasswordModel } from '@/features/auth/forgot-password'

interface EmailSentMessageProps {
  sentMessageToEmail: (value: boolean) => void
}

const EmailSentMessage = ({ sentMessageToEmail }: EmailSentMessageProps) => {
  const { reset } = useForm(forgotPasswordModel.forgotPasswordForm)

  return (
    <Flex
      direction="column"
      align="center"
      mt={30}
      aria-label="Email Sent Confirmation"
      data-testid="email-sent-message"
    >
      <ThemeIcon
        size={80}
        radius={100}
        variant="light"
        color="teal"
        aria-label="Success Icon"
        data-testid="success-icon"
      >
        <IconCheck size={36} stroke={1.5} />
      </ThemeIcon>
      <Title
        order={2}
        ta="center"
        mt="md"
        aria-label="Check Your Email Title"
        data-testid="check-email-title"
      >
        Check your email
      </Title>
      <Text
        c="dimmed"
        size="sm"
        ta="center"
        mt="sm"
        aria-label="Email Sent Info"
        data-testid="email-sent-info"
      >
        We&apos;ve sent a password reset link to your email address
      </Text>
      <Text
        size="xs"
        ta="center"
        mt={20}
        aria-label="Resend Email Option"
        data-testid="resend-email-option"
      >
        Didn&apos;t receive the email? Check your spam folder or
        <Text
          component="span"
          className="cursor-pointer ml-1 text-blue-500 hover:underline"
          onClick={() => {
            reset()
            sentMessageToEmail(false)
          }}
          aria-label="Try Another Email"
          data-testid="try-another-email"
        >
          try another email address
        </Text>
      </Text>
    </Flex>
  )
}

interface ForgotPasswordFormSectionProps {
  pending: boolean
  resetForm: VoidFunction
}

const ForgotPasswordFormSection = ({ pending, resetForm }: ForgotPasswordFormSectionProps) => (
  <>
    <Title
      id="forgot-password-title"
      ta="center"
      className="font-extrabold text-sapphire"
      aria-label="Forgot Password Title"
      data-testid="forgot-password-title"
    >
      Forgot your password?
    </Title>
    <Text
      c="dimmed"
      size="sm"
      ta="center"
      mt={5}
      className="text-steel"
      aria-label="Enter Email Instruction"
      data-testid="enter-email-instruction"
    >
      Enter your email to get a reset link
    </Text>
    <Box
      pos="relative"
      aria-label="Forgot Password Form Box"
      data-testid="forgot-password-form-box"
    >
      <LoadingOverlay
        visible={pending}
        loaderProps={{ children: 'Redirecting...' }}
        aria-label="Loading Overlay"
        data-testid="loading-overlay"
      />
      <ForgotPasswordForm />
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
          className="text-blue-500 hover:underline font-medium ml-1"
          aria-label="Back to Login Link"
          data-testid="back-to-login-link"
        >
          Back to Login
        </Link>
      </Text>
    </Box>
  </>
)

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
      className="min-h-screen"
      role="main"
      aria-labelledby="forgot-password-title"
      data-testid="forgot-password-page"
    >
      <Container
        size="xs"
        aria-label="Forgot Password Container"
        data-testid="forgot-password-container"
      >
        {!isEmailSent ? (
          <ForgotPasswordFormSection pending={pending} resetForm={resetForm} />
        ) : (
          <EmailSentMessage sentMessageToEmail={sentMessageToEmail} />
        )}
      </Container>
    </Flex>
  )
}

import { Box, Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { FormEventHandler } from 'react'
import { $updateProfilePending, updateUserProfileForm } from '../../model'

export const UpdateProfileForm = () => {
  const { pending } = useUnit({ pending: $updateProfilePending })
  const { fields, hasError, errorText, submit, isValid } = useForm(updateUserProfileForm)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    submit()
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      mt="sm"
      className="max-w-xl"
      aria-label="Update Profile Form"
      data-testid="update-profile-form"
    >
      <TextInput
        label="Nickname"
        placeholder="Enter your nickname"
        mb="md"
        value={fields.nickname.value}
        onChange={(e) => fields.nickname.onChange(e.target.value)}
        error={hasError('nickname') ? errorText('nickname') : null}
        aria-label="Nickname Input"
        data-testid="nickname-input"
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        mb="md"
        value={fields.password.value}
        onChange={(e) => fields.password.onChange(e.target.value)}
        error={hasError('password') ? errorText('password') : null}
        aria-label="Password Input"
        data-testid="password-input"
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        mb="md"
        value={fields.confirm_password.value}
        onChange={(e) => fields.confirm_password.onChange(e.target.value)}
        error={hasError('confirm_password') ? errorText('confirm_password') : null}
        aria-label="Confirm Password Input"
        data-testid="confirm-password-input"
      />
      <Button
        type="submit"
        loading={pending}
        disabled={!isValid}
        loaderProps={{ type: 'dots' }}
        className="bg-sapphire text-white"
        aria-label="Update Profile Button"
        data-testid="update-profile-button"
      >
        Update profile
      </Button>
    </Box>
  )
}

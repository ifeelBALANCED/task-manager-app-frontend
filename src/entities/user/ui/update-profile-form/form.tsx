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
    <Box component="form" onSubmit={handleSubmit} mt="sm" className="max-w-xl">
      <TextInput
        label="Nickname"
        placeholder="Enter your nickname"
        required
        mb="md"
        value={fields.nickname.value}
        onChange={(e) => fields.nickname.onChange(e.target.value)}
        error={hasError('nickname') ? errorText('nickname') : null}
      />
      <TextInput
        label="Profile Picture URL"
        placeholder="Enter your profile picture URL"
        mb="md"
        aria-required="true"
        value={fields.profile_picture.value}
        onChange={(e) => fields.profile_picture.onChange(e.target.value)}
        error={hasError('profile_picture') ? errorText('profile_picture') : null}
      />
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        required
        mb="md"
        value={fields.password.value}
        onChange={(e) => fields.password.onChange(e.target.value)}
        error={hasError('password') ? errorText('password') : null}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your password"
        required
        mb="md"
        value={fields.confirm_password.value}
        onChange={(e) => fields.confirm_password.onChange(e.target.value)}
        error={hasError('confirm_password') ? errorText('confirm_password') : null}
      />
      <Button
        type="submit"
        loading={pending}
        disabled={!isValid}
        loaderProps={{ type: 'dots' }}
        className="bg-sapphire text-white"
      >
        Update profile
      </Button>
    </Box>
  )
}

import { Avatar, Box, Button, Flex, Loader, Text } from '@mantine/core'
import { useToggle } from '@mantine/hooks'
import { IconEdit } from '@tabler/icons-react'
import { useGate, useUnit } from 'effector-react'
import { UpdateProfileForm, userApi, userModel } from '@/entities/user'

export const SettingsPage = () => {
  useGate(userModel.UserSettingsGate)
  const { user, userLoading } = useUnit({
    user: userModel.$user,
    userLoading: userApi.getMeQuery.$pending,
  })

  const [isEditing, toggleEditMode] = useToggle()

  return (
    <>
      {userLoading ? (
        <div className="flex justify-center items-center w-full h-64" aria-live="polite">
          <Loader size={30} />
        </div>
      ) : (
        <div
          className="flex flex-col mt-10 w-full max-w-lg mx-auto p-6 rounded-lg shadow-md"
          aria-label="User Settings"
          data-testid="user-settings"
        >
          <Box
            className="w-full text-center"
            aria-label="User Information Box"
            data-testid="user-info-box"
          >
            <Flex
              direction="column"
              align="center"
              aria-label="User Information"
              data-testid="user-info"
            >
              <Avatar
                src={user?.profile_picture ?? ''}
                variant="light"
                radius="full"
                color="indigo"
                size="xl"
                className="border border-slate-200 dark:border-slate-600 rounded-full mb-2"
                aria-label="User Profile Picture"
                data-testid="user-profile-picture"
              />
              {user?.nickname && (
                <Text
                  size="lg"
                  fw={500}
                  aria-label="User Nickname"
                  data-testid="user-nickname"
                  className="mb-2"
                >
                  {user.nickname}
                </Text>
              )}
              {user?.email && (
                <Text
                  size="sm"
                  c="dimmed"
                  aria-label="User Email"
                  data-testid="user-email"
                  className="mb-1"
                >
                  {user.email}
                </Text>
              )}
              {user?.date_joined && (
                <Text
                  size="xs"
                  c="dimmed"
                  aria-label="User Date Joined"
                  data-testid="user-date-joined"
                  className="mb-4"
                >
                  Joined on: {new Date(user.date_joined).toLocaleDateString()}
                </Text>
              )}
              <Button
                leftSection={!isEditing ? <IconEdit size={16} /> : undefined}
                variant="light"
                color="blue"
                radius="md"
                className="mt-4"
                aria-label="Edit Profile"
                data-testid="edit-profile-button"
                onClick={() => toggleEditMode()}
              >
                {isEditing ? 'Close' : 'Edit Profile'}
              </Button>
            </Flex>
          </Box>

          {isEditing && <UpdateProfileForm />}
        </div>
      )}
    </>
  )
}

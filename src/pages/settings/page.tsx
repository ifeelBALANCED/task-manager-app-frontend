import { Avatar, Box, Button, Divider, Flex, Loader, Text } from '@mantine/core'
import { useGate, useUnit } from 'effector-react'
import { UpdateProfileForm, userApi, userModel } from '@/entities/user'

export const SettingsPage = () => {
  useGate(userModel.UserSettingsGate)

  const { user, userLoading } = useUnit({
    user: userModel.$user,
    userLoading: userApi.getMeQuery.$pending,
  })

  return (
    <>
      {userLoading ? (
        <div className="flex justify-center items-center w-full h-64">
          <Loader size={30} />
        </div>
      ) : (
        <div className="flex flex-col mt-10 w-full max-w-lg mx-auto p-6 rounded-lg shadow-md">
          <Box className="w-full text-center">
            <Flex direction="column" align="center">
              <Avatar
                src={user?.profile_picture ?? ''}
                variant="light"
                radius=""
                color="indigo"
                size="xl"
                className="border border-slate-200 dark:border-slate-600 rounded-full mb-2"
              />
              {user?.nickname && (
                <Text size="lg" fw={500} aria-label="User Nickname" className="mb-2">
                  {user.nickname}
                </Text>
              )}
              {user?.email && (
                <Text size="sm" c="dimmed" aria-label="User Email" className="mb-1">
                  {user.email}
                </Text>
              )}
              {user?.date_joined && (
                <Text size="xs" c="dimmed" aria-label="User Date Joined" className="mb-4">
                  Joined on: {new Date(user.date_joined).toLocaleDateString()}
                </Text>
              )}
              <Button
                variant="light"
                color="blue"
                radius="md"
                className="mt-4"
                aria-label="Edit Profile Picture"
              >
                Edit Profile Picture
              </Button>
            </Flex>
            <Divider my="lg" />
          </Box>

          <UpdateProfileForm />
        </div>
      )}
    </>
  )
}

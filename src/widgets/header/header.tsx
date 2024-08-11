import { AppShell, Avatar, Burger, Flex, Group, Menu, Text } from '@mantine/core'
import { IconExternalLink } from '@tabler/icons-react'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import { userModel } from '@/entities/user'
import { Icon } from '@/shared/ui/icon'

type HeaderProps = {
  navbarExpanded: boolean
  toggleNavbar: VoidFunction
}

export const Header = ({ navbarExpanded, toggleNavbar }: HeaderProps) => {
  const navigate = useNavigate()
  const { handleLogout, user } = useUnit({
    handleLogout: userModel.logoutClicked,
    user: userModel.$user,
  })

  const handleLogoClick = () => {
    navigate('/dashboard')
  }

  return (
    <AppShell.Header className="border-b border-slate">
      <Group h="100%" px="md" justify="space-between">
        <Flex align="center" gap="md" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <Burger
            opened={navbarExpanded}
            onClick={toggleNavbar}
            hiddenFrom="sm"
            size="sm"
            aria-label="Toggle navigation"
          />
          <Icon className="text-[1.5em] text-sapphire" name="sprite/logo" aria-label="Logo" />
          <Text size="lg" fw={700} c="dark">
            My Task Board
          </Text>
        </Flex>
        <Menu withArrow>
          <Menu.Target>
            <Group className="hover:cursor-pointer">
              <Avatar
                src={user?.profile_picture ?? ''}
                variant="light"
                radius="xl"
                color="indigo"
              />
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {user?.nickname}
                </Text>
              </div>
            </Group>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconExternalLink />}
              onClick={handleLogout}
              className={cn(
                'flex items-center p-3 rounded-md transition-colors duration-300',
                'text-black hover:bg-sapphire hover:text-white',
              )}
              aria-label="Logout"
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </AppShell.Header>
  )
}

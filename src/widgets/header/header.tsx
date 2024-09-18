import { AppShell, Avatar, Burger, Flex, Group, Menu, Text } from '@mantine/core'
import { IconLogout, IconSettings } from '@tabler/icons-react'
import cn from 'classnames'
import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import { userModel } from '@/entities/user'
import { Icon } from '@/shared/ui/icon'
import { ThemeToggleControl } from '@/shared/ui/theme-toggle-control'

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
    <AppShell.Header className="border-b border-slate-200 shadow-sm" data-testid="header">
      <Group h="100%" px="md" justify="space-between">
        <Flex
          align="center"
          gap="md"
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
          data-testid="logo-container"
        >
          <Burger
            opened={navbarExpanded}
            onClick={toggleNavbar}
            hiddenFrom="sm"
            size="sm"
            aria-label="Toggle navigation"
            className="text-slate-700 dark:text-slate-300"
            data-testid="burger-button"
          />
          <Icon
            className="text-[1.5em] text-yellow-400 dark:text-yellow-300"
            name="sprite/logo"
            aria-label="Logo"
            data-testid="logo-icon"
          />
          <Text
            size="lg"
            fw={700}
            className="text-slate-900 dark:text-slate-200"
            data-testid="logo-text"
          >
            Taskboard
          </Text>
        </Flex>
        <Group>
          <ThemeToggleControl data-testid="theme-toggle-control" />
          <Menu withArrow>
            <Menu.Target>
              <Group className="hover:cursor-pointer" data-testid="user-menu">
                <Avatar
                  src={user?.profile_picture ?? ''}
                  variant="light"
                  radius="xl"
                  color="indigo"
                  size="md"
                  className="border border-slate-200 dark:border-slate-600"
                  data-testid="user-avatar"
                />
                <div className="ml-2 hidden sm:block">
                  <Text
                    size="sm"
                    fw={500}
                    className="text-slate-900 dark:text-slate-200"
                    data-testid="user-nickname"
                  >
                    {user?.nickname}
                  </Text>
                </div>
              </Group>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconSettings size={18} />}
                onClick={() => navigate('/settings')}
                className={cn('flex items-center p-3 rounded-md')}
                aria-label="Settings"
                data-testid="settings-menu-item"
              >
                Settings
              </Menu.Item>
              <Menu.Item
                leftSection={<IconLogout size={18} />}
                onClick={handleLogout}
                className={cn('flex items-center p-3 rounded-md')}
                aria-label="Logout"
                data-testid="logout-menu-item"
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </AppShell.Header>
  )
}

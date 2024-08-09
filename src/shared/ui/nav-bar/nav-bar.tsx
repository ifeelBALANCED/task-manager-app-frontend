import { AppShell, Flex } from '@mantine/core'
import { IconDashboard, IconLayoutKanban } from '@tabler/icons-react'
import { NavLink } from '../nav-link'

export const Navbar = () => (
  <AppShell.Navbar p="md" className="bg-white">
    <Flex direction="column" gap="xs">
      <NavLink to="/dashboard" icon={<IconDashboard size={20} />} aria-label="Dashboard">
        Dashboard
      </NavLink>
      <NavLink to="/my-boards" icon={<IconLayoutKanban size={20} />} aria-label="Boards">
        Boards
      </NavLink>
    </Flex>
  </AppShell.Navbar>
)

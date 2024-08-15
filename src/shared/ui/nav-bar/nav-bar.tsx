import { AppShell, Flex } from '@mantine/core'
import { IconDashboard, IconLayoutKanban } from '@tabler/icons-react'
import { NavLink } from '../nav-link'

export const Navbar = () => (
  <AppShell.Navbar p="md" className="bg-slate-900 border-r border-slate-700">
    <Flex direction="column" gap="xs">
      <NavLink to="/dashboard" icon={<IconDashboard size={20} />} aria-label="Dashboard">
        Dashboard
      </NavLink>
      <NavLink to="/task-boards" icon={<IconLayoutKanban size={20} />} aria-label="Boards">
        Boards
      </NavLink>
    </Flex>
  </AppShell.Navbar>
)

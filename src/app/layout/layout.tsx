import { AppShell, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import { Header } from '@/widgets/header'
import { Navbar } from '@/shared/ui/nav-bar'
import { ThemeToggleControl } from '@/shared/ui/theme-toggle-control'

type LayoutVariant = 'full' | 'minimal'

type LayoutProps = Readonly<{
  variant?: LayoutVariant
}>

export const Layout = ({ variant = 'full' }: LayoutProps) => {
  const [navbarExpanded, { toggle: toggleNavbar }] = useDisclosure()

  if (variant === 'minimal') {
    return (
      <AppShell>
        <Flex w="100%" p="20px" justify="flex-end">
          <ThemeToggleControl />
        </Flex>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    )
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !navbarExpanded },
      }}
      padding="md"
    >
      <Header navbarExpanded={navbarExpanded} toggleNavbar={toggleNavbar} />
      <Navbar />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

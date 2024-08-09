import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import { Header } from '@/widgets/header'
import { Navbar } from '@/shared/ui/nav-bar'

type LayoutVariant = 'full' | 'minimal'

type LayoutProps = Readonly<{
  variant?: LayoutVariant
}>

export const Layout = ({ variant = 'full' }: LayoutProps) => {
  const [navbarExpanded, { toggle: toggleNavbar }] = useDisclosure()

  if (variant === 'minimal') {
    return (
      <AppShell>
        <Outlet />
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

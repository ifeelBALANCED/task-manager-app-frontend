import { MantineProvider as MantineCoreProvider } from '@mantine/core'
import { PropsWithChildren } from 'react'
import { theme } from '../../theme'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return (
    <MantineCoreProvider theme={theme} defaultColorScheme="light">
      {children}
    </MantineCoreProvider>
  )
}

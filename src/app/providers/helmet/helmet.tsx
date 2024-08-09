import { PropsWithChildren } from 'react'
import { HelmetProvider as HelmetAsyncProvider } from 'react-helmet-async'

export const HelmetProvider = ({ children }: PropsWithChildren) => (
  <HelmetAsyncProvider>{children}</HelmetAsyncProvider>
)

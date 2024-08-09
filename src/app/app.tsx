import { AppProviders } from './providers'
import { AppRouter } from './routes'

export const Application = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  )
}

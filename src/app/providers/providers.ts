import { combineProviders } from './combine-providers'
import { HelmetProvider } from './helmet'
import { ThemeProvider } from './mantine'

export const providers = [ThemeProvider, HelmetProvider]

export const AppProviders = combineProviders(...providers)

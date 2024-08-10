import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Application } from '@/app'
import './app/styles/index.css'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

if (!root) {
  throw new Error('Root element not found')
}

// if (process.env.VITE_NODE_ENV === 'development') {
//   const { attachFarfetchedDevTools } = await import('@farfetched/dev-tools')
//
//   attachFarfetchedDevTools()
// }

root.render(
  <StrictMode>
    <Application />
  </StrictMode>,
)

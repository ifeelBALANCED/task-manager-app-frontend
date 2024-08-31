/// <reference types="vitest" />
import * as path from 'path'
import svg from '@neodx/svg/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { default as vitePluginChecker } from 'vite-plugin-checker'
import { VitePWA } from 'vite-plugin-pwa'

import manifest from './manifest.json'

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      react(),
      vitePluginChecker({ typescript: true }),
      VitePWA({
        manifest,
        includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        // switch to "true" to enable sw on development
        devOptions: {
          enabled: false,
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
        },
      }),
      svg({
        root: 'public/icons',
        group: true,
        output: 'public/sprites',
        fileName: '{name}.{hash:8}.svg',
        metadata: {
          path: 'src/shared/ui/icon/sprite.gen.ts',
          runtime: {
            size: true,
            viewBox: true,
          },
        },
        resetColors: {
          exclude: [/^flags/, /^logos/],
          replace: ['#000', '#eee', '#6C707E'],
          replaceUnknown: 'var(--icon-color)',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      root: path.resolve(__dirname, './src'),
    },
  })
}

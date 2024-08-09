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
        root: 'public/icons', // Root folder for SVG files, all source paths will be relative to this folder
        group: true, // Group SVG files by folder
        output: 'public/sprites', // Output folder for generated files
        fileName: '{name}.{hash:8}.svg', // Add hash to file name
        metadata: {
          path: 'src/shared/ui/icon/sprite.gen.ts', // Output file for generated TypeScript definitions
          runtime: {
            // Generate additional runtime information
            size: true,
            viewBox: true,
          },
        },
        resetColors: {
          exclude: [/^flags/, /^logos/], // Exclude some icons from color reset
          replace: ['#000', '#eee', '#6C707E'], // Resets all known colors to `currentColor`
          replaceUnknown: 'var(--icon-color)', // Replaces unknown colors with custom CSS variable
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

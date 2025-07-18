import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: './src/ui/routes'
    }),
    react()
  ],
  base: './',
  build: {
    outDir: 'dist-react'
  },
  server: {
    port: 5123,
    strictPort: true
  }
})

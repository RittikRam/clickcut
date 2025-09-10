import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: [
      '51140c06-d6f7-45cc-9d06-97462342e743-00-2qqn75p6wznx6.janeway.replit.dev',
      'localhost',
      '.replit.dev'
    ],
    hmr: {
      port: 5000
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets'
    }
  }
})

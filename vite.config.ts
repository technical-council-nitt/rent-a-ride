import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from 'dotenv'
import tailwindcss from '@tailwindcss/vite'
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_ORIGIN,
        changeOrigin: false
      },
      '/auth': {
        target: process.env.VITE_BACKEND_ORIGIN,
        changeOrigin: false
      }
    }
  }





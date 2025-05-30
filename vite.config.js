// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 8088,
    allowedHosts: ['capstone2projectfe-production.up.railway.app']
  }
})

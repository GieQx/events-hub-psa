// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/events-hub-psa/',  // 👈 Update this to match your GitHub repo name!
  plugins: [react()],
})

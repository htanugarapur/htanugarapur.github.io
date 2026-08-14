import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative base so the same build works at username.github.io/ AND username.github.io/repo/
  base: './',
})

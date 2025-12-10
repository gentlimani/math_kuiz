import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Replace 'math_kuiz' with your exact repository name if it is different
  base: '/math_kuiz/',
})

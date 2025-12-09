import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // KUJDES: Ndrysho 'EMRI-REPOZITORIT' me emrin e saktë të repo-s tënde në GitHub
  // Për shembull: base: '/matematika-noar/'
  base: '/EMRI-REPOZITORIT/',
})

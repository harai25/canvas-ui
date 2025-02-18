import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/canvas-ui/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      "~": resolve(__dirname, 'src/canvas-ui'),
    },
  },
})

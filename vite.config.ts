import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      "~": resolve(__dirname, 'src/canvas-ui'),
    },
  },
})

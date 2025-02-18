import { resolve } from 'path'
import { defineConfig } from 'vite'
import Terminal from 'vite-plugin-terminal'

export default defineConfig({
  base: 'canvas-ui',
  plugins: [
    Terminal()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      "~": resolve(__dirname, 'src/canvas-ui'),
    },
  },
})

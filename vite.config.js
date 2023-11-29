import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'; 

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './src/assets'),
      'Components': path.resolve(__dirname, './src/Components'),
      'pages': path.resolve(__dirname, './src/pages'),
      'utils': path.resolve(__dirname, './src/Utils'),
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
})

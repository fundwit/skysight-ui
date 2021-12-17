import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import babel from 'vite-babel-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    babel()
  ],
  server: {
    proxy: {
      '/api': {
        // target: "http://127.0.0.1/",
        target: "https://skysight-core.fundwit.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

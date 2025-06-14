import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Product-Store",
  build: {
    // no .map files, no inline maps, and no comments
    sourcemap: false,            
    rollupOptions: {              
      output: {                   
        sourcemap: false          
      }
    }
  },
  server:{
    proxy:{
      '/api': {
        target:"http://localhost:5000",
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
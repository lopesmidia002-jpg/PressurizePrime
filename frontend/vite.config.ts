import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: 'react-router/dom', replacement: fileURLToPath(new URL('./node_modules/react-router/dist/production/dom-export.mjs', import.meta.url)) },
      { find: /^react-router$/, replacement: fileURLToPath(new URL('./node_modules/react-router/dist/production/index.mjs', import.meta.url)) },
    ],
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    modulePreload: {
      polyfill: false,
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn'],
      },
    },
    // Sem manualChunks: forçar um "chunk-admin" fazia o bundler puxar para dentro dele as dependências
    // compartilhadas (lucide, react-router, axios, SiteDataContext) e o site público baixava o painel
    // inteiro (~940 KB). A divisão automática pelos lazy imports do App/AdminRoutes isola o admin sozinha.
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: process.env.VITE_API_BACKEND_URL || 'http://127.0.0.1:8010',
        changeOrigin: true,
      },
    },
  },
})


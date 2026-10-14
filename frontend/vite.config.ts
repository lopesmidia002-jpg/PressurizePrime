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
      resolveDependencies(filename, deps) {
        return deps.filter(dep => !dep.includes('chunk-admin') && !dep.includes('AdminRoutes'));
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn'],
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor: React core
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // Vendor: React Router
          if (id.includes('node_modules/react-router')) {
            return 'vendor-router';
          }
          // Vendor: lucide icons (grande)
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
          // Admin chunk: carregado somente quando necessário
          if (id.includes('/pages/admin/') || id.includes('/components/admin/')) {
            return 'chunk-admin';
          }
        },
      },
    },
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


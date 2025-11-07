import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
        './Button': './src/components/Button.tsx',
      },
      shared: ['react', 'react-dom'],
      
    }),
    {
      name: 'cors-logger',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url?.includes('remoteEntry.js')) {
            console.log('🌐 CORS enabled - remoteEntry.js accessed from:', req.headers.origin || 'unknown origin')
          }
          next()
        })
      }
    }
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 5001,
    strictPort: true,
    cors: true
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: true
  }
})

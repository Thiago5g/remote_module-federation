import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const hostUrl = env.VITE_HOST_APP_URL || 'http://localhost:5173'
  const hostEntry = `${hostUrl}/assets/remoteEntry.js`
  const allowedOrigin = env.VITE_ALLOWED_ORIGIN || 'http://localhost:5173'

  return {
  plugins: [
    react(),
    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
        './Button': './src/components/Button.tsx',
      },
      remotes: {
        host: hostEntry
      },
      shared: ['react', 'react-dom', 'zustand'],
      
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
    cors: { origin: allowedOrigin, credentials: true }
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: { origin: allowedOrigin, credentials: true }
  }
}
})

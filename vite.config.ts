import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const allowed = (env.VITE_ALLOWED_ORIGINS || 'http://localhost:5173,https://host-module-federation.vercel.app')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  console.log('🔐 Allowed CORS origins:', allowed)

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
      shared: ['react', 'react-dom'],
      
    }),
    {
      name: 'dynamic-cors',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const origin = req.headers.origin
          if (origin && allowed.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin)
            res.setHeader('Vary', 'Origin')
            res.setHeader('Access-Control-Allow-Credentials', 'true')
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
            res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
          }
          if (req.method === 'OPTIONS') {
            res.statusCode = 204
            return res.end()
          }
          if (req.url?.includes('remoteEntry.js')) {
            console.log('🌐 remoteEntry.js request from', origin || 'unknown origin')
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
    // Keep permissive cors so other assets still load; script itself handled by middleware
    cors: false
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: false
  }
}
})

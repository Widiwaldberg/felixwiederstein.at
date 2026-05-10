import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const htmlRoutes: Record<string, string> = {
  '/deine-fotos': '/deine-fotos.html',
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-routes',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url && htmlRoutes[req.url.split('?')[0]]) {
            req.url = htmlRoutes[req.url.split('?')[0]]
          }
          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'deine-fotos': resolve(__dirname, 'deine-fotos.html'),
      },
    },
  },
})

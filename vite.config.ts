import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

// Runs api/booking.ts behind `npm run dev`, matching how Vercel serves the same file in production.
function bookingApi(): Plugin {
  return {
    name: 'booking-api',
    configureServer(server) {
      server.middlewares.use('/api/booking', async (request, response) => {
        try {
          const module = await server.ssrLoadModule('/api/booking.ts')
          await module.default(request, response)
        } catch (error) {
          server.ssrFixStacktrace(error as Error)
          console.error(error)
          response.statusCode = 500
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({ error: 'Online booking is temporarily unavailable. Please call 020 71833573.' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))
  return { plugins: [react(), bookingApi()] }
})
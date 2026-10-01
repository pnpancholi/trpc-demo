import { serve } from '@hono/node-server'
import { trpcServer } from '@hono/trpc-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { appRouter } from './router.js'

const server = new Hono()
server.use("/api/*", cors({ origin: "http://localhost:5173" }))
server.use("/api/trpc/*", trpcServer({ router: appRouter, endpoint: "/api/trpc" }))

server.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: server.fetch,
  port: 3000
}, (info) => {
  console.info(`Server is running on http://localhost:${info.port}`)
})

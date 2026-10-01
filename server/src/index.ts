import { serve } from '@hono/node-server'
import { trpcServer } from '@hono/trpc-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { appRouter } from './router.ts'
import { getBooks } from './book.ts'

const server = new Hono()
server.use("/api/*", cors({ origin: "http://localhost:5173" }))
server.use("/api/trpc/*", trpcServer({ router: appRouter, endpoint: "/api/trpc" }))

server.get("/api/books", async (c) => {
  return c.json(getBooks())
})

serve({
  fetch: server.fetch,
  port: 3000
}, (info) => {
  console.info(`Server is running on http://localhost:${info.port}`)
})

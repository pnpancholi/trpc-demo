import { on } from "node:events"
import { bookEvents } from "./book.ts";
import { initTRPC, TRPCError } from "@trpc/server";
import { addBook, getBooks, getBookById, normalize, updateBook } from "./book.ts";

const t = initTRPC.create();

const logger = t.middleware(async ({ path, type, next }) => {
  const start = Date.now()
  const result = await next()
  console.info(`=> [${result.ok ? "SUCCESS" : "ERROR"}] - request of type ${type} at path ${path} took ${Date.now() - start} ms`)
  return result
})

const loggedProcedure = t.procedure.use(logger)

const numberOfRequests = new Map<string, number[]>() //path, count for rate limiting record

const rateLimit = t.middleware(async ({ path, next }) => {
  const now = Date.now()
  const count = (numberOfRequests.get(path) ?? []).filter((time) => now - time < 10_000)

  if (count.length > 5) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS", message: "Slow Down"
    })
  }
  count.push(now)
  numberOfRequests.set(path, count)
  return next()
})

export const appRouter = t.router({
  book: t.router({
    list: loggedProcedure
      .use(rateLimit)
      .query(() => getBooks()),
    add: loggedProcedure
      .input((value) => value as { title: string, author: string, rating: number })
      .mutation(({ input }) => {
        if (getBooks().some(book => normalize(book.title) === normalize(input.title))) {
          throw new Error("Book already exists")
        }
        addBook(input)
      }),
    onUpdate: t.procedure.subscription(async function*({ signal }) {
      for await (const _ of on(bookEvents, "update", { signal })) {
        yield getBooks()
      }
    }),
    details: t.procedure
      .input((value) => value as { id: string })
      .query(({ input }) => getBookById(input.id)),
    update: t.procedure
      .input(value => value as { id: string, title: string, author: string, rating: number })
      .mutation(({ input }) => {
        updateBook(input.id, input)
      })

  })
})

export type AppRouter = typeof appRouter

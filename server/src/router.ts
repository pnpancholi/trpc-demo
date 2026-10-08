import { on } from "node:events"
import { bookEvents } from "./book.ts";
import { initTRPC } from "@trpc/server";
import { addBook, getBooks, getBookById, normalize, updateBook } from "./book.ts";

const t = initTRPC.create();

const logger = t.middleware(async ({ path, type, next }) => {
  console.info(`-> request of type ${type} at path ${path} `)
  const start = Date.now()
  const result = await next()
  console.info(`<- request of type ${type} at path ${path} took ${Date.now() - start} ms`)
  return result
})

const loggedProcedure = t.procedure.use(logger)

export const appRouter = t.router({
  book: t.router({
    list: loggedProcedure.query(() => getBooks()),
    add: t.procedure
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

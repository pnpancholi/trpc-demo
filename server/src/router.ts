import { initTRPC } from "@trpc/server";
import { addBook, getBooks } from "./book.ts";
const t = initTRPC.create();

export const appRouter = t.router({
  book: t.router({
    list: t.procedure.query(() => getBooks()),
    add: t.procedure
      .input((value) => value as { title: string, author: string, rating: number })
      .mutation(({ input }) => addBook(input))
  })
})

export type AppRouter = typeof appRouter

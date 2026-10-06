import { initTRPC } from "@trpc/server";
import { addBook, getBooks, normalize } from "./book.ts";

const t = initTRPC.create();

export const appRouter = t.router({
  book: t.router({
    list: t.procedure.query(() => getBooks()),
    add: t.procedure
      .input((value) => value as { title: string, author: string, rating: number })
      .mutation(({ input }) => {
        if (getBooks().some(book => normalize(book.title) === normalize(input.title))) {
          throw new Error("Book already exists")
        }
        addBook(input)
      }),

  })
})

export type AppRouter = typeof appRouter

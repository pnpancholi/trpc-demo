import { initTRPC } from "@trpc/server";
import { getBooks } from "./book.ts";
const t = initTRPC.create();

export const appRouter = t.router({
  book: t.router({
    list: t.procedure.query(() => getBooks())
  })
})

export type appRouter = typeof appRouter

import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure.query(function() {
    return "Hello from tRPC"
  })
})

export type appRouter = typeof appRouter

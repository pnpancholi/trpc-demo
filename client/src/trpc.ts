import { createTRPCClient, httpSubscriptionLink, splitLink, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/src/router"

export const trpc = createTRPCClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => op.type === "subscription",
      true: httpSubscriptionLink({ url: "http://localhost:3000/api/trpc" }),
      false: httpBatchLink({ url: "http://localhost:3000/api/trpc" })
    })
  ]
})

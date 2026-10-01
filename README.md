# tRPC Demo

## Goal

The goal of this repo is serve as a learning exercise for tRPC. To learn how remote procdural calls work and what problems they solve for us.

## Stack

- [tRPC](https://trpc.io/) - tRPC layer
- [Hono](https://hono.dev/) - server
- [React](https://react.dev/) - client

## Phases

### Phase One - Hello tRPC

- Setting up initTRPC
- Mount it on server
- Create tRPC client

### Phase Two - Input and Mutations

- Add input schemas andvalidation
- Create mutation queries.
- Storing data in-memory on server.
- Make mutation queries from client.

### Phase Three - Context and Middleware

- Create context to handle header and payload.
- Adding `protectedProcidure` middleware for authorization.
- [TBA]
- [TBA]

### Phase Four - Structure and Error

- Split routers for domian (e.g:- book, user, task), merged under `appRouter`.
- Consistent error handling with `TRCPError` on server.
- Error handling on client.



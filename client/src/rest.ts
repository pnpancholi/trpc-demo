import type { Book } from "../../server/src/book"

const BASE_URL = "http://localhost:3000/api"

export const getBooks = async (): Promise<Book[]> => {
  const res = await fetch(BASE_URL)
  if (!res.ok) throw new Error(`Request Failed ${res.status}`)
  return res.json()
}

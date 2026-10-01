export type Book = {
  id: string
  title: string
  author: string
  rating: number
  addedAt: string
}

const books: Book[] = [
  { id: "1", title: "Feel Good Productivity", author: "Ali Abdaal", rating: 4, addedAt: new Date().toISOString() },
]

export function getBooks(): Book[] {
  return books
}


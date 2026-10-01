export type Book = {
  id: string
  title: string
  author: string
  rating: number
  addedAt: string
}

const formatDate = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

const books: Book[] = [
  { id: "1", title: "Feel Good Productivity", author: "Ali Abdaal", rating: 4.1, addedAt: formatDate(new Date()) },
  { id: "2", title: "The Courage to be Disliked", author: "n/a", rating: 5.4, addedAt: formatDate(new Date()) },
  { id: "3", title: "Man's Search for Meaning", author: "n/a", rating: 4.5, addedAt: formatDate(new Date()) }
]

export function getBooks(): Book[] {
  return books
}

export function addBook(input: { title: string, author: string, rating: number }): Book {
  const book: Book = {
    id: crypto.randomUUID(),
    title: input.title,
    author: input.author,
    rating: input.rating,
    addedAt: formatDate(new Date())
  }
  books.push(book)
  return book
}


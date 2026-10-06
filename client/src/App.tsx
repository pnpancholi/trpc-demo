import './App.css'
import React from "react"
import { trpc } from './trpc'
import type { Book } from '../../server/src/book'

type Books = Awaited<ReturnType<typeof trpc.book.list.query>>

export default function App() {
  const [books, setBooks] = React.useState<Books>([])

  React.useEffect(() => {
    trpc.book.list.query().then(setBooks)
  }, [])

  return (
    <>
      <a href="/add">Add a book</a>
      <BookList books={books} />
    </>
  )
}

function BookList({ books }: { books: Book[] }) {
  return (
    <ul className="book-list">
      {
        books.map(book => (
          <li key={book.id} className="book-item">
            <span className="book-title">{book.title}</span>
            <span className="book-author">{book.author}</span>
            <span className="book-rating">{book.rating}</span>
            <span className="book-date">{book.addedAt}</span>
          </li>
        ))
      }
    </ul>
  )
}


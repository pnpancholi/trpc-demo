import './App.css'
import React from "react"
import { trpc } from './trpc'
import { getBooks, type Book } from '../../server/src/book'

type Books = Awaited<ReturnType<typeof trpc.book.list.query>>

function App() {
  const [books, setBooks] = React.useState<Books>([])

  React.useEffect(() => {
    trpc.book.list.query().then(setBooks)
    setBooks(getBooks())
  }, [])

  return (
    <>
      <h1>The Amazing Book App</h1>
      <div className="container">
        <BookList books={books} />
      </div>
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


export default App

import React from "react"
import { trpc } from "./trpc"
import { useParams } from "react-router-dom"
import type { Book } from "../../server/src/book"

export default function EditBook() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = React.useState(true)
  const [book, setBook] = React.useState<Book>()


  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook(prev => ({ ...prev!, [e.target.name]: e.target.value }))
  }

  const handleOnSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    if (!id || !book) return
    trpc.book.update.mutate({ ...book, id })
  }

  React.useEffect(() => {
    if (!id) return
    trpc.book.details.query({ id })
      .then(setBook)
      .finally(() => setIsLoading(false))
  }, [id])
  return (
    <>
      <h2> Edit Book </h2>
      {isLoading
        ? "loading..."
        : <EditForm
          book={book!}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
        />
      }
    </>
  )
}

function EditForm({ book, handleOnChange, handleOnSubmit }: { book: Book, handleOnChange: any, handleOnSubmit: any }) {
  return (
    <form
      onSubmit={handleOnSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "400px", margin: "100px auto" }}
    >
      <input name="title" value={book?.title} onChange={handleOnChange} />
      <input name="author" value={book?.author} onChange={handleOnChange} />
      <input name="rating" value={book?.rating} onChange={handleOnChange} />
      <button type="submit">Save Changes</button>
      <a href="/">Back</a>
    </form>
  )
}

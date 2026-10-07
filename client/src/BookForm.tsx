import React from "react"
import { trpc } from "./trpc"

export default function BookForm() {

  const [form, setForm] = React.useState({ title: "", author: "", rating: 0 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form!!!, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    trpc.book.add.mutate(form)
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "400px", margin: "100px auto" }}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="author" placeholder="Author" onChange={handleChange} />
        <input
          name="rating"
          type="number"
          placeholder="Rating"
          onChange={handleChange}
          min={0} max={5} step={1} />
        <button type="submit">Submit</button>
        <a href="/">Back</a>
      </form >
    </>
  )
}

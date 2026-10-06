import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "./App"
import BookForm from "./BookForm"

function Shell() {
  return (
    <>
      <h1> The Amazing Book App </h1>
      <Outlet />
    </>
  )
}
export const router = createBrowserRouter([
  {
    element: <Shell />, children: [
      { path: "/", element: <App /> },
      { path: "/add", element: <BookForm /> }
    ]
  }
])

import React from "react"
import Book from "../components/Book"
import { useBooks } from "../hooks/useBooks"

const Books = () => {
  const { error, loading, data } = useBooks()

  return (
    <div className="flex flex-wrap">
      {data.books.map((book) => (
        <Book book={book} />
      ))}
    </div>
  )
}

export default Books

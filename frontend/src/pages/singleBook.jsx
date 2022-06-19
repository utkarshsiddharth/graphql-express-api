import React from "react"
import { useBook } from "../hooks/useBook"
import { useParams } from "react-router-dom"
import Book from "../components/Book"

const SingleBook = () => {
  const params = useParams()
  const { error, loading, data } = useBook(1)
  if (loading) {
    return (
      <h1 className="bg-indigo-600 text-2xl font-medium text-white text-center py-2 px-6">
        Fetching the data<span className="text-3xl">...</span>
      </h1>
    )
  }

  if (error) {
    return (
      <h1 className="bg-red-500 text-2xl font-medium text-white text-center py-2 px-6">
        Something went wrong ':('
      </h1>
    )
  }

  return <Book book={data.book} />
}

export default SingleBook

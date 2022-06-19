import React from "react"
import { Link } from "react-router-dom"
const Book = ({ book }) => {
  return (
    <div class="xl:w-1/3 md:w-1/2 p-4">
      <div class="border border-gray-200 p-6 rounded-lg">
        <div className="flex justify-between">
          <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLine="round"
              strokeLineJoin="round"
              strokeWidth="2"
              class="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
            #{book.id}
          </h2>
        </div>

        <p class="leading-relaxed text-base">
          <span className="font-semibold text-xl block">Book Name:</span>{" "}
          <Link to={`/books/${book.id}`}>{book.name}</Link>
        </p>
      </div>
    </div>
  )
}

export default Book

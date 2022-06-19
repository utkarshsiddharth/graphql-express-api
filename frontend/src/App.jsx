import React from "react"
import Books from "./pages/books"
import { FaLongArrowAltRight } from "react-icons/fa"
import { Routes, Route, Link } from "react-router-dom"
import SingleBook from "./pages/singleBook"
const App = () => {
  return (
    <div className=" p-20 w-[90%] max-w-[1440px] mx-auto">
      <div className="flex justify-center mb-8 items-center gap-4">
        <FaLongArrowAltRight size={26} />
        <h1 className="text-5xl lg:text-6xl text-center font-semibold border-b-2 border-gray-700 max-w-fit">
          <Link to="/books">Books</Link>
        </h1>
      </div>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook />} />
      </Routes>
    </div>
  )
}

export default App

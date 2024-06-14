import React from "react";
import { Routes, Route } from "react-router-dom";
import Createbook from "./pages/CreateBooks";
import Home from "./pages/Home"
import DeleteBook from "./pages/DeleteBooks"
import EditBook from "./pages/EditBooks"
import ShowBook from './pages/ShowBooks';

const App = () => {
  console.log("app")
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<Createbook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
    </Routes>
  )
}

export default App;
import "../StudentBookManagement/SSearchBook.css";

import React, { useState, useEffect } from "react";
import { searchBook } from "../Api/api";
import { useNavigate } from "react-router-dom";

function BSearchBook() {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();



  const handleSearch = (event) => {
    event.preventDefault(); // Prevent form submission

    const searchData = {
      title: title.trim(),
      author: author.trim(),
      category: category.trim()
    };

    searchBook(searchData)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error("Error searching books:", error);
      });
  };

  const handleHomeButton = () => {
    
      navigate("/BookManagement");
    
  };

  const handleLogoutButton = () => {
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="form-control-search-book">
        <button
          onClick={handleHomeButton}
          className="home-button-adjust-search-book-page"
        >
          Home
        </button>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search by title"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Search by author"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Search by category"
        />
        <button type="submit" className="search-button-adjust-search-book-page">
          Search
        </button>
        <button
          onClick={handleLogoutButton}
          className="logout-button-adjust-search-book-page"
        >
          Logout
        </button>
      </form>

      <table className="ssearch-book-styled-table">
        <thead>
          <tr>
            <th>Book Id</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((book) => (
            <tr key={book.bookId}>
              <td>{book.bookId}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BSearchBook;

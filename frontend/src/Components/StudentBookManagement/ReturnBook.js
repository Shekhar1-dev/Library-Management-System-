import "./ReturnBook.css";

import React, { useState } from 'react';
import { returnBook } from '../Api/api';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const ReturnBook = () => {
  const [borrowingId, setBorrowingId] = useState('');

  // Function to handle form submission and call the returnBook method
  const handleSubmit = (event) => {
    event.preventDefault();

    // Call returnBook function
    returnBook(borrowingId)
      .then((response) => {
        
        if(response.data === "Book returned successfully."){
            toast.success("Book returned successfully.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
              });
        }
      })
      .catch((error) => {
        if(error.response.data === "Invalid borrowing ID or book already returned."){
            toast.error("Invalid borrowing ID or book already returned.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
              });
        }

    });
  };

  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate("/loginBookManagement");
  };


  const handleLogoutButton = () => {
    navigate("/"); 
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="return-form-control">
      <button onClick={handleHomeButton} className="return-home-button">Home</button>

        <input
          type="text"
          value={borrowingId}
          onChange={(e) => setBorrowingId(e.target.value)}
          placeholder="Enter borrowing ID"
        />
        <button type="submit" className="return-book-page-button">Return Book</button>
      <button onClick={handleLogoutButton} className="return-book-logout-button">Logout</button>  

      </form>
    </div>
  );
};



export default ReturnBook;

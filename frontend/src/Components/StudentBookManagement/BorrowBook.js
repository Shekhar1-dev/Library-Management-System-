import "./BorrowBook.css";

import React, { useState } from 'react';
import { borrowBook } from '../Api/api';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


function BorrowBook () {
  const [bookId, setBookId] = useState('');
  // const [message, setMessage] = useState('');

  // Function to handle input change and update the bookId state
  const handleInputChange = (event) => {
    setBookId(event.target.value);
  };

  // Function to handle form submission and call the borrowBook method
  const handleSubmit = (event) => {
    event.preventDefault();
    borrowBook(bookId)
      .then((response) => {
        // setMessage(response.data);
        console.log(response.data);
        if(response.data === "Book borrowed successfully."){
        toast.success("Book borrowed successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });}
       
    })
      .catch((error) => {
        // setMessage(error.response.data);
        if(error.response.data === "Book not available."){
          toast.error("Book not available.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
        }
         else if(error.response.data === "Book Limit reached."){
          toast.success("Book Limit reached.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
      });}
      else if(error.response.data === "User not authenticated."){
        toast.success("User not authenticated.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        
      });}});
  };

  const navigate = useNavigate();

  const handleLogoutButton = () => {
    navigate("/"); 
  };

  const handleHomeButton = () => {
    navigate("/loginBookManagement"); 
  };

  return (
    <>
    <div className="borrow-page-adjust">
      <ToastContainer />
      <button onClick={handleHomeButton} className="borrow-book-home-button">Home</button>  
      <h2 className="borrow-book-adjust-text">Borrow Book</h2>
      <form className="form-control-borrow" onSubmit={handleSubmit}>
        <input
          type="text"
          value={bookId}
          onChange={handleInputChange}
          placeholder="Enter book ID"
        />
        <button className="borrow-book-page-button" type="submit">Borrow</button>

      <button onClick={handleLogoutButton} className="borrow-book-logout-button">Logout</button>  

      </form>
      {/* {message && <p>{message}</p>} */}
    </div>
    <p className="fine-message">* We kindly request that you return the book prior to the due date to avoid incurring a charge of 10 per day after the due date has passed.</p>

    </>
  );
}



export default BorrowBook;

import {React, useState} from "react";
import "./StudentBookManagement.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { addBook } from "../Api/api";
import { useNavigate } from "react-router-dom";

import bookExplore from "../bookExplore.png";


function StudentBookManagement(){

    // state logic for Adding book
    const [successMsg, setSuccessMsg] = useState("");
    const {
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
      toast.success("User registration is successful.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });

    // Make an HTTP POST request to the backend API
    addBook(data)
    .then((response) => {
      // Handle successful response
      console.log(response.data);
    })
    .catch((error) => {
      // Handle error response
      console.error(error);
    });
      reset();
    };



    const navigate = useNavigate();

      const handleSearchButton = () => {
      navigate("/SSearchingBook"); 
      };
    
      const handleBorrowButton = () => {
        navigate("/borrowBook"); 
      };

      const handleBorrowHistoryButton = () => {
        navigate("/borrowRecord"); 
      };

      const handleReturnButton = () => {
        navigate("/returnBook"); 
      };


      const handleLogoutButton = () => {
        navigate("/"); 
      };


    return(
      <>
        <div className="student-book-management">
            <button onClick={handleSearchButton} className="sbm-button">Search</button>  
            <button onClick={handleBorrowButton} className="sbm-button">Borrow Book</button> 
            <button onClick={handleBorrowHistoryButton} className="sbm-button">Borrow History</button>
            <button onClick={handleReturnButton} className="sbm-button">Return</button> 
            <button onClick={handleLogoutButton} className="sbm-logout-button">Logout</button>  


        </div>
            <img className="book-image" src={bookExplore} alt="Student-reading-book" />
        </>
    );
}


export default StudentBookManagement;


// search, books, borrow, return, history, logout
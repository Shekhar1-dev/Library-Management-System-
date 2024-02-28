import { useForm } from "react-hook-form";
import "./DeleteBook.css";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { deleteBook } from "../Api/api";
import { useNavigate } from "react-router-dom";


function DeleteBook() {
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {

    const bookId = parseInt(data.bookId); // Parse bookId as a number

    // Make an HTTP DELETE request to the backend API
    deleteBook(bookId)
      .then((response) => {
        // Handle successful response
        console.log(response);
        toast.success("Book deleted successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        });
      })
      .catch((error) => {
        // Handle error response
        console.error(error);
        toast.error("Book Id not present", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        });
      });

    reset();
  };


  const navigate = useNavigate();

  const handleLogoutButton = () => {
    navigate("/"); 
  };

  const handleHomeButton = () => {
    navigate("/BookManagement");
  };

  return (
    <div className="FormComponentHolder">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="FormComponent">
        {successMsg && <p className="success-msg">{successMsg}</p>}

        <div className="space-under-1">
          <label className="registration-form-text">Delete Book</label>
          <button onClick={handleHomeButton} className="home-button-adjust-delete-book-page">Home</button>
          <button onClick={handleLogoutButton} className="delete-logout-button">Logout</button>  
        </div>

        <div className="form-control">
          <label>Book Id</label>
          <input
            type="number"
            name="bookId"
            {...register("bookId", {
              required: "* Book id is required."
            })}
          />
          {errors.bookId && (
            <p className="errorMsg">{errors.bookId.message}</p>
          )}
        </div>

        <div className="form-control">
          <button type="submit" className="delete-button">Delete Book</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteBook;

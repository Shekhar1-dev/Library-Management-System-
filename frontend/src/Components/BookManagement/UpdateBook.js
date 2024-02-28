import "./UpdateBook.css";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { updateBook } from "../Api/api";
import { useNavigate } from "react-router-dom";


function UpdateBook() {
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    const bookId = parseInt(data.bookId); // Parse bookId as a number

    // Prepare the updated book details
    const updatedBook = {
      // Include the fields you want to update
      title: data.title,
      author: data.author,
      category: data.category
    };

    // Make an HTTP PUT request to the backend API
    updateBook(bookId, updatedBook)
      .then((response) => {
        // Handle successful response
        console.log(response);
        toast.success("Book updated successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        });
      })
      .catch((error) => {
        // Handle error response
        console.error(error);
        toast.error("Book id not present.", {
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
          <label className="registration-form-text">Update Book</label>
          <button onClick={handleHomeButton} className="home-button-adjust-update-book-page">Home</button>
          <button onClick={handleLogoutButton} className="update-logout-button">Logout</button>  

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
          {errors.bookId && <p className="errorMsg">{errors.bookId.message}</p>}
        </div>

        <div className="form-control">
          <label>Book Title</label>
          <input type="text" name="title" {...register("title")} />
        </div>

        <div className="form-control">
          <label>Book Author</label>
          <input type="text" name="author" {...register("author")} />
        </div>

        <div className="form-control">
          <label>Book Category</label>
          <input type="text" name="category" {...register("category")} />
        </div>

        <div className="form-control">
          <label></label>
          <button type="submit" className="update-book-button">Update details</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateBook;

import React, { useState } from "react";
import "./AddBook.css";
import { addBook } from "../Api/api";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";


function AddBook() {
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (addBookData) => {

    // Make an HTTP POST request to the backend API
    addBook(addBookData)
      .then((response) => {
        // Handle successful response
        console.log(response.addBookData);
        toast.success("Book added successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000
        });
      })
      .catch((error) => {
        // Handle error response
        console.error(error);
        toast.error("Failed to add the book.", {
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
        <button onClick={handleHomeButton} className="home-button-adjust-add-book-page">Home</button>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="FormComponent">
        {successMsg && <p className="success-msg">{successMsg}</p>}

        <div className="space-under-2">
          <button onClick={handleLogoutButton} className="addBook-logout-button">Logout</button>  
        </div>

        <label className="registration-form-text-3">Add Book</label>

        <div className="form-control">
          <label>Title</label>
          <input type="text" name="title" {...register("title",{
            required: "* Title of the book is required.",
          })} />
          {errors.title && <p className="errorMsg">{errors.title.message}</p>}

        </div>

        <div className="form-control">
          <label>Author</label>
          <input type="text" name="author" {...register("author",{
            required: "* Author of the book is required.",
          })} />
          {errors.author && <p className="errorMsg">{errors.author.message}</p>}

        </div>

        <div className="form-control">
          <label>Category</label>
          <input type="text" name="category" {...register("category", {
            required: "* Category of the book is required.",
          } )} />
          {errors.category && <p className="errorMsg">{errors.category.message}</p>}

        </div>

        <div className="form-control">
          <label>Quantity</label>
          <input type="text" name="totalQuantity" {...register("totalQuantity", {
            required: "* Total Quantity of the book is required.",
          } )} />
          {errors.totalQuantity && <p className="errorMsg">{errors.totalQuantity.message}</p>}

        </div>

        <div className="form-control">
          <label></label>
          <button type="submit" className="addbook-button">Add Book</button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;

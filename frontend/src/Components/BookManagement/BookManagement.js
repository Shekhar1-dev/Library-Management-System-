import "./BookManagement.css";

import {React, useState} from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { addBook, showBooks } from "../Api/api";
import { useNavigate } from "react-router-dom";




function BookManagement(){

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

    const handleAddButton = () => {
        navigate("/addingBook"); 
      };

    
      const handleSearchButton = () => {
        navigate("/BSearchingBook"); 

      };

      const handleDeleteButton = () => {
        navigate("/deletingBook"); 
      };

      const handleUpdateButton = () => {
        navigate("/updatingBook"); 
      };

      const handleLogoutButton = () => {
        navigate("/"); 
      };



    return(
        <div>
            
            <button onClick={handleSearchButton} className="bm-button">Search</button>  
            
            {/* Add Book logic */}
            <button onClick={handleAddButton} className="bm-button">Add</button>
            <button onClick={handleUpdateButton} className="bm-button">Update</button>
            <button onClick={handleDeleteButton} className="bm-button">Delete</button>
            <button onClick={handleLogoutButton} className="sbm-logout-button">Logout</button>  



        </div>
    );
}


export default BookManagement;
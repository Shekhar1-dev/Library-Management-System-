import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./StudentLogin.css";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { studentLogin } from "../Api/api";


function StudentLogin() {
  
    
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
      

    // Make an HTTP POST request to the backend API
  studentLogin(data)
    .then((response) => {
      // Handle successful response
      console.log(response.data);

      if(response.data === "Login successful."){
        
        toast.success("Login successful.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });

        handleLoginButton();
      }
    })
    .catch((error) => {
      // Handle error response
      console.log(error.response.data);

      if(error.response.data === "Invalid credentials"){

        toast.error("Invalid credentials.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
    });
      reset();
    };


    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate("/"); 
      };

    const handleLoginButton = () => {
      navigate("/loginBookManagement");
    }
  

  return (

    <div className="FormComponentHolder">

      <ToastContainer /> 

      <form onSubmit={handleSubmit(onSubmit)} className="FormComponent">
        {successMsg && <p className="success-msg">{successMsg}</p>}

        <div className="space-under-1">
        <label className="registration-form-text">Login</label>
        <button className="login-page-home-button" onClick={handleHomeButton}>Home</button>
        </div>

        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: "*Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid."
              }
            })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </div>


        {/* Password code */}
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 6,
                matchPattern: (value) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    value
                  )
              }
            })}
          />
          {errors.password?.type === "required" && (
            <p className="errorMsg">*Password is required.</p>
          )}
          {errors.password?.type === "checkLength" && (
            <p className="errorMsg">
              Password should be at-least 6 characters.
            </p>
          )}
          {errors.password?.type === "matchPattern" && (
            <p className="errorMsg">
              *Password should contain at least one uppercase letter, lowercase
              letter, digit, and special symbol.
            </p>
          )}
        </div>

        <div className="form-control">
          <label></label>
          <button className="login-page-login-button" type="submit">Login</button>
        </div>
    
      </form>
      </div>
  );
}


export default StudentLogin;

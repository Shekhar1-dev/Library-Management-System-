import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./StudentRegister.css";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { studentRegister } from "../Api/api";

function StudentRegister() {
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
    studentRegister(data)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
        if (response.data === "Student registered successfully.") {
          toast.success("Student registration is successful.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
            
          });
          handleRegisterButton();
        }
      })
      .catch((error) => {
        // Handle error response
        console.error(error.response.data);

        if(error.response.data === "Student already registered.")
        {
          toast.error("Student already registered.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          });
        }
      });
    reset();
  };

  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate("/");
  };

  const handleRegisterButton = () => {
    navigate("/StudentLogin");
  };


  return (
    <div className="FormComponentHolder">
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className="FormComponent">
        {successMsg && <p className="success-msg">{successMsg}</p>}

        <div className="space-under-1">
          <label className="registration-form-text">Registration Form</label>
          <button className="home-button-registration-page" onClick={handleHomeButton}>
            Home
          </button>
        </div>

        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            {...register("sname", { required: "*Name is required." })}
          />
          {errors.name && (
            <p className="errorMsg">{errors.sname.message}</p>
          )}
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
          <label>Gender</label>
          <input
            type="radio"
            value="male"
            {...register("gender", { required: "*Gender is required." })}
          />
          <label className="adjustRadioElements">Male</label>

          <input
            type="radio"
            value="female"
            {...register("gender", { required: "*Gender is required." })}
          />
          <label className="adjustRadioElements">Female</label>

          <input
            type="radio"
            value="others"
            {...register("gender", { required: "*Gender is required." })}
          />
          <label className="adjustRadioElements">Others</label>

          {errors.gender && (
            <p className="errorMsg">{errors.gender.message}</p>
          )}
        </div>

        <div className="form-control">
          <label></label>
          <button className="register-button-registration-page" type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default StudentRegister;

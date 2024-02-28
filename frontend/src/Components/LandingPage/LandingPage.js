import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./LandingPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SSearchBook from "../StudentBookManagement/SSearchBook";

function LandingPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  const handleLibrarianSubmitButton = (data) => {
    setContent(data.accessCode);
    const message = data.accessCode;
    if (data.accessCode === "INPWCLS") {
      toast.success("Access Granted.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      navigate("/BookManagement");
    } else {
      toast.error("Access Denied.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };

  const handleRegisterButton = () => {
    navigate("/StudentRegister");
  };

  const handleLoginButton = () => {
    navigate("/StudentLogin");
  };

  return (
    <div className="FormComponentHolder1">
      <ToastContainer />
      <form className="FormComponent1">
        <div className="form-control1-student-area">
          <label>
            <h1>Librarian</h1>
          </label>
          <label>Access code</label>
          <input type="text" {...register("accessCode", { required: "*Access code is required." })} />
          {errors.accessCode && (
            <p className="errorMsg">{errors.accessCode.message}</p>
          )}

          <button type="button" onClick={handleSubmit(handleLibrarianSubmitButton)} className="landing-submit-button">Submit</button>

        </div>

        <div className="form-control2-student-area">
          <label>
            <h1>Student</h1>
          </label>
          <button className="landing-submit-button" onClick={handleRegisterButton}>Register</button>
          <button className="landing-submit-button" onClick={handleLoginButton}>Login</button>
        </div>
      </form>
    </div>
  );
}

export default LandingPage;

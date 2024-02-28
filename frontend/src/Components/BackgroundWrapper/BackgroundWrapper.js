import "./BackgroundWrapper.css";

import React, { useState, useEffect, Children } from "react";
import { Route, Routes, useLocation,  } from 'react-router-dom';
import StudentRegister from "./StudentRegisterationPage/StudentRegister";

import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./LandingPage/LandingPage";




function BackgroundWrapper({children}){


//To know the cuurent location
  const location = useLocation();
  const [headingClassName, setHeadingClassName] = useState("");


  useEffect(() => {
    // Add or remove the CSS class based on the current location
    if (location.pathname === "/StudentRegister") {
      document.body.classList.add("body-background");
      setHeadingClassName("StudentRegisterPage");
    } else if (location.pathname === "/") {
      document.body.classList.add("LandingPage-background");
      setHeadingClassName("LandingPage");
    } else {
      document.body.classList.remove("body-background");
      setHeadingClassName(""); // Reset the class name if not on specified routes
    }
  }, [location]);


  return (
    <>
      <h1 className={headingClassName}>College library System</h1>

      {children}
  
    </>
  );

}


export default BackgroundWrapper;

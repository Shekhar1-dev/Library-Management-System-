import "./App.css";

import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation,  } from 'react-router-dom';
import StudentRegister from "./StudentRegisterationPage/StudentRegister";

import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./LandingPage/LandingPage";
import StudentLogin from "./StudentLoginPage/StudentLogin";
import BookManagement from "./BookManagement/BookManagement";
import AddBook from "./BookManagement/AddBook";
import BSearchBook from "./BookManagement/BSearchBook";
import SSearchBook from "./StudentBookManagement/SSearchBook";
import DeleteBook from "./BookManagement/DeleteBook";
import UpdateBook from "./BookManagement/UpdateBook";
import StudentBookManagement from "./StudentBookManagement/StudentBookManagement";
import BorrowRecord from "./BorrowRecord/BorrowRecord";
import ReturnBook from "./StudentBookManagement/ReturnBook";
import BorrowBook from "./StudentBookManagement/BorrowBook";

import logo from "./logo.png";



function App(){


//To know the cuurent location
  const location = useLocation();
  const [headingClassName, setHeadingClassName] = useState("");


  useEffect(() => {
    // Add or remove the CSS class based on the current location
    if (location.pathname === "/StudentRegister") {
      document.body.classList.add("body-background-1");
      setHeadingClassName("LandingPage");
    } else if (location.pathname === "/") {
      document.body.classList.add("body-background-1");
      setHeadingClassName("LandingPage");
    } else if (location.pathname === "/StudentLogin") {
      document.body.classList.add("body-background-1");
      setHeadingClassName("LandingPage");
    } else if(location.pathname === "/loginBookManagement"){
      document.body.classList.remove("body-background-1");
      document.body.classList.add("body-background-2");
      setHeadingClassName("loginBookManagement");
    }else if(location.pathname === "/BookManagement"){
      document.body.classList.remove("body-background-1");
      document.body.classList.add("body-background-2");
      setHeadingClassName("BookManagement");
    }else {
      document.body.classList.remove("body-background-1");
      document.body.classList.remove("body-background-2");
      setHeadingClassName(""); // Reset the class name if not on specified routes
    }
  }, [location]);


  return (
    <>
      <div className="adjust-header">
        <img src={logo} alt="Logo" className="logo-adjust"/>
        <h1 className={headingClassName}>College Library System</h1>
      </div>
      
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/StudentRegister" element={<StudentRegister />} /> 
          <Route exact path="/StudentLogin" element={<StudentLogin />} />
          <Route exact path="/BookManagement" element={<BookManagement />} />
          <Route exact path="/loginBookManagement" element={<StudentBookManagement />} />
          <Route exact path="/addingBook" element={<AddBook />} />
          <Route exact path="/BSearchingBook" element={<BSearchBook />} />
          <Route exact path="/SSearchingBook" element={<SSearchBook />} />
          <Route exact path="/deletingBook" element={<DeleteBook />} />
          <Route exact path="/updatingBook" element={<UpdateBook />} />
          <Route exact path="/borrowRecord" element={<BorrowRecord />} />
          <Route exact path="/returnBook" element={<ReturnBook />} />
          <Route exact path="/borrowBook" element={<BorrowBook />} />


        </Routes>
    </>
  );

}



export default App;

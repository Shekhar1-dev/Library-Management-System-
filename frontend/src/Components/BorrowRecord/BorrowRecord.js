import "./BorrowRecord.css";

import React, { useState } from 'react';
import { getBorrowings } from '../Api/api';
import { useNavigate } from "react-router-dom";

const BorrowRecord = () => {
  const [studentId, setStudentId] = useState('');
  const [borrowings, setBorrowings] = useState([]);

  // Function to handle input change and update the studentId state
  const handleInputChange = (event) => {
    setStudentId(event.target.value);
  };

  // Function to handle form submission and call the getBorrowings method
  const handleSubmit = (event) => {
    event.preventDefault();

    // Call getBorrowings function inside handleSubmit
    getBorrowings(studentId)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setBorrowings(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate("/loginBookManagement");
  };

  const handleLogoutButton = () => {
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="borrow-record-form-adjust">
      <button onClick={handleHomeButton} className="borrow-record-home-button">Home</button>
      <h2 className="borrow-record-adjust-text">Book History</h2>

        <input
          type="text"
          value={studentId}
          onChange={handleInputChange}
          placeholder="Enter student ID"
        />
        <button type="submit" className="borrow-record-getRecord-button">Get</button>
        <button onClick={handleLogoutButton} className="borrow-record-logout-button">Logout</button>

      </form>


        <h2 className="borrowings-text-adjust">Borrowings</h2>
        {borrowings.length > 0 ? (
          <table className="styled-table">
            <thead>
              <tr>
                <th>Borrowing ID</th>
                <th>Book Title</th>
                <th>Borrowing Date</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {borrowings.map((borrowing) => (
                <tr key={borrowing.borrowingId}>
                  <td>{borrowing.borrowingId}</td>
                  <td>{borrowing.book.title}</td>
                  <td>{borrowing.borrowingDate}</td>
                  <td>{borrowing.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No borrowings found.</p>
        )}
      </div>
  
  );
};

export default BorrowRecord;

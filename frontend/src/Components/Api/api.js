import axios from 'axios';


const BASE_URL = 'http://localhost:9090/api/library';   //API base URL

// For Student registration
export const studentRegister = (data) => {
  return axios.post(`${BASE_URL}/register`, data);
};


// For Student registration
export const studentLogin = (data) => {
  return axios.post(`${BASE_URL}/login`, data);
};


// For Adding book by Librarian
export const addBook = (addBookData) => {
    return axios.post(`${BASE_URL}/books/add-book`, addBookData);
  };


  // For Show books
export const showBooks = () => {
  return axios.get(`${BASE_URL}/books/show`);
};

// For Searching book
export const searchBook = (searchData) => {
  return axios.get(`${BASE_URL}/books/search`, {
    params: searchData
  });
};


//For Deleting book by book id
export const deleteBook = (bookId) => {
  return axios.delete(`${BASE_URL}/books/${bookId}`);
};


// For updating book by book id
export const updateBook = (bookId, updatedBook) => {
  return axios.put(`${BASE_URL}/books/${bookId}`, updatedBook);
};


// For showing Borrow record by student id
export const getBorrowings = (studentId) => {
  return axios.get(`${BASE_URL}/students/${studentId}/borrowings`);
};


// For returning book by borrower id
export const returnBook = (borrowingId) => {
  return axios.post(`${BASE_URL}/books/${borrowingId}/return`);
};



// For borrowing book by book id
export const borrowBook = (bookId) => {
  return axios.post(`${BASE_URL}/books/${bookId}/borrow`);
};







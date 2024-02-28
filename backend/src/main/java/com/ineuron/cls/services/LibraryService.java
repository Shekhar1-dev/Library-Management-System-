package com.ineuron.cls.services;

import com.ineuron.cls.entities.*;

import java.util.List;

public interface LibraryService {

    // Student Registration
    boolean registerStudent(Student student);

    boolean checkStudentExists(String email);

    //Student login
    boolean authenticateStudent(Student student);

    // Book Management
    void addBook(Book book);
    boolean deleteBook(Long bookId);
    Book updateBook(Book book);
    Book getBookById(Long bookId);
//    List<Book> searchBooksByAuthor(String author);
//    List<Book> searchBooksByTitle(String title);
//    List<Book> searchBooksByCategoryName(String category);

    List<Book> searchBooksByTitleAuthorCategory(String title, String author, String category);

    List<Book> getAllBooks();

    String borrowBook(Long bookId, String email, String password, Student student);

    List<Borrowing> getBorrowingRecordsByStudentId(Long studentId);

    boolean returnBook(Long borrowingId);



    // Librarian Registration
    void registerLibrarian(Librarian librarian);



}

package com.ineuron.cls.controllers;

import com.ineuron.cls.entities.*;
import com.ineuron.cls.repositories.BookRepository;
import com.ineuron.cls.services.LibraryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/library")
@CrossOrigin(origins = "http://localhost:3000") // Replace with your frontend URL
public class LibraryController {

    private final LibraryService libraryService;
    private final BookRepository bookRepository;

    private Student authenticatedStudent;


    @Autowired
    public LibraryController(LibraryService libraryService, BookRepository bookRepository) {
        this.libraryService = libraryService;
        this.bookRepository = bookRepository;
    }

    //ok
    @PostMapping("/register")
    public ResponseEntity<String> registerStudent(@RequestBody Student student) {
        boolean studentExists = libraryService.checkStudentExists(student.getEmail());
        if (studentExists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Student already registered.");
        }

        boolean registerStatus = libraryService.registerStudent(student);

        if (registerStatus) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Student registered successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register student.");
        }
    }


    @PostMapping("/login")
    public ResponseEntity<String> loginStudent(@RequestBody Student student) {
        boolean isAuthenticated = libraryService.authenticateStudent(student);

        if (isAuthenticated) {
            authenticatedStudent = student;
            return ResponseEntity.ok("Login successful.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


    @PostMapping("/books/add-book")
    public ResponseEntity<String> addBook(@RequestBody Book book) {
        libraryService.addBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body("Book added successfully.");
    }



    @DeleteMapping("/books/{bookId}")
    public ResponseEntity<String> deleteBook(@PathVariable Long bookId) {
        boolean deleted = libraryService.deleteBook(bookId);
        if (deleted) {
            return ResponseEntity.ok("Book deleted successfully.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/books/{bookId}")
    public ResponseEntity<Book> updateBook(@PathVariable Long bookId, @RequestBody Book updatedBook) {
        Book existingBook = libraryService.getBookById(bookId);
        if (existingBook == null) {
            return ResponseEntity.notFound().build();
        }

        // Update the book details
        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthor(updatedBook.getAuthor());
        existingBook.setCategory(updatedBook.getCategory());

        Book savedBook = libraryService.updateBook(existingBook);
        return ResponseEntity.ok(savedBook);
    }


    @GetMapping("/books/{bookId}")
    public ResponseEntity<Book> getBookById(@PathVariable Long bookId) {
        Book book = libraryService.getBookById(bookId);
        if (book != null) {
            return ResponseEntity.ok(book);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//    @GetMapping("/books/show")
//    public ResponseEntity<List<Book>> searchBooks()
//    {
//
//        List<Book> books;
//
//        books = libraryService.getAllBooks();
//
//        // Logging the returned response
//        Logger logger = LoggerFactory.getLogger(getClass());
//        logger.info("Returned books: {}", books);
//
//        return ResponseEntity.ok(books);
//    }

    @GetMapping("/books/search")
    public ResponseEntity<List<Book>> searchBooks(
            @RequestParam(value = "title", required = false, defaultValue = "") String title,
            @RequestParam(value = "author", required = false, defaultValue = "") String author,
            @RequestParam(value = "category", required = false, defaultValue = "") String category) {

        List<Book> books;

        books = libraryService.getAllBooks();

        if (title.isEmpty() && author.isEmpty() && category.isEmpty()) {
            books = libraryService.getAllBooks();
        } else {
            books = libraryService.searchBooksByTitleAuthorCategory(title, author, category);
        }

        // Logging the returned response
        Logger logger = LoggerFactory.getLogger(getClass());
        logger.info("Returned books: {}", books);

        return ResponseEntity.ok(books);
    }


    @PostMapping("/books/{bookId}/borrow")
    public ResponseEntity<String> borrowBook(@PathVariable Long bookId) {
        if (authenticatedStudent != null) {
            String email = authenticatedStudent.getEmail();
            String password = authenticatedStudent.getPassword();
            String borrowed = libraryService.borrowBook(bookId, email, password, authenticatedStudent);
            System.out.println(borrowed); //check
            if (borrowed.equals("Book borrowed successfully."))
                return ResponseEntity.ok("Book borrowed successfully.");
            else if(borrowed.equals("Book not available."))
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Book not available.");
            else if(borrowed.equals("Book Limit reached."))
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Book Limit reached.");
            else
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not authenticated.");

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated.");
        }
    }

    @GetMapping("/students/{studentId}/borrowings")
    public ResponseEntity<List<Borrowing>> getBorrowingRecords(@PathVariable Long studentId) {
        List<Borrowing> borrowingRecords = libraryService.getBorrowingRecordsByStudentId(studentId);
        return ResponseEntity.ok(borrowingRecords);
    }



    @PostMapping("/books/{borrowingId}/return")
    public ResponseEntity<String> returnBook(@PathVariable Long borrowingId) {
        boolean returned = libraryService.returnBook(borrowingId);
        if (returned) {
            return ResponseEntity.ok("Book returned successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid borrowing ID or book already returned.");
        }
    }





}

package com.ineuron.cls.services.impl;

import com.ineuron.cls.entities.*;
import com.ineuron.cls.repositories.BookRepository;
import com.ineuron.cls.repositories.BorrowingRepository;
import com.ineuron.cls.repositories.LibrarianRepository;
import com.ineuron.cls.repositories.StudentRepository;
import com.ineuron.cls.services.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LibraryServiceImpl implements LibraryService {

    private final StudentRepository studentRepository;
    private final BookRepository bookRepository;
    private final LibrarianRepository librarianRepository;
    private final BorrowingRepository borrowingRepository;


    @Autowired
    public LibraryServiceImpl(StudentRepository studentRepository, BookRepository bookRepository,
                              LibrarianRepository librarianRepository, BorrowingRepository borrowingRepository) {
        this.studentRepository = studentRepository;
        this.bookRepository = bookRepository;
        this.librarianRepository = librarianRepository;
        this.borrowingRepository = borrowingRepository;
    }

    @Override
    public boolean registerStudent(Student student) {
        String email = student.getEmail();
        boolean studentExists = checkStudentExists(email);

        if (studentExists) {
            // Student with the same email already exists
            return false;
        }

        // Save the student to the database
        studentRepository.save(student);
        return true;
    }

    public boolean checkStudentExists(String email) {
        return studentRepository.existsByEmail(email);
    }


    @Override
    public boolean authenticateStudent(Student student) {
        student = studentRepository.findByEmailAndPassword(student.getEmail(), student.getPassword());
        return student != null;
    }

    @Override
    public void addBook(Book book) {
        bookRepository.save(book); // Save the book
    }


    @Override
    public boolean deleteBook(Long bookId) {
        Optional<Book> optionalBook = bookRepository.findById(bookId);
        if (optionalBook.isPresent()) {
            bookRepository.deleteById(bookId);
            return true;
        } else {
            return false;
        }
    }


    @Override
    public Book updateBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book getBookById(Long bookId) {
        return bookRepository.findById(bookId).orElse(null);
    }


    public List<Book> searchBooksByTitleAuthorCategory(String title, String author, String category) {
        return bookRepository.findByTitleContainingIgnoreCaseAndAuthorContainingIgnoreCaseAndCategoryContainingIgnoreCase(title, author, category);
    }


    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }


    @Override
    public void registerLibrarian(Librarian librarian) {
        librarianRepository.save(librarian);
    }


    @Override
    public String borrowBook(Long bookId, String email, String password, Student authenticatedStudent) {
        System.out.println(bookId);
        authenticatedStudent = getAuthenticatedStudent(email,password);
        if (authenticatedStudent != null) {
            Optional<Book> optionalBook = bookRepository.findById(bookId);
            if (optionalBook.isPresent()) {

                Book book = optionalBook.get();
                if (book.getAvailableQuantity() > 0 && authenticatedStudent.getBookCounter() < 3) {

                    // Create a new borrowing record
                    Borrowing borrowing = new Borrowing();
                    borrowing.setBorrower(authenticatedStudent);
                    borrowing.setBook(book);
                    borrowing.setBorrowingDate(LocalDate.now());
                    borrowing.setDueDate(LocalDate.now().plusDays(book.getBorrowingPeriod()));

                    // Save the borrowing record
                    Borrowing savedBorrowing = borrowingRepository.save(borrowing);

//                    System.out.println("bcount: " + book.getAvailableQuantity());
                    // Update book quantity
                    book.setAvailableQuantity(book.getAvailableQuantity());
                    bookRepository.save(book);

//                    System.out.println("acount: " + book.getAvailableQuantity());

                    authenticatedStudent.setBookCounter();
                    System.out.println(authenticatedStudent.getBookCounter());
                    return "Book borrowed successfully.";
                }else
                    return "Book Limit reached.";
            }
            return "Book not available.";

        }
        return "User not authenticated.";
    }

    private Student getAuthenticatedStudent(String email, String password) {
        // Implement your authentication mechanism to retrieve the currently authenticated student
        // Return the authenticated student or null if not authenticated
        // You can use your existing authentication logic here

        // Example code for authentication using equals() method
        System.out.println("Entered authenticate state");
        System.out.println( email + " , " + password);
        Student authenticatedStudent = studentRepository.findByEmailAndPassword(email, password);
        if (authenticatedStudent != null) {
            System.out.println("Hi there inside");
            return authenticatedStudent;
        }
        return null;
    }

    @Override
    public List<Borrowing> getBorrowingRecordsByStudentId(Long studentId) {
        return borrowingRepository.findByBorrowerSid(studentId);
    }





    @Override
    public boolean returnBook(Long borrowingId) {
        Optional<Borrowing> optionalBorrowing = borrowingRepository.findById(borrowingId);
        if (optionalBorrowing.isPresent()) {
            Borrowing borrowing = optionalBorrowing.get();
            if (borrowing.getReturnDate() == null) {
                borrowing.returnBook();
                borrowingRepository.save(borrowing);

                // Update book quantity
                Book book = borrowing.getBook();
                book.setAvailableQuantity(book.getTotalQuantity() + 1);
                bookRepository.save(book);

                return true;
            }
        }
        return false; // Invalid borrowing ID or book already returned
    }






}

package com.ineuron.cls.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;
import java.util.Optional;

@Entity
@Table(name = "books")
public class Book {

    @OneToMany(mappedBy = "book")
    @JsonIgnore
    private List<Borrowing> borrowings;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long bookId;

    @Column(name = "title", nullable = false, unique = true, length = 50)
    private String title;

    @Column(name = "author", nullable = false, length = 50)
    private String author;


    @Column(name = "category", nullable = false, length = 50)
    private String category;


    @Column(name = "totalQuantity")
    private int totalQuantity;

    public List<Borrowing> getBorrowings() {
        return borrowings;
    }

    public void setBorrowings(List<Borrowing> borrowings) {
        this.borrowings = borrowings;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

//    @Column(name = "borrowed_quantity")
//    private int borrowedQuantity = 0;

//    public int getBorrowedQuantity() {
//        return borrowedQuantity;
//    }
//
//    public void setBorrowedQuantity(int borrowedQuantity) {
//        this.borrowedQuantity = borrowedQuantity;
//    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public Book() {}


    public Book(List<Borrowing> borrowings, Long bookId, String title, String author, String category, int totalQuantity) {
        this.borrowings = borrowings;
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.category = category;
        this.totalQuantity = totalQuantity;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }


    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    public int getAvailableQuantity() {
        return totalQuantity - 1;
    }



    public Student getBorrower() {
        Optional<Borrowing> borrowing = borrowings.stream()
                .filter(b -> b.getReturnDate() == null)
                .findFirst();
        return borrowing.map(Borrowing::getBorrower).orElse(null);
    }

    public int getBorrowingPeriod() {
        // Add your logic to return the borrowing period for the book
        // For example, you can have a borrowing period property in the Book entity or category-related logic.
        return 14; // Example: assuming a borrowing period of 14 days
    }

    public void setAvailableQuantity(int quantity) {
        this.totalQuantity = quantity;
    }

    public double getFinePerDay() {
        // Add your logic to return the fine amount per day for the book
        // For example, you can have a finePerDay property in the Book entity or category-related logic.
        return 10; // Example: assuming a fine of 10 per day
    }

    @Override
    public String toString() {
        return "Book{" +
                "bookId=" + bookId +
                ", bookTitle='" + title + '\'' +
                ", bookAuthor='" + author + '\'' +
                ", bookCategory=" + category +
                '}';
    }

}

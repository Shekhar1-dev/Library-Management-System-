package com.ineuron.cls.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "borrowings")
public class Borrowing {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "borrowing_id")
    private Long borrowingId;

    @ManyToOne
    @JoinColumn(name = "sid")
    private Student borrower;


    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(name = "borrowing_date")
    private LocalDate borrowingDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    @Column(name = "fine_amount")
    private double fineAmount;

    public Borrowing() {}

    public Borrowing(Student borrower, Book book, LocalDate borrowingDate, LocalDate dueDate) {
        this.borrower = borrower;
        this.book = book;
        this.borrowingDate = borrowingDate;
        this.dueDate = dueDate;
    }

    public Long getBorrowingId() {
        return borrowingId;
    }

    public void setBorrowingId(Long borrowingId) {
        this.borrowingId = borrowingId;
    }

    public Student getBorrower() {
        return borrower;
    }

    public void setBorrower(Student borrower) {
        this.borrower = borrower;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public LocalDate getBorrowingDate() {
        return borrowingDate;
    }

    public void setBorrowingDate(LocalDate borrowingDate) {
        this.borrowingDate = borrowingDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public double getFineAmount() {
        return fineAmount;
    }

    public void setFineAmount(double fineAmount) {
        this.fineAmount = fineAmount;
    }

    public void borrowBook(Student borrower, Book book, int borrowingPeriod) {
        this.borrower = borrower;
        this.book = book;
        this.borrowingDate = LocalDate.now();
        this.dueDate = LocalDate.now().plusDays(borrowingPeriod);
    }

    public void returnBook() {
        this.returnDate = LocalDate.now();

        // Calculate fine amount if the book is returned late
        if (returnDate.isAfter(dueDate)) {
            long daysLate = ChronoUnit.DAYS.between(dueDate, returnDate);
            double finePerDay = book.getFinePerDay();
            this.fineAmount = daysLate * finePerDay;
        }
    }

    @Override
    public String toString() {
        return "Borrowing{" +
                "borrowingId=" + borrowingId +
                ", borrower=" + borrower +
                ", book=" + book +
                ", borrowingDate=" + borrowingDate +
                ", dueDate=" + dueDate +
                ", returnDate=" + returnDate +
                ", fineAmount=" + fineAmount +
                '}';
    }
}

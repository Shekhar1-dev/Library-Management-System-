package com.ineuron.cls.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "borrow_records")
public class BorrowRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "borrowing_id")
    private Borrowing borrowing;

    @Column(name = "return_date")
    private LocalDate returnDate;


}


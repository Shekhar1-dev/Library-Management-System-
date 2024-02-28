package com.ineuron.cls.repositories;

import com.ineuron.cls.entities.Book;
import com.ineuron.cls.entities.Borrowing;
import com.ineuron.cls.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BorrowingRepository extends JpaRepository<Borrowing, Long> {

    Optional<Borrowing> findByBookAndReturnDateIsNull(Book book);

    List<Borrowing> findByBorrowerSid(Long studentId);





}

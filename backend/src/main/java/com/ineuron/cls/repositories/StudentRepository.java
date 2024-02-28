package com.ineuron.cls.repositories;

import com.ineuron.cls.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {

    Student findByEmailAndPassword(String email, String password);

    boolean existsByEmail(String email);


}

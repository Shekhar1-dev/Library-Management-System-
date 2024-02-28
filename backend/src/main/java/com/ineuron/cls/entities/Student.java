package com.ineuron.cls.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.awt.print.Book;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long sid;

    @Column(length = 50)
    private String sname;

    @Column(length = 50, unique = true)
    private String email;

    @Column(length = 50, unique = true)
    private String password;

    private LocalDate regDate;

    @Column(length = 1)
    private int BookCounter=0;

    private int fineBal;

    @Column(length = 8)
    private String gender;

    @OneToMany(mappedBy = "borrower", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Borrowing> borrowings;

    public Student() {}

    public Student(Long sid, String sname, String email, String password, int maxBookAllowed, int fineBal, String gender) {
        this.sid = sid;
        this.sname = sname;
        this.email = email;
        this.password = password;
        this.fineBal = fineBal;
        this.gender = gender;
    }

    //For current date auto load and submit
    @PrePersist
    public void prePersist() {
        regDate = LocalDate.now();
    }

    public Long getSid() {
        return sid;
    }

    public void setSid(Long sid) {
        this.sid = sid;
    }

    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


//    public LocalDate getRegDate() {
//        return regDate;
//    }

//    public void setRegDate(LocalDate regDate) {
//        this.regDate = regDate;
//    }

    public int getBookCounter() {
        return BookCounter;
    }

    public void setBookCounter() {
        this.BookCounter = BookCounter+1;
    }

    public int getFineBal() {
        return fineBal;
    }

    public void setFineBal(int fineBal) {
        this.fineBal = fineBal;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public List<Borrowing> getBorrowings() {
        return borrowings;
    }

    public void setBorrowings(List<Borrowing> borrowings) {
        this.borrowings = borrowings;
    }

    @Override
    public String toString() {
        return "Student{" +
                "sid=" + sid +
                ", sname='" + sname + '\'' +
                ", email='" + email + '\'' +
                ", regDate=" + regDate +
                ", BookCounter=" + BookCounter +
                ", fineBal=" + fineBal +
                ", gender=" + gender +
                '}';
    }
}

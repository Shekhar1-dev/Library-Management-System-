package com.ineuron.cls.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "librarians")
public class Librarian {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long librarianId;

    @Column(name = "name", length = 50)
    private String lname;


    public Librarian() {}

    public Librarian(Long librarianId, String lname) {
        this.librarianId = librarianId;
        this.lname = lname;
    }

    public Long getLibrarianId() {
        return librarianId;
    }

    public void setLibrarianId(Long librarianId) {
        this.librarianId = librarianId;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    @Override
    public String toString() {
        return "Librarian{" +
                "librarianId=" + librarianId +
                ", lname='" + lname + '\'' +
                '}';
    }
}


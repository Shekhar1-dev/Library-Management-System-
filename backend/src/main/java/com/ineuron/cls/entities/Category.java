//package com.ineuron.cls.entities;
//
//import jakarta.persistence.*;
//import java.util.List;
//
//@Entity
//@Table(name = "categories")
//public class Category {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    @Column(name = "category_id")
//    private Long categoryId;
//
//    @Column(length = 50)
////  @Enumerated(EnumType.STRING)
//    private String categoryName;
//
//
//    @OneToMany(mappedBy = "bookCategory")
//    private List<Book> books;
//
//    public Category() {}
//
//    public Category(Long categoryId, String categoryName) {
//        this.categoryId = categoryId;
//        this.categoryName = categoryName;
//    }
//
//    public Long getCategoryId() {
//        return categoryId;
//    }
//
//    public void setCategoryId(Long categoryId) {
//        this.categoryId = categoryId;
//    }
//
//    public String getCategoryName() {
//        return categoryName;
//    }
//
//    public void setCategoryName(String categoryName) {
//        this.categoryName = categoryName;
//    }
//
//
//    public List<Book> getBooks() {
//        return books;
//    }
//
//    public void setBooks(List<Book> books) {
//        this.books = books;
//    }
//
//    @Override
//    public String toString() {
//        return "Category{" +
//                "categoryId=" + categoryId +
//                ", categoryName='" + categoryName + '\'' +
//                '}';
//    }
//}

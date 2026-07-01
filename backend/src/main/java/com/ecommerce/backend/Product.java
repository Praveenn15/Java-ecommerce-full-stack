package com.ecommerce.backend;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;

    @Column(columnDefinition ="TEXT")
    private String imageurl;
    private int stock;
// One Category can have many Products
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}

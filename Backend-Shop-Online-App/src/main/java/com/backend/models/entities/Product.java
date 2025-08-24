package com.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "text", nullable = false)
    private String description;

    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name="deleted", nullable = false)
    private Boolean deleted = false;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    List<ProductImage> images;

    @ManyToMany(mappedBy = "productList")
    @JsonIgnoreProperties("productList")
    private List<Command> commandList;


}

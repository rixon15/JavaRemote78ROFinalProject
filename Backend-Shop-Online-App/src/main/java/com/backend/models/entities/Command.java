package com.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
@Data
@Entity
@Table(name = "commands")
public class Command {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    @Column(nullable = false)
    private Double total;
    @Column(nullable = false, columnDefinition = "text")
    private String details;
    @Enumerated(value = EnumType.STRING)
    private PaymentStatus paymentStatus;

    @Column(nullable = false)
    private Boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    @JsonIgnoreProperties("commandList")
    private User customer;

    @ManyToMany
    @JoinTable(name = "commands_products",
    joinColumns = @JoinColumn(name = "command_id", referencedColumnName = "id"),
    inverseJoinColumns = @JoinColumn(name ="product_id", referencedColumnName = "id"))
    @JsonIgnoreProperties("commandList")
    private List<Product> productList;
}

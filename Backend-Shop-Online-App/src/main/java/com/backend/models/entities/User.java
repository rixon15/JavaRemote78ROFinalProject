package com.backend.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, columnDefinition = "text")
    private String address;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private String phone;
    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private UserRole userRole;
    @Column(nullable = false)
    private Boolean deleted = false;

    @OneToMany(mappedBy = "customer")
    @JsonIgnoreProperties("customer")
    private List<Command> commandList;

}

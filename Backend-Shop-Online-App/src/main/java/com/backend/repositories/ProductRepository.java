package com.backend.repositories;

import com.backend.models.entities.Product;
import com.backend.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductsByPrice(double price);

//    Select * from products where price = 100

    Product findProductByNameContainingIgnoreCaseAndDescriptionContainingIgnoreCase(String name, String description);

//    JPQL Java Persistence Query Language
//    @Query("SELECT p FROM Product p where p.price = :price")
    @Query(value ="Select * from products where price = :price", nativeQuery = true)
    Product cautaProdusulDupaPret(@Param("price") double price);

    List<Product> findAllByDeletedIsFalse();

    List<Product> findAllByDeletedIsTrue();

    @Transactional
    @Modifying
    @Query("UPDATE Product p SET p.deleted = :deleted WHERE p.id = :id")
    void updateDeletedById(@Param("id") Long id, @Param("deleted") boolean deleted);
}

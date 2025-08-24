package com.backend.repositories;

import com.backend.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsUserByEmail(String email);

    Optional<User> findByEmail(String email);

    List<User> findAllByDeletedIsFalse();

    List<User> findAllByDeletedIsTrue();

    @Transactional
    @Modifying
    @Query("UPDATE User u SET u.deleted = :deleted WHERE u.id = :id")
    void updateDeletedById(@Param("id") Long id, @Param("deleted") boolean deleted);
}

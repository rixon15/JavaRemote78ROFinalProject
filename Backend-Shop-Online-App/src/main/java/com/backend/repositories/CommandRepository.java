package com.backend.repositories;

import com.backend.models.entities.Command;
import com.backend.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CommandRepository extends JpaRepository<Command, Long> {

    List<Command> findAllByDeletedIsFalse();

    List<Command> findAllByDeletedIsTrue();

    @Transactional
    @Modifying
    @Query("UPDATE Command c SET c.deleted = :deleted WHERE c.id = :id")
    void updateDeletedById(@Param("id") Long id, @Param("deleted") boolean deleted);
}

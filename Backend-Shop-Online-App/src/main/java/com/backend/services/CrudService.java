package com.backend.services;

import java.util.List;

public interface CrudService<T> {

    List<T> getAll();

    List<T> getAllDeleted();

    T getById(Long id);

    T create(T body);

    T update(T body);

    void delete(Long id);

    void recover(Long id);
}

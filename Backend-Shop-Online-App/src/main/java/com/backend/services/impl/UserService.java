package com.backend.services.impl;

import com.backend.exceptions.BadRequestException;
import com.backend.exceptions.ResourceNotFoundException;
import com.backend.models.dtos.UserDto;
import com.backend.models.entities.User;
import com.backend.models.mappers.UserMapper;
import com.backend.repositories.UserRepository;
import com.backend.services.CrudService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements CrudService<UserDto> {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Autowired
    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public List<UserDto> getAll() {
        return this.userRepository
//                .findAll()
                .findAllByDeletedIsFalse()
                .stream()
                .map((user) -> this.userMapper.toUserDto(user))
                .toList();
    }

    @Override
    public List<UserDto> getAllDeleted() {
        return this.userRepository
                .findAllByDeletedIsTrue()
                .stream()
                .map((user) -> this.userMapper.toUserDto(user))
                .toList();
    }

    @Override
    public UserDto getById(Long id) {
        if (id == null || id < 1) {
            throw new BadRequestException("Id-ul este incorect!");
        }

        User user = this.userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Utilizatorul cu id-ul: " + id + " nu a fost gasit!"));

        return this.userMapper.toUserDto(user);
    }

    public User getByEmail(String email) {
        if (email == null || email.isEmpty()) {
            throw new BadRequestException("Email-ul este invalid");
        }

        return this.userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("Utilizatorul cu email-ul: " + email + " nu a fost gasit!"));
    }

    @Override
    public UserDto create(UserDto body) {
        boolean isExist = this.userRepository.existsUserByEmail(body.getEmail());

        if (isExist) {
            throw new BadRequestException("Adresa de email exista in baza de date.");
        }

        String password = BCrypt.hashpw(body.getPassword(), BCrypt.gensalt());

        System.out.println("Parola criptata: " + password);

        body.setPassword(password); // Salvarea parolei criptate in obiectul de Dto.

        User savedUser = this.userRepository.save(this.userMapper.toUser(body));

        return this.userMapper.toUserDto(savedUser);
    }

    @Override
    public UserDto update(UserDto body) {
        if (body.getId() == null || body.getId() < 1) {
            throw new BadRequestException("Id-ul este incorect");
        }

        // Verificam daca utilizatorul exista in baza de date . Daca nu exista primim o exceptie , altfel codul merge mai departe.
        this.getById(body.getId());

        String password = BCrypt.hashpw(body.getPassword(), BCrypt.gensalt());

        System.out.println("Parola criptata: " + password);

        body.setPassword(password); // Salvarea parolei criptate in obiectul de Dto.

        User updatedUser = this.userRepository.save(this.userMapper.toUser(body));

        return this.userMapper.toUserDto(updatedUser);
    }

    @Override
    public void delete(Long id) {
        // Verificam daca utilizatorul exista in baza de date . Daca nu exista primim o exceptie , altfel codul merge mai departe.
        this.getById(id);

//        Comment this line because we don't delete products from database, this will affect shop logic
//        this.userRepository.deleteById(id);

        this.userRepository.updateDeletedById(id, true);
    }

    @Override
    public void recover(Long id) {
        UserDto user = this.getById(id);

        this.userRepository.updateDeletedById(user.getId(), false);
    }
}

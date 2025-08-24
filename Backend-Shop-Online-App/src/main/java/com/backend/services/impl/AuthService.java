package com.backend.services.impl;

import com.backend.exceptions.BadRequestException;
import com.backend.models.dtos.RegisterDto;
import com.backend.models.dtos.UserDto;
import com.backend.models.entities.User;
import com.backend.models.mappers.UserMapper;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service

public class AuthService {
    private final UserMapper userMapper;
    private final UserService userService;

    public AuthService(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    public UserDto login(String email, String password) {
        if (email.isBlank() || password.isBlank()) {
            throw new BadRequestException("Adresa de email sau parola sunt incorecte!");
        }

        User user = this.userService.getByEmail(email);
        boolean isPasswordMatch = BCrypt.checkpw(password, user.getPassword());

        if (!isPasswordMatch) {
            throw new BadRequestException("Parola este incorecta!");
        }

        return this.userMapper.toUserDto(user);
    }

    public UserDto register(RegisterDto body) {
        if (!body.getPassword().equals(body.getConfirmPassword())) {
            throw new BadRequestException("Parolele nu se potrivesc!");
        }

        UserDto user = this.userMapper.toUserDto(body);

        return this.userService.create(user);
    }
}

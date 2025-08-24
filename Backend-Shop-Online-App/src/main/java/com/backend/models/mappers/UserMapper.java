package com.backend.models.mappers;

import com.backend.models.dtos.RegisterDto;
import com.backend.models.dtos.UserDto;
import com.backend.models.entities.User;
import com.backend.models.entities.UserRole;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public User toUser(UserDto userDto) {
        User user = new User();

        user.setId(userDto.getId());
        user.setName(userDto.getName());
        user.setPassword(userDto.getPassword());
        user.setEmail(userDto.getEmail());
        user.setPhone(userDto.getPhone());
        user.setAddress(userDto.getAddress());
        user.setUserRole(userDto.getUserRole());    

        return user;
    }

    public UserDto toUserDto(User user) {
        UserDto userDto = new UserDto();

        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setPassword(user.getPassword());
        userDto.setEmail(user.getEmail());
        userDto.setPhone(user.getPhone());
        userDto.setAddress(user.getAddress());
        userDto.setUserRole(user.getUserRole());

        return userDto;
    }

    public UserDto toUserDto(RegisterDto body) {
        UserDto userDto = new UserDto();

        userDto.setName(body.getName());
        userDto.setPassword(body.getPassword());
        userDto.setEmail(body.getEmail());
        userDto.setPhone(body.getPhone());
        userDto.setAddress(body.getAddress());
        userDto.setUserRole(UserRole.CUSTOMER);

        return userDto;
    }
}

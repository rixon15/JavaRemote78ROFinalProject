package com.backend.controllers;

import com.backend.models.dtos.UserDto;
import com.backend.services.impl.UserService;
import com.backend.utils.ApiResponse;
import com.backend.utils.ResponseHandler;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin("http://localhost:4200")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse> readAll() {
        List<UserDto> userList = userService.getAll();

        return ResponseHandler.success("Lista cu toti utilizatorii.", userList);
    }

    @GetMapping("/recover")
    public ResponseEntity<ApiResponse> readAllDeleted() {
        return ResponseHandler.success("Lista cu toti utilizatorii stersi.", userService.getAllDeleted());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> readById(@PathVariable("id") Long id) {
        UserDto userDto = userService.getById(id);

        return ResponseHandler.success("Utilizatorul cu id-ul: " + id, userDto);
    }

    @PostMapping
    public ResponseEntity<ApiResponse> create(@Valid @RequestBody UserDto body) {
        UserDto userDto = userService.create(body);

        return ResponseHandler.success("Utilizator adaugat cu succes!", userDto);
    }

    @PutMapping
    public ResponseEntity<ApiResponse> update(@Valid @RequestBody UserDto body) {
        UserDto userDto = userService.update(body);

        return ResponseHandler.success("Utilizator modificat cu succes!", userDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable("id") Long id) {
        userService.delete(id);

        return ResponseHandler.success("Utilizator sters cu succes!");
    }

    @PostMapping("/recover/{id}")
    public ResponseEntity<ApiResponse> recoverById(@PathVariable("id") Long id) {
        userService.recover(id);

        return ResponseHandler.success("Utilizator recuperat cu succes!");
    }
}

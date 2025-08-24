package com.backend.controllers;

import com.backend.models.dtos.RegisterDto;
import com.backend.models.dtos.UserDto;
import com.backend.services.impl.AuthService;
import com.backend.utils.ApiResponse;
import com.backend.utils.ResponseHandler;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin("http://localhost:4200")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {

        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody Map<String, String> body) {
        if (body.isEmpty() || body.get("email") == null || body.get("password") == null) {

            return ResponseHandler.error(HttpStatus.BAD_REQUEST, "Datele de logare sunt incorecte!!");
        }
        UserDto user = this.authService.login(body.get("email"), body.get("password"));

        return ResponseHandler.success("Utilizatorul " + user.getName() + " este autentificat cu succes!", user);

    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterDto body) {
        UserDto user = this.authService.register(body);

        return ResponseHandler.success("Utilizatorul s-a inregistrat cu succes!", user);
    }
}

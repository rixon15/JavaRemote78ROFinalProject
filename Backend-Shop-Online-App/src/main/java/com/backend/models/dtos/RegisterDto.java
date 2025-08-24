package com.backend.models.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RegisterDto {
    @NotNull(message = "Campul pentru nume este null.")
    @NotBlank(message = "Numele este incorect.")
    private String name;
    @NotNull(message = "Campul pentru email este null.")
    @NotBlank(message = "Email-ul este incorect.")
    private String email;
    @NotNull(message = "Campul pentru parola este null.")
    @NotNull(message = "Parola este incorecta.")
    private String password;
    @NotNull(message = "Parolele nu se potrivesc.")
    @NotBlank(message = "Parolele nu se potrivesc.")
    private String confirmPassword;
    @NotNull(message = "Campul pentru telefonul este null.")
    @NotBlank(message = "Telefonul este incorect.")
    private String phone;
    @NotNull(message = "Campul pentru adresa este null.")
    @NotBlank(message = "Adresa este incorecta.")
    private String address;
}

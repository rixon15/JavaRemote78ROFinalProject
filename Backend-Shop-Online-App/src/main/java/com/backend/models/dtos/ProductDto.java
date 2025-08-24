package com.backend.models.dtos;
/*
Data-Transfer-Object (DTO) Design Pattern
 */

import com.backend.models.entities.ProductImage;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;
@Data
public class ProductDto {
    private Long id;
    @NotBlank(message = "Numele produsului nu este valid.")
    @NotNull(message = "Numele produsului este null.")
    private String name;
    @NotBlank(message = "Descrierea produsului nu este valida.")
    @Size(min = 8, message = "Descrierea produsului trebuie sa aibe minim 8 caractere.")
    private String description;
    @Min(value = 1, message = "Pretul trebuie sa fie pozitiv si mai mare ca 0.")
    private double price;
    @Size(min = 1, message = "Produsul trebuie sa aibe cel putin o imagine.")
    private List<ProductImage> images;
}

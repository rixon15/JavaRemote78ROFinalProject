package com.backend.models.dtos;

import com.backend.models.entities.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommandDto {
    private Long id;
    private String date;
    private String details;
    private Double total;
    private PaymentStatus paymentStatus;
    private UserDto customer;
    private List<ProductDto> products;
}

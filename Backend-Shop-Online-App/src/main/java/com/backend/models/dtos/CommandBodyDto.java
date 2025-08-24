package com.backend.models.dtos;

import com.backend.models.entities.PaymentStatus;
import lombok.Data;

import java.util.List;
@Data
public class CommandBodyDto {
    private Long id;
    private String date;
    private String details;
    private PaymentStatus paymentStatus;
    private IdDto customer;
    private List<IdDto> products;
}

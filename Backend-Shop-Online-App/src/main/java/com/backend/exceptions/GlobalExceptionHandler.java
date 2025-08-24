package com.backend.exceptions;

import com.backend.utils.ApiResponse;
import com.backend.utils.ResponseHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

//GlobalExceptionHandler = prinde exceptiile create de noi doar daca sunt RunTimeException la baza
@ControllerAdvice
public class GlobalExceptionHandler {
   @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseHandler.error(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleException(Exception ex) {
       return ResponseHandler.error(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    //Gestioneaza situatiile aparute in DTO-uri atunci cand validarile nu se indeplinesc.
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleValidationException(MethodArgumentNotValidException ex) {
       return ResponseHandler.error(HttpStatus.BAD_REQUEST, ex.getBindingResult().getAllErrors().get(0).getDefaultMessage());
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse> handleBadRequestException(BadRequestException ex) {
       return ResponseHandler.error(HttpStatus.BAD_REQUEST, ex.getMessage());
    }
}

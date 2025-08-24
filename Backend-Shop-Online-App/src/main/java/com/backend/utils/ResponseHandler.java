package com.backend.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseHandler {

    public static ResponseEntity<ApiResponse> success(String message, Object data) {
        ApiResponse response = new ApiResponse.Builder()
                .status(200)
                .message(message)
                .data(data)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    public static ResponseEntity<ApiResponse> success(String message) {
        ApiResponse response = new ApiResponse.Builder()
                .status(200)
                .message(message)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    public static ResponseEntity<ApiResponse> error(HttpStatus status, String message) {
        ApiResponse response = new ApiResponse.Builder()
                .status(status.value())
                .message(message)
                .build();

        return ResponseEntity.status(status).body(response);
    }
}

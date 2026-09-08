package com.fulfillx.backend.dto;

public record UserResponse(
        Long id,
        String email,
        String role) {
}

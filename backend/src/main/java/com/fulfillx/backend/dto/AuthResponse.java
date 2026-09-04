package com.fulfillx.backend.dto;

public record AuthResponse(
        String accessToken,
        String tokenType,
        Long userId,
        String email,
        String role) {
}
package com.fulfillx.backend.dto;

public record CurrentUserResponse(
        Long id,
        String email,
        String role) {
}
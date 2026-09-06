package com.fulfillx.backend.controller;

import com.fulfillx.backend.dto.AuthResponse;
import com.fulfillx.backend.dto.LoginRequest;
import com.fulfillx.backend.dto.RegisterRequest;
import com.fulfillx.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication", description = "User registration and authentication")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "Register a new customer", description = "Creates a customer account and returns a JWT.")
    @PostMapping("/register")
    public AuthResponse register(
            @Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @Operation(summary = "Login", description = "Authenticates a user and returns a JWT.")
    @PostMapping("/login")
    public AuthResponse login(
            @Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

}
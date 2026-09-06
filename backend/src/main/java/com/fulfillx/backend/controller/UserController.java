package com.fulfillx.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "Users", description = "Authenticated user operations")
@SecurityRequirement(name = "bearerAuth")
public class UserController {
    @Operation(summary = "Get current authenticated user")
    @GetMapping("/me")
    public String me(Authentication authentication) {
        return "Authenticated as: " + authentication.getName();
    }
}
package com.fulfillx.backend.controller;

import com.fulfillx.backend.dto.CurrentUserResponse;
import com.fulfillx.backend.entity.User;
import com.fulfillx.backend.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "Users", description = "Authenticated user operations")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    @Operation(summary = "Get current authenticated user")
    public CurrentUserResponse getCurrentUser(Authentication authentication) {
        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return new CurrentUserResponse(
                user.getId(),
                user.getEmail(),
                user.getRole().name());
    }
}
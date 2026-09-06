package com.fulfillx.backend.controller;

import com.fulfillx.backend.dto.AddToCartRequest;
import com.fulfillx.backend.dto.CartResponse;
import com.fulfillx.backend.dto.UpdateCartItemRequest;
import com.fulfillx.backend.service.CartService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v1/cart")
@Tag(name = "Cart", description = "Customer shopping cart operations")
@SecurityRequirement(name = "bearerAuth")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @Operation(summary = "Get current cart")
    @GetMapping
    public CartResponse getCart(
            Authentication authentication) {
        return cartService.getCart(
                authentication.getName());
    }

    @Operation(summary = "Add product to cart")
    @PostMapping("/items")
    public CartResponse addToCart(
            Authentication authentication,
            @Valid @RequestBody AddToCartRequest request) {
        return cartService.addToCart(
                authentication.getName(),
                request);
    }

    @Operation(summary = "Update cart item quantity")
    @PutMapping("/items/{itemId}")
    public CartResponse updateItem(
            Authentication authentication,
            @PathVariable Long itemId,
            @Valid @RequestBody UpdateCartItemRequest request) {
        return cartService.updateItem(
                authentication.getName(),
                itemId,
                request);
    }

    @Operation(summary = "Remove cart item")
    @DeleteMapping("/items/{itemId}")
    public void removeItem(
            Authentication authentication,
            @PathVariable Long itemId) {
        cartService.removeItem(
                authentication.getName(),
                itemId);
    }
}
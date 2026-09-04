package com.fulfillx.backend.controller;

import com.fulfillx.backend.dto.AddToCartRequest;
import com.fulfillx.backend.dto.CartResponse;
import com.fulfillx.backend.dto.UpdateCartItemRequest;
import com.fulfillx.backend.service.CartService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public CartResponse getCart(
            Authentication authentication) {
        return cartService.getCart(
                authentication.getName());
    }

    @PostMapping("/items")
    public CartResponse addToCart(
            Authentication authentication,
            @Valid @RequestBody AddToCartRequest request) {
        return cartService.addToCart(
                authentication.getName(),
                request);
    }

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

    @DeleteMapping("/items/{itemId}")
    public void removeItem(
            Authentication authentication,
            @PathVariable Long itemId) {
        cartService.removeItem(
                authentication.getName(),
                itemId);
    }
}
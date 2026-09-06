package com.fulfillx.backend.controller;

import com.fulfillx.backend.dto.OrderResponse;
import com.fulfillx.backend.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/v1/orders")
@Tag(name = "Orders", description = "Order checkout and order history")
@SecurityRequirement(name = "bearerAuth")
public class OrderController {

        private final OrderService orderService;

        public OrderController(OrderService orderService) {
                this.orderService = orderService;
        }

        @Operation(summary = "Checkout cart", description = "Creates an order, reserves inventory, "
                        + "processes payment, and publishes "
                        + "an OrderPaid event.")
        @PostMapping("/checkout")
        public ResponseEntity<OrderResponse> checkout(
                        Authentication authentication,
                        @RequestHeader("Idempotency-Key") String idempotencyKey) {

                OrderResponse response = orderService.checkout(
                                authentication.getName(),
                                idempotencyKey);

                return ResponseEntity.ok(response);
        }

        @Operation(summary = "Get order history")
        @GetMapping
        public ResponseEntity<Page<OrderResponse>> getOrders(
                        Authentication authentication,
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "20") int size) {

                if (page < 0) {
                        throw new IllegalArgumentException(
                                        "Page must be greater than or equal to 0");
                }

                if (size < 1 || size > 100) {
                        throw new IllegalArgumentException(
                                        "Size must be between 1 and 100");
                }

                Pageable pageable = PageRequest.of(page, size);

                return ResponseEntity.ok(
                                orderService.getOrders(
                                                authentication.getName(),
                                                pageable));
        }

        @Operation(summary = "Get order by ID")
        @GetMapping("/{orderId}")
        public ResponseEntity<OrderResponse> getOrder(
                        Authentication authentication,
                        @PathVariable Long orderId) {

                return ResponseEntity.ok(
                                orderService.getOrder(
                                                authentication.getName(),
                                                orderId));
        }
}
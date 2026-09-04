package com.fulfillx.backend.service;

import com.fulfillx.backend.dto.OrderItemResponse;
import com.fulfillx.backend.dto.OrderResponse;
import com.fulfillx.backend.entity.*;
import com.fulfillx.backend.repository.CartItemRepository;
import com.fulfillx.backend.repository.CartRepository;
import com.fulfillx.backend.repository.OrderRepository;
import com.fulfillx.backend.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    public OrderService(
            OrderRepository orderRepository,
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public OrderResponse checkout(String email) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found"));

        Cart cart = cartRepository
                .findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Cart not found"));

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());

        if (cartItems.isEmpty()) {
            throw new IllegalArgumentException(
                    "Cannot checkout an empty cart");
        }

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem item : cartItems) {

            BigDecimal subtotal = item.getProduct()
                    .getPrice()
                    .multiply(
                            BigDecimal.valueOf(
                                    item.getQuantity()));

            total = total.add(subtotal);
        }

        Order order = new Order(user, total);

        for (CartItem cartItem : cartItems) {

            OrderItem orderItem = new OrderItem(
                    order,
                    cartItem.getProduct(),
                    cartItem.getQuantity());

            order.addItem(orderItem);
        }

        Order savedOrder = orderRepository.save(order);

        cartItemRepository.deleteAll(cartItems);

        return toResponse(savedOrder);
    }

    @Transactional(readOnly = true)
    public Page<OrderResponse> getOrders(
            String email,
            Pageable pageable) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found"));

        return orderRepository
                .findByUserId(user.getId(), pageable)
                .map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrder(
            String email,
            Long orderId) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found"));

        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException(
                    "Order does not belong to this user");
        }

        return toResponse(order);
    }

    private OrderResponse toResponse(Order order) {

        List<OrderItemResponse> items = order.getItems()
                .stream()
                .map(item -> new OrderItemResponse(
                        item.getId(),
                        item.getProduct().getId(),
                        item.getProductName(),
                        item.getSku(),
                        item.getUnitPrice(),
                        item.getQuantity(),
                        item.getSubtotal()))
                .toList();

        return new OrderResponse(
                order.getId(),
                order.getStatus().name(),
                order.getTotalAmount(),
                order.getCreatedAt(),
                items);
    }
}
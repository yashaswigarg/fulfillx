package com.fulfillx.backend.service;

import com.fulfillx.backend.config.FulfillXMetrics;
import com.fulfillx.backend.dto.OrderItemResponse;
import com.fulfillx.backend.dto.OrderResponse;
import com.fulfillx.backend.entity.Cart;
import com.fulfillx.backend.entity.CartItem;
import com.fulfillx.backend.entity.IdempotencyKey;
import com.fulfillx.backend.entity.Order;
import com.fulfillx.backend.entity.OrderItem;
import com.fulfillx.backend.entity.User;
import com.fulfillx.backend.repository.CartItemRepository;
import com.fulfillx.backend.repository.CartRepository;
import com.fulfillx.backend.repository.FulfillmentRepository;
import com.fulfillx.backend.repository.IdempotencyKeyRepository;
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
        private final UserRepository userRepository;
        private final CartRepository cartRepository;
        private final CartItemRepository cartItemRepository;
        private final InventoryService inventoryService;
        private final IdempotencyKeyRepository idempotencyKeyRepository;
        private final PaymentService paymentService;
        private final FulfillmentRepository fulfillmentRepository;
        private final FulfillXMetrics metrics;

        public OrderService(
                        OrderRepository orderRepository,
                        UserRepository userRepository,
                        CartRepository cartRepository,
                        CartItemRepository cartItemRepository,
                        InventoryService inventoryService,
                        IdempotencyKeyRepository idempotencyKeyRepository,
                        PaymentService paymentService,
                        FulfillmentRepository fulfillmentRepository,
                        FulfillXMetrics metrics) {
                this.orderRepository = orderRepository;
                this.userRepository = userRepository;
                this.cartRepository = cartRepository;
                this.cartItemRepository = cartItemRepository;
                this.inventoryService = inventoryService;
                this.idempotencyKeyRepository = idempotencyKeyRepository;
                this.paymentService = paymentService;
                this.fulfillmentRepository = fulfillmentRepository;
                this.metrics = metrics;
        }

        @Transactional
        public OrderResponse checkout(
                        String email,
                        String idempotencyKey) {
                metrics.checkoutAttempt();

                if (idempotencyKey == null || idempotencyKey.isBlank()) {
                        throw new IllegalArgumentException(
                                        "Idempotency-Key header is required");
                }

                User user = userRepository
                                .findByEmail(email)
                                .orElseThrow(() -> new IllegalArgumentException("User not found"));

                var existingKey = idempotencyKeyRepository
                                .findByUserIdAndIdempotencyKey(
                                                user.getId(),
                                                idempotencyKey);

                if (existingKey.isPresent()) {

                        Order existingOrder = existingKey
                                        .get()
                                        .getOrder();

                        if (existingOrder != null) {
                                return toResponse(existingOrder);
                        }

                        throw new IllegalArgumentException(
                                        "Request with this idempotency key is already being processed");
                }

                Cart cart = cartRepository
                                .findByUserId(user.getId())
                                .orElseThrow(() -> new IllegalArgumentException("Cart not found"));

                List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());

                if (cartItems.isEmpty()) {
                        throw new IllegalArgumentException(
                                        "Cannot checkout an empty cart");
                }

                Order order = new Order(user);

                BigDecimal total = BigDecimal.ZERO;

                for (CartItem cartItem : cartItems) {

                        var product = cartItem.getProduct();

                        OrderItem orderItem = new OrderItem(
                                        order,
                                        product,
                                        cartItem.getQuantity());

                        order.addItem(orderItem);

                        total = total.add(orderItem.getSubtotal());
                }

                order.setTotalAmount(total);

                Order savedOrder = orderRepository.save(order);

                for (OrderItem orderItem : savedOrder.getItems()) {
                        inventoryService.reserve(
                                        savedOrder,
                                        orderItem);
                }
                paymentService.processPayment(savedOrder);

                IdempotencyKey key = new IdempotencyKey(
                                user,
                                idempotencyKey);

                key.attachOrder(savedOrder);

                idempotencyKeyRepository.save(key);

                cartItemRepository.deleteAll(cartItems);

                return toResponse(savedOrder);
        }

        @Transactional(readOnly = true)
        public Page<OrderResponse> getOrders(
                        String email,
                        Pageable pageable) {

                User user = userRepository
                                .findByEmail(email)
                                .orElseThrow(() -> new IllegalArgumentException("User not found"));

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
                                .orElseThrow(() -> new IllegalArgumentException("User not found"));

                Order order = orderRepository
                                .findById(orderId)
                                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

                if (!order.getUser().getId().equals(user.getId())) {
                        throw new IllegalArgumentException(
                                        "You are not allowed to access this order");
                }

                return toResponse(order);
        }

        private OrderResponse toResponse(Order order) {

                List<OrderItemResponse> items = order
                                .getItems()
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

                var fulfillmentOpt = fulfillmentRepository.findByOrderId(order.getId());
                String fulfillmentStatus = fulfillmentOpt
                                .map(f -> f.getStatus().name())
                                .orElse(null);
                String trackingNumber = fulfillmentOpt
                                .map(f -> f.getTrackingNumber())
                                .orElse("KALA-TRK-" + order.getId() + "90");
                String currentStage = fulfillmentOpt
                                .map(f -> f.getCurrentStage())
                                .orElse("ORDER_VERIFIED");
                String originHub = fulfillmentOpt
                                .map(f -> f.getOriginHub())
                                .orElse("Regional Artisan Hub");

                return new OrderResponse(
                                order.getId(),
                                order.getStatus().name(),
                                order.getTotalAmount(),
                                items,
                                fulfillmentStatus,
                                trackingNumber,
                                currentStage,
                                originHub,
                                order.getCreatedAt(),
                                order.getUpdatedAt());
        }
}
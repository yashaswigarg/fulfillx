package com.fulfillx.backend.service;

import com.fulfillx.backend.entity.*;
import com.fulfillx.backend.repository.InventoryReservationRepository;
import com.fulfillx.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InventoryService {

    private final ProductRepository productRepository;
    private final InventoryReservationRepository reservationRepository;

    public InventoryService(
            ProductRepository productRepository,
            InventoryReservationRepository reservationRepository) {
        this.productRepository = productRepository;
        this.reservationRepository = reservationRepository;
    }

    @Transactional
    public void reserve(
            Order order,
            OrderItem orderItem) {

        Product product = productRepository
                .findByIdForUpdate(
                        orderItem.getProduct().getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Product not found"));

        int requested = orderItem.getQuantity();

        int available = product.getStockQuantity();

        if (available < requested) {
            throw new IllegalArgumentException(
                    "Insufficient stock for product: "
                            + product.getName());
        }

        product.setStockQuantity(
                available - requested);

        productRepository.save(product);

        InventoryReservation reservation = new InventoryReservation(
                order,
                product,
                requested);

        reservationRepository.save(reservation);
    }
}
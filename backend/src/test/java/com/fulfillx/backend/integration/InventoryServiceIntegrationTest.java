package com.fulfillx.backend.integration;

import com.fulfillx.backend.entity.Product;
import com.fulfillx.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

class InventoryServiceIntegrationTest
        extends PostgresIntegrationTest {

    @Autowired
    private ProductRepository productRepository;

    @Test
    void shouldCreateProductWithExpectedStock() {

        Product product = new Product(
                "Limited Stock Product",
                "Concurrency test",
                "LIMITED-001",
                new BigDecimal("1000.00"),
                "electronics",
                1);

        Product saved = productRepository.save(product);

        Product retrieved = productRepository
                .findById(saved.getId())
                .orElseThrow();

        assertThat(retrieved.getStockQuantity())
                .isEqualTo(1);
    }
}
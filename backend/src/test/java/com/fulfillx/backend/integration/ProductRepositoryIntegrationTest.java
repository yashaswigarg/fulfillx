package com.fulfillx.backend.integration;

import com.fulfillx.backend.entity.Product;
import com.fulfillx.backend.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

class ProductRepositoryIntegrationTest
        extends PostgresIntegrationTest {

    @Autowired
    private ProductRepository productRepository;

    @Test
    void shouldPersistAndRetrieveProduct() {

        Product product = new Product(
                "Test Keyboard",
                "Integration test product",
                "TEST-KB-001",
                new BigDecimal("4999.00"),
                "electronics",
                25);

        Product saved = productRepository.save(product);

        assertThat(saved.getId()).isNotNull();

        Product retrieved = productRepository
                .findById(saved.getId())
                .orElseThrow();

        assertThat(retrieved.getName())
                .isEqualTo("Test Keyboard");

        assertThat(retrieved.getSku())
                .isEqualTo("TEST-KB-001");

        assertThat(retrieved.getStockQuantity())
                .isEqualTo(25);
    }
}
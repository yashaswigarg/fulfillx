package com.fulfillx.backend.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record ProductResponse(
        Long id,
        String name,
        String description,
        String sku,
        BigDecimal price,
        String category,
        Integer stockQuantity,
        Boolean active,
        OffsetDateTime createdAt,
        OffsetDateTime updatedAt) {
}
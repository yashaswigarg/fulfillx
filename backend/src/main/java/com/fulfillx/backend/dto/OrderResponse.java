package com.fulfillx.backend.dto;

import java.math.BigDecimal;
import java.time.OffsetDateTime;
import java.util.List;

public record OrderResponse(
                Long id,
                String status,
                BigDecimal totalAmount,
                List<OrderItemResponse> items,
                String fulfillmentStatus,
                OffsetDateTime createdAt,
                OffsetDateTime updatedAt) {
}
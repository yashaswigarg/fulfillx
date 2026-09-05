package com.fulfillx.backend.event;

import java.math.BigDecimal;

public record PublishedOrderPaidEvent(
        Long eventId,
        Long orderId,
        Long userId,
        BigDecimal amount) {
}
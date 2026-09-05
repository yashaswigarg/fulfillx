package com.fulfillx.backend.event;

import java.math.BigDecimal;

public record OrderPaidEvent(
                Long orderId,
                Long userId,
                BigDecimal amount) {
}
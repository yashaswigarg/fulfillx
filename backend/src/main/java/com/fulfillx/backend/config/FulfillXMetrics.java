package com.fulfillx.backend.config;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Component;

@Component
public class FulfillXMetrics {

    private final Counter checkoutCounter;
    private final Counter paymentSuccessCounter;
    private final Counter paymentFailureCounter;
    private final Counter inventoryFailureCounter;

    public FulfillXMetrics(
            MeterRegistry registry) {

        checkoutCounter = Counter.builder(
                "fulfillx.checkout.total")
                .description("Total checkout attempts")
                .register(registry);

        paymentSuccessCounter = Counter.builder(
                "fulfillx.payment.success.total")
                .description("Successful payments")
                .register(registry);

        paymentFailureCounter = Counter.builder(
                "fulfillx.payment.failure.total")
                .description("Failed payments")
                .register(registry);

        inventoryFailureCounter = Counter.builder(
                "fulfillx.inventory.failure.total")
                .description("Inventory reservation failures")
                .register(registry);
    }

    public void checkoutAttempt() {
        checkoutCounter.increment();
    }

    public void paymentSuccess() {
        paymentSuccessCounter.increment();
    }

    public void paymentFailure() {
        paymentFailureCounter.increment();
    }

    public void inventoryFailure() {
        inventoryFailureCounter.increment();
    }
}
package com.fulfillx.backend.service;

import com.fulfillx.backend.config.FulfillXMetrics;
import com.fulfillx.backend.entity.Order;
import com.fulfillx.backend.entity.Payment;
import com.fulfillx.backend.event.OrderPaidEvent;
import com.fulfillx.backend.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OutboxService outboxService;
    private final FulfillXMetrics metrics;

    public PaymentService(
            PaymentRepository paymentRepository,
            OutboxService outboxService,
            FulfillXMetrics metrics) {
        this.paymentRepository = paymentRepository;
        this.outboxService = outboxService;
        this.metrics = metrics;
    }

    @Transactional
    public Payment processPayment(Order order) {

        var existingPayment = paymentRepository.findByOrderId(order.getId());

        if (existingPayment.isPresent()) {
            return existingPayment.get();
        }

        Payment payment = new Payment(
                order,
                order.getTotalAmount());

        paymentRepository.save(payment);

        boolean paymentSuccessful = true;

        if (paymentSuccessful) {

            metrics.paymentSuccess();
            payment.markSuccess(
                    "TXN-" + UUID.randomUUID());

            Payment savedPayment = paymentRepository.save(payment);

            outboxService.saveEvent(
                    "ORDER",
                    order.getId(),
                    "OrderPaid",
                    new OrderPaidEvent(
                            order.getId(),
                            order.getUser().getId(),
                            order.getTotalAmount()));

            return savedPayment;
        }

        metrics.paymentFailure();
        payment.markFailed();

        return paymentRepository.save(payment);
    }
}
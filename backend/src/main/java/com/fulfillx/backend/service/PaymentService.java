package com.fulfillx.backend.service;

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

    public PaymentService(
            PaymentRepository paymentRepository,
            OutboxService outboxService) {
        this.paymentRepository = paymentRepository;
        this.outboxService = outboxService;
    }

    @Transactional
    public Payment processPayment(Order order) {

        // Prevent duplicate payment creation
        var existingPayment = paymentRepository.findByOrderId(order.getId());

        if (existingPayment.isPresent()) {
            return existingPayment.get();
        }

        Payment payment = new Payment(
                order,
                order.getTotalAmount());

        paymentRepository.save(payment);

        /*
         * Simulated payment provider.
         *
         * In a real system this would call
         * Stripe, Razorpay, Amazon Pay, etc.
         */
        boolean paymentSuccessful = true;

        if (paymentSuccessful) {

            payment.markSuccess(
                    "TXN-" + UUID.randomUUID());

            Payment savedPayment = paymentRepository.save(payment);

            /*
             * Transactional Outbox:
             *
             * Payment update and event creation
             * happen inside the same transaction.
             */
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

        payment.markFailed();

        return paymentRepository.save(payment);
    }
}
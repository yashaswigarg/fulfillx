package com.fulfillx.backend.service;

import com.fulfillx.backend.entity.Order;
import com.fulfillx.backend.entity.Payment;
import com.fulfillx.backend.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import com.fulfillx.backend.event.OrderPaidEvent;
import org.springframework.context.ApplicationEventPublisher;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final ApplicationEventPublisher eventPublisher;

    public PaymentService(PaymentRepository paymentRepository, ApplicationEventPublisher eventPublisher) {
        this.paymentRepository = paymentRepository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public Payment processPayment(Order order) {

        Payment payment = new Payment(
                order,
                order.getTotalAmount());

        paymentRepository.save(payment);

        /*
         * Simulated payment provider.
         *
         * In a real system this would call Stripe,
         * Razorpay, Amazon Pay, etc.
         */
        boolean paymentSuccessful = true;

        if (paymentSuccessful) {

            payment.markSuccess(
                    "TXN-" + UUID.randomUUID());

            Payment savedPayment = paymentRepository.save(payment);

            eventPublisher.publishEvent(
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
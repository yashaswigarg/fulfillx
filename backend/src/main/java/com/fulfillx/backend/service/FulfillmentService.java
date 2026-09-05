package com.fulfillx.backend.service;

import com.fulfillx.backend.entity.Fulfillment;
import com.fulfillx.backend.entity.Order;
import com.fulfillx.backend.event.OrderPaidEvent;
import com.fulfillx.backend.repository.FulfillmentRepository;
import com.fulfillx.backend.repository.OrderRepository;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FulfillmentService {

    private final FulfillmentRepository fulfillmentRepository;
    private final OrderRepository orderRepository;

    public FulfillmentService(
            FulfillmentRepository fulfillmentRepository,
            OrderRepository orderRepository) {
        this.fulfillmentRepository = fulfillmentRepository;
        this.orderRepository = orderRepository;
    }

    @EventListener
    @Transactional
    public void handleOrderPaid(OrderPaidEvent event) {

        Order order = orderRepository.findById(event.orderId())
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));

        if (fulfillmentRepository
                .findByOrderId(order.getId())
                .isPresent()) {
            return;
        }

        Fulfillment fulfillment = new Fulfillment(order);

        fulfillmentRepository.save(fulfillment);

        System.out.println(
                "Fulfillment created for order "
                        + order.getId());
    }
}
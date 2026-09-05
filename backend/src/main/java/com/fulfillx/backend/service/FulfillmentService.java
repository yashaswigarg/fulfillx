package com.fulfillx.backend.service;

import com.fulfillx.backend.entity.Fulfillment;
import com.fulfillx.backend.entity.Order;
import com.fulfillx.backend.entity.ProcessedEvent;
import com.fulfillx.backend.event.PublishedOrderPaidEvent;
import com.fulfillx.backend.repository.FulfillmentRepository;
import com.fulfillx.backend.repository.OrderRepository;
import com.fulfillx.backend.repository.ProcessedEventRepository;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FulfillmentService {

    private static final String CONSUMER_NAME = "fulfillment-service";

    private final FulfillmentRepository fulfillmentRepository;
    private final OrderRepository orderRepository;
    private final ProcessedEventRepository processedEventRepository;

    public FulfillmentService(
            FulfillmentRepository fulfillmentRepository,
            OrderRepository orderRepository,
            ProcessedEventRepository processedEventRepository) {
        this.fulfillmentRepository = fulfillmentRepository;
        this.orderRepository = orderRepository;
        this.processedEventRepository = processedEventRepository;
    }

    @EventListener
    @Transactional
    public void handleOrderPaid(
            PublishedOrderPaidEvent event) {

        if (processedEventRepository
                .existsByConsumerNameAndEventId(
                        CONSUMER_NAME,
                        event.eventId())) {

            System.out.println(
                    "Duplicate event ignored: "
                            + event.eventId());

            return;
        }

        Order order = orderRepository
                .findById(event.orderId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Order not found"));

        if (fulfillmentRepository
                .findByOrderId(order.getId())
                .isEmpty()) {

            Fulfillment fulfillment = new Fulfillment(order);

            fulfillmentRepository.save(fulfillment);
        }

        processedEventRepository.save(
                new ProcessedEvent(
                        CONSUMER_NAME,
                        event.eventId()));

        System.out.println(
                "Processed OrderPaid event: "
                        + event.eventId());
    }
}
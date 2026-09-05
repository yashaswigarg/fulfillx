package com.fulfillx.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fulfillx.backend.entity.OutboxEvent;
import com.fulfillx.backend.entity.OutboxEventStatus;
import com.fulfillx.backend.event.OrderPaidEvent;
import com.fulfillx.backend.repository.OutboxEventRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class OutboxPublisher {

    private final OutboxEventRepository outboxEventRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final ObjectMapper objectMapper;

    public OutboxPublisher(
            OutboxEventRepository outboxEventRepository,
            ApplicationEventPublisher eventPublisher,
            ObjectMapper objectMapper) {
        this.outboxEventRepository = outboxEventRepository;
        this.eventPublisher = eventPublisher;
        this.objectMapper = objectMapper;
    }

    @Scheduled(fixedDelay = 5000)
    @Transactional
    public void publishPendingEvents() {

        var events = outboxEventRepository
                .findTop50ByStatusOrderByCreatedAtAsc(
                        OutboxEventStatus.PENDING);

        for (OutboxEvent event : events) {
            try {

                if ("OrderPaid".equals(event.getEventType())) {

                    OrderPaidEvent orderPaidEvent = objectMapper.readValue(
                            event.getPayload(),
                            OrderPaidEvent.class);

                    eventPublisher.publishEvent(orderPaidEvent);
                }

                event.markPublished();

            } catch (Exception e) {

                event.incrementRetry();

                System.err.println(
                        "Failed to publish outbox event "
                                + event.getId()
                                + ": "
                                + e.getMessage());
            }
        }

        outboxEventRepository.saveAll(events);
    }
}
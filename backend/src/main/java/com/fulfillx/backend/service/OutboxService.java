package com.fulfillx.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fulfillx.backend.entity.OutboxEvent;
import com.fulfillx.backend.repository.OutboxEventRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OutboxService {

    private final OutboxEventRepository outboxEventRepository;
    private final ObjectMapper objectMapper;

    public OutboxService(
            OutboxEventRepository outboxEventRepository,
            ObjectMapper objectMapper) {
        this.outboxEventRepository = outboxEventRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional
    public OutboxEvent saveEvent(
            String aggregateType,
            Long aggregateId,
            String eventType,
            Object event) {
        try {
            String payload = objectMapper.writeValueAsString(event);

            OutboxEvent outboxEvent = new OutboxEvent(
                    aggregateType,
                    aggregateId,
                    eventType,
                    payload);

            return outboxEventRepository.save(outboxEvent);

        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException(
                    "Failed to serialize outbox event",
                    e);
        }
    }
}
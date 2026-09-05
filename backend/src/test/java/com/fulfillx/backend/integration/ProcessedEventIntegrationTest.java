package com.fulfillx.backend.integration;

import com.fulfillx.backend.entity.ProcessedEvent;
import com.fulfillx.backend.repository.ProcessedEventRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

class ProcessedEventIntegrationTest
        extends PostgresIntegrationTest {

    @Autowired
    private ProcessedEventRepository processedEventRepository;

    @Test
    void shouldDetectAlreadyProcessedEvent() {

        String consumer = "fulfillment-service";

        Long eventId = 999L;

        processedEventRepository.save(
                new ProcessedEvent(
                        consumer,
                        eventId));

        boolean exists = processedEventRepository
                .existsByConsumerNameAndEventId(
                        consumer,
                        eventId);

        assertThat(exists)
                .isTrue();
    }
}
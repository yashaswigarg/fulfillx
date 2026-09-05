package com.fulfillx.backend.integration;

import com.fulfillx.backend.entity.OutboxEvent;
import com.fulfillx.backend.entity.OutboxEventStatus;
import com.fulfillx.backend.repository.OutboxEventRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

class OutboxIntegrationTest
        extends PostgresIntegrationTest {

    @Autowired
    private OutboxEventRepository outboxEventRepository;

    @Test
    void shouldPersistPendingOutboxEvent() {

        OutboxEvent event = new OutboxEvent(
                "ORDER",
                123L,
                "OrderPaid",
                """
                        {
                            "orderId": 123,
                            "userId": 10,
                            "amount": 999.00
                        }
                        """);

        OutboxEvent saved = outboxEventRepository.save(event);

        assertThat(saved.getId())
                .isNotNull();

        assertThat(saved.getStatus())
                .isEqualTo(
                        OutboxEventStatus.PENDING);

        assertThat(saved.getRetryCount())
                .isZero();
    }
}
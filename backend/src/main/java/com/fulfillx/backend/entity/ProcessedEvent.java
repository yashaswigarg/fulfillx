package com.fulfillx.backend.entity;

import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "processed_events", uniqueConstraints = {
        @UniqueConstraint(name = "unique_consumer_event", columnNames = {
                "consumer_name",
                "event_id"
        })
})
public class ProcessedEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "consumer_name", nullable = false, length = 150)
    private String consumerName;

    @Column(name = "event_id", nullable = false)
    private Long eventId;

    @Column(name = "processed_at", nullable = false)
    private OffsetDateTime processedAt;

    protected ProcessedEvent() {
    }

    public ProcessedEvent(
            String consumerName,
            Long eventId) {
        this.consumerName = consumerName;
        this.eventId = eventId;
        this.processedAt = OffsetDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getConsumerName() {
        return consumerName;
    }

    public Long getEventId() {
        return eventId;
    }

    public OffsetDateTime getProcessedAt() {
        return processedAt;
    }
}
package com.fulfillx.backend.repository;

import com.fulfillx.backend.entity.ProcessedEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessedEventRepository
        extends JpaRepository<ProcessedEvent, Long> {

    boolean existsByConsumerNameAndEventId(
            String consumerName,
            Long eventId);
}
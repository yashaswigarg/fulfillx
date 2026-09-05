package com.fulfillx.backend.repository;

import com.fulfillx.backend.entity.OutboxEvent;
import com.fulfillx.backend.entity.OutboxEventStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OutboxEventRepository
        extends JpaRepository<OutboxEvent, Long> {

    List<OutboxEvent> findTop50ByStatusOrderByCreatedAtAsc(
            OutboxEventStatus status);
}
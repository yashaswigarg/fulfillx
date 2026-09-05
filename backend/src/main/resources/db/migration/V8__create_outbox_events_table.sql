CREATE TABLE outbox_events (
    id BIGSERIAL PRIMARY KEY,
    aggregate_type VARCHAR(100) NOT NULL,
    aggregate_id BIGINT NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    payload TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    retry_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT outbox_event_status_valid
        CHECK (status IN ('PENDING', 'PUBLISHED', 'FAILED')),

    CONSTRAINT outbox_retry_count_non_negative
        CHECK (retry_count >= 0)
);

CREATE INDEX idx_outbox_events_status
    ON outbox_events(status);

CREATE INDEX idx_outbox_events_created_at
    ON outbox_events(created_at);

CREATE INDEX idx_outbox_events_aggregate
    ON outbox_events(aggregate_type, aggregate_id);
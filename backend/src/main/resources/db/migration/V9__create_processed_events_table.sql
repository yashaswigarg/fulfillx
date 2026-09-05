CREATE TABLE processed_events (
    id BIGSERIAL PRIMARY KEY,
    consumer_name VARCHAR(150) NOT NULL,
    event_id BIGINT NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_consumer_event
        UNIQUE (consumer_name, event_id)
);

CREATE INDEX idx_processed_events_event_id
    ON processed_events(event_id);
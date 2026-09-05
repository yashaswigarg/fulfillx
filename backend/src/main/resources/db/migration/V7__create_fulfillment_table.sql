CREATE TABLE fulfillments (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    warehouse_location VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_fulfillment_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fulfillment_status_valid
        CHECK (
            status IN (
                'PENDING',
                'PROCESSING',
                'PACKED',
                'SHIPPED',
                'DELIVERED',
                'CANCELLED'
            )
        )
);

CREATE INDEX idx_fulfillments_status
    ON fulfillments(status);
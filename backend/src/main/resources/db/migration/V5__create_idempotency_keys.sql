CREATE TABLE idempotency_keys (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    idempotency_key VARCHAR(255) NOT NULL,

    order_id BIGINT,

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_idempotency_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_idempotency_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE SET NULL,

    CONSTRAINT unique_user_idempotency_key
        UNIQUE (user_id, idempotency_key)
);

CREATE INDEX idx_idempotency_order_id
    ON idempotency_keys(order_id);
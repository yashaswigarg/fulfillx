CREATE TABLE inventory_reservations (
    id BIGSERIAL PRIMARY KEY,

    order_id BIGINT NOT NULL,

    product_id BIGINT NOT NULL,

    quantity INTEGER NOT NULL,

    status VARCHAR(50) NOT NULL DEFAULT 'RESERVED',

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_inventory_reservation_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_inventory_reservation_product
        FOREIGN KEY (product_id)
        REFERENCES products(id),

    CONSTRAINT inventory_reservation_quantity_positive
        CHECK (quantity > 0),

    CONSTRAINT inventory_reservation_status_valid
        CHECK (
            status IN (
                'RESERVED',
                'RELEASED',
                'CONSUMED'
            )
        )
);

CREATE INDEX idx_inventory_reservations_order_id
    ON inventory_reservations(order_id);

CREATE INDEX idx_inventory_reservations_product_id
    ON inventory_reservations(product_id);

CREATE INDEX idx_inventory_reservations_status
    ON inventory_reservations(status);
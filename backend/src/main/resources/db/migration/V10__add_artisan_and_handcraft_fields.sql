ALTER TABLE products
    ADD COLUMN artisan_name VARCHAR(255) DEFAULT 'Rural Artisan',
    ADD COLUMN origin_town VARCHAR(100) DEFAULT 'Varanasi',
    ADD COLUMN origin_state VARCHAR(100) DEFAULT 'Uttar Pradesh',
    ADD COLUMN craft_type VARCHAR(100) DEFAULT 'Handloom & Textiles',
    ADD COLUMN image_url VARCHAR(1000),
    ADD COLUMN rating NUMERIC(3, 2) DEFAULT 4.80;

CREATE INDEX idx_products_craft_type
    ON products(craft_type);

CREATE INDEX idx_products_origin_state
    ON products(origin_state);

ALTER TABLE fulfillments
    ADD COLUMN tracking_number VARCHAR(100),
    ADD COLUMN origin_hub VARCHAR(255),
    ADD COLUMN destination_hub VARCHAR(255),
    ADD COLUMN current_stage VARCHAR(100) DEFAULT 'COLLECTED_FROM_ARTISAN';

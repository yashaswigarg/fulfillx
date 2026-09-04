CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    description TEXT,

    sku VARCHAR(100) NOT NULL UNIQUE,

    price NUMERIC(12, 2) NOT NULL,

    category VARCHAR(100) NOT NULL,

    stock_quantity INTEGER NOT NULL DEFAULT 0,

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT products_price_positive
        CHECK (price >= 0),

    CONSTRAINT products_stock_non_negative
        CHECK (stock_quantity >= 0)
);

CREATE INDEX idx_products_category
    ON products(category);

CREATE INDEX idx_products_active
    ON products(active);

CREATE INDEX idx_products_created_at
    ON products(created_at);
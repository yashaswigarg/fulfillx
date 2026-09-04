CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,

    email VARCHAR(255) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    role VARCHAR(50) NOT NULL DEFAULT 'CUSTOMER',

    active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT users_role_valid
        CHECK (role IN ('CUSTOMER', 'ADMIN', 'WAREHOUSE')),

    CONSTRAINT users_email_lowercase
        CHECK (email = LOWER(email))
);

CREATE INDEX idx_users_email
    ON users(email);

CREATE INDEX idx_users_role
    ON users(role);
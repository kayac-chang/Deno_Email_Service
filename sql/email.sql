-- Email
CREATE TABLE IF NOT EXISTS email (
    -- pk
    email_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

    send_from VARCHAR(25) NOT NULL,
    organization VARCHAR(25) NOT NULL,
    address VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    content TEXt NOT NULL,

    -- times
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
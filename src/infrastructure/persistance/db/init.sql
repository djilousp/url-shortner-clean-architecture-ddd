-- Table for URL mappings
CREATE TABLE IF NOT EXISTS urls (
    id BINARY(16) PRIMARY KEY,
    short_code VARCHAR(7) NOT NULL,
    original_url VARCHAR(255) NOT NULL,
    UNIQUE(short_code)
);

-- Table for click analytics
CREATE TABLE IF NOT EXISTS url_clicks (
    id BINARY(16) DEFAULT (UUID_TO_BIN(UUID())) PRIMARY KEY,
    short_url_id BINARY(16) NOT NULL,
    accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (short_url_id) REFERENCES urls(id)
);

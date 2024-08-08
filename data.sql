CREATE DATABASE inventory

CREATE TABLE item_list (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    item_description TEXT,
    item_price DECIMAL(10, 2) NOT NULL,
    item_quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

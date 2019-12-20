DROP DATABASE IF EXISTS restaurants_db;
CREATE DATABASE restaurants_db;

USE restaurants_db;

CREATE TABLE menu (
    id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    selected VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE customers (
    id INT NOT NULL AUTO_INCREMENT,
    customer_number VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);